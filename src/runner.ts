import chalk from "chalk"
import { existsSync } from "fs"
import { basename, relative } from "path"
import { performance } from "perf_hooks"
import Shellwords from "shellwords-ts"
import { ChangeType, needsBuild } from "./build"
import { CommandFormatter } from "./formatter"
import { defaults, RunnerOptions } from "./options"
import { PackageJson, findUp, getPackage } from "./package"
import { Command, CommandParser, CommandType } from "./parser"
import { Spawner } from "./spawn"
import { OutputSpinner, Spinner } from "./spinner"
import { getWorkspace, Workspace } from "./workspace"
import { WorkspaceProviderType } from "./workspace.providers"
import { createCommand } from "./concurrency"

export class Runner {
  spinner = new OutputSpinner()
  options: RunnerOptions
  workspace?: Workspace
  buildCmd = "build"

  constructor(public _options: Partial<RunnerOptions> = {}) {
    this.options = { ...defaults, ..._options }
  }

  formatStart(cmd: Command, level: number, parentSpinner?: Spinner) {
    if (this.options.raw) return
    const title = this.formatCommand(cmd)
    if (!this.options.pretty) {
      const prefix = cmd.packageName
        ? `${chalk.grey.dim(` (${cmd.packageName})`)}`
        : ""
      if (cmd.type == CommandType.script) console.log(`❯ ${title}${prefix}`)
      else console.log(title + prefix)
    } else return this.spinner.start(title, level, parentSpinner)
  }

  // TODO: refactor the method below. Move to its own class
  async runCommand(cmd: Command, level = -2, parentSpinner?: Spinner) {
    if (cmd.type == CommandType.op) return

    const isBuildScript =
      cmd.type == CommandType.script && cmd.name == this.buildCmd

    const changes = isBuildScript
      ? await needsBuild(
          cmd.cwd || process.cwd(),
          this.workspace,
          this.options.rebuild
        )
      : undefined

    await cmd.beforeRun()

    let spinner: Spinner | undefined
    if (cmd.type == CommandType.script) {
      if (level >= 0) spinner = this.formatStart(cmd, level, parentSpinner)
    } else {
      if (cmd.args.length) {
        const args = Shellwords.split(cmd.args.join(" "))

        if (cmd.bin) args[0] = cmd.bin

        const cmdSpinner = this.formatStart(cmd, level, parentSpinner)
        try {
          if (!this.options.dryRun) {
            const formatter = new CommandFormatter(
              args[0],
              level,
              cmdSpinner,
              this.options,
              cmd.packageName
            )
            await this.spawn(
              args[0],
              args.slice(1),
              formatter,
              cmd.cwd,
              cmd.env
            )
          }

          if (cmdSpinner) {
            if (/warning/iu.test(cmdSpinner.output))
              this.spinner.warning(cmdSpinner)
            else this.spinner.success(cmdSpinner)
          }
        } catch (error) {
          if (cmdSpinner) this.spinner.error(cmdSpinner)
          throw error
        }
      }
    }
    const formatter = new CommandFormatter(
      cmd.name,
      level,
      spinner,
      this.options,
      cmd.packageName
    )

    if (isBuildScript) {
      if (!changes) formatter.write("No changes. Skipping build...")
      else if (!changes.isGitRepo) {
        formatter.write(
          `${chalk.red(
            "warning "
          )}Not a Git repository, so build change detection is disabled. Forcing full rebuild.`
        )
      } else {
        formatter.write(
          chalk.blue("changes:\n") +
            changes.changes
              .map((c) => {
                let str = "  "
                if (c.type == ChangeType.added) str += chalk.green("+")
                else if (c.type == ChangeType.deleted) str += chalk.red("-")
                else if (c.type == ChangeType.modified) str += chalk.green("+")
                return `${str} ${c.file}`
              })
              .join("\n")
        )
        // formatter.write(chalk.red("\nWaiting for\n"))
      }
    }

    try {
      if (!isBuildScript || changes) {
        const promises = []
        for (const child of cmd.children) {
          if (child.isPostScript()) await Promise.all(promises)
          const promise = this.runCommand(child, level + 1, spinner)
          promises.push(promise)
          if (!cmd.concurrent || child.isPreScript()) await promise
          else if (promises.length >= this.options.concurrency) {
            await Promise.all(promises)
            promises.length = 0
          }
        }
        if (cmd.concurrent) await Promise.all(promises)
      }
      spinner && this.spinner.success(spinner)
      cmd.afterRun()
      if (changes) await changes.onBuild()
    } catch (error) {
      if (spinner) this.spinner.error(spinner)
      throw error
    }
  }

  formatCommand(cmd: Command) {
    if (cmd.type == CommandType.script) return chalk.white.bold(`${cmd.name}`)
    return `${chalk.grey(`$ ${cmd.args[0]}`)} ${cmd.args
      .slice(1)
      .map((x) => {
        if (x.startsWith("-")) return chalk.cyan(x)
        if (existsSync(x)) return chalk.magenta(x)
        if (x.includes("*")) return chalk.yellow(x)
        return x
      })
      .join(" ")}`
  }

  spawn(
    cmd: string,
    args: string[],
    formatter: CommandFormatter,
    cwd?: string,
    env?: Record<string, string>
  ) {
    const spawner = new Spawner(cmd, args, cwd, env)

    if (this.options.pretty)
      spawner.onData = (line: string) => formatter.write(line)
    else spawner.onLine = (line: string) => formatter.write(line)

    spawner.onError = (err: Error) =>
      new Error(
        `${chalk.red("error")} Command ${chalk.white.dim(
          basename(cmd)
        )} failed with ${chalk.red(err)}. Is the command on your path?`
      )

    spawner.onExit = (code: number) =>
      new Error(
        `${this.options.silent ? formatter.output : ""}\n${chalk.red(
          "error"
        )} Command ${chalk.white.dim(
          basename(cmd)
        )} failed with exit code ${chalk.red(code)}`
      )
    return spawner.spawn(this.options.raw)
  }

  formatDuration(duration: number) {
    if (duration < 1) return `${(duration * 1000).toFixed(0)}ms`
    return `${duration.toFixed(3)}s`
  }

  async list() {
    const workspace = await getWorkspace({
      includeRoot: this.options.root,
      type: this.options.recursive ? undefined : WorkspaceProviderType.single,
    })
    if (!workspace) throw new Error("Cannot find package.json")

    let counter = 0
    workspace?.getPackages(this.options.filter).forEach((p) => {
      console.log(
        `${chalk.bgGray.cyanBright(` ${counter++} `)} ${chalk.green(
          `${p.name}`
        )} at ${chalk.whiteBright(relative(workspace.root, p.root))}`
      )
      Object.keys(p.scripts || {})
        .sort()
        .forEach((s) => {
          console.log(`  ❯ ${chalk.grey(s)}`)
        })
    })
  }

  async run(cmd: string, pkg?: PackageJson) {
    if (!pkg) {
      const root = findUp("package.json")
      if (root) pkg = getPackage(root)
    }
    if (!pkg) pkg = { name: "" }
    if (pkg) {
      const parser = new CommandParser(pkg)
      return await this._run(parser.parse(cmd))
    }
    throw new Error(`Could not find package`)
  }

  async info() {
    const types = await Workspace.detectWorkspaceProviders()
    if (!types.length) throw new Error("No workspaces found")
    if (types.length > 1)
      console.log(
        chalk.blue("Detected workspaces: ") + chalk.magenta(types.join(", "))
      )
    const workspace = await getWorkspace({ includeRoot: true })
    if (workspace) {
      console.log(
        `${
          chalk.blue("Workspace ") + chalk.magenta(workspace.type)
        } with ${chalk.magenta(workspace.getPackageManager())}`
      )
      let counter = 0
      workspace.getPackages(this.options.filter).forEach((p) => {
        let at = relative(workspace.root, p.root)
        if (!at.length) at = "."
        console.log(
          `${chalk.bgGray.cyanBright(` ${counter++} `)} ${chalk.green(
            `${p.name}`
          )} at ${chalk.whiteBright(at)}`
        )
        workspace.getDeps(p.name).forEach((s) => {
          console.log(`  ❯ ${chalk.grey(s)}`)
        })
      })
    }
  }

  deps = new Map<string | undefined, Promise<void>>()

  async runRecursive(cmd: string) {
    this.workspace = await getWorkspace({ includeRoot: this.options.root })
    const workspace = this.workspace
    if (this.options.build) this.buildCmd = cmd

    if (!workspace || !workspace?.packages?.size)
      throw new Error(
        "Could not find packages in your workspace. Supported: yarn, pnpm, lerna"
      )

    const command = createCommand(workspace, cmd, this.options)
    return await this._run(command, -1)
  }

  async _run(command: Command, level = -1) {
    try {
      await this.runCommand(command, level)
      this.spinner._stop()
      if (!this.options.silent) {
        console.log(
          chalk.green("success"),
          "✨",
          this.options.dryRun ? "Dry-run done" : "Done",
          `in ${this.formatDuration(performance.nodeTiming.duration / 1000)}`
        )
      }
    } finally {
      this.spinner._stop()
    }
  }
}
