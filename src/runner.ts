import chalk from "chalk"
import { existsSync } from "fs"
import { basename, relative } from "path"
import { performance } from "perf_hooks"
import Shellwords from "shellwords-ts"
// eslint-disable-next-line import/default
import stringWidth from "string-width"
import wrapAnsi from "wrap-ansi"
import { Command, CommandParser, CommandType } from "./parser"
import { Spawner } from "./spawn"
import { OutputSpinner, Spinner } from "./spinner"
import { findPackageUp, getWorkspace, PackageJson } from "./workspace"
import { filter } from "./filter"

type CliOptions = { [key: string]: string | boolean }

export class Runner {
  spinner = new OutputSpinner()
  constructor(public options: CliOptions = {}) {
    if (options.parallel || options.concurrent)
      options.parallel = options.concurrent = true
  }

  formatStart(cmd: Command, level: number, parentSpinner?: Spinner) {
    if (this.options.raw) return
    const title = this.formatCommand(cmd)
    if (!this.options.fancy) {
      if (cmd.type == CommandType.script) console.log(`❯ ${title}`)
      else console.log(title)
    } else return this.spinner.start(title, level, parentSpinner)
  }

  async runCommand(cmd: Command, level = -2, parentSpinner?: Spinner) {
    if (cmd.type == CommandType.op) return

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
            await this.spawn(args[0], args.slice(1), level, cmd.cwd, cmdSpinner)
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
    try {
      const promises = []
      for (const child of cmd.children) {
        promises.push(this.runCommand(child, level + 1, spinner))
        if (!cmd.concurrent) await promises[promises.length - 1]
      }
      if (cmd.concurrent) await Promise.all(promises)
      spinner && this.spinner.success(spinner)
      cmd.afterRun()
    } catch (error) {
      if (spinner) this.spinner.error(spinner)
      throw error
    }
  }

  formatCommand(cmd: Command) {
    if (cmd.type == CommandType.script) return chalk.white.bold(`${cmd.name}`)
    return `${chalk.grey(`$ ${cmd.args[0]}`)} ${cmd.args
      .slice(1)
      .map(x => {
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
    level: number,
    cwd?: string,
    spinner?: Spinner
  ) {
    const spawner = new Spawner(cmd, args, (this.options.cwd as string) || cwd)
    let output = ""

    const format = (prefix: string, text: string) => {
      text = text.replace("\u001Bc", "") // remove clear screen
      text = wrapAnsi(
        `${text}`,
        process.stdout.columns - stringWidth(prefix) - 1,
        {
          hard: true,
          trim: false,
          wordWrap: true,
        }
      )
      return text.replace(/\n/gu, `\n${prefix}`)
    }

    if (!this.options.fancy)
      spawner.onLine = (line: string) => {
        const prefix = `${chalk.grey.dim(`[${basename(cmd)}]`)} `
        line = prefix + format(prefix, line)
        output += `${line}\n`
        if (!this.options.silent) console.log(line)
      }
    else
      spawner.onData = (data: string) => {
        const prefix = `${"".padEnd(level * 2)}${chalk.grey(`  │`)} `
        let ret = format(prefix, data)
        if (!output.length) ret = prefix + ret
        output += ret
        if (!this.options.silent && spinner) {
          spinner.output += ret
        }
      }

    spawner.onError = (err: Error) =>
      new Error(
        `${chalk.red("error")} Command ${chalk.white.dim(
          basename(cmd)
        )} failed with ${chalk.red(err)}. Is the command on your path?`
      )

    spawner.onExit = (code: number) =>
      new Error(
        `${this.options.silent ? output : ""}\n${chalk.red(
          "error"
        )} Command ${chalk.white.dim(
          basename(cmd)
        )} failed with exit code ${chalk.red(code)}`
      )
    return spawner.spawn(this.options.raw as boolean)
  }

  formatDuration(duration: number) {
    if (duration < 1) return `${(duration * 1000).toFixed(0)}ms`
    return `${duration.toFixed(3)}s`
  }

  async list() {
    const workspace = await getWorkspace(
      process.cwd(),
      this.options.recursive as boolean
    )
    if (!workspace) throw new Error("Cannot find package.json")

    if (this.options.filter) filter(workspace, this.options.filter as string)
    let counter = 0
    workspace?.packages?.forEach(p => {
      console.log(
        `${chalk.bgGray.cyanBright(` ${counter++} `)} ${chalk.green(
          `${p.name}`
        )} at ./${chalk.whiteBright(relative(workspace.root, p.root))}`
      )
      Object.keys(p.scripts || {})
        .sort()
        .forEach(s => {
          console.log(`  ❯ ${chalk.grey(s)}`)
        })
    })
  }

  async run(cmd: string, pkg?: PackageJson) {
    if (!pkg) pkg = findPackageUp() || {}
    const parser = new CommandParser(pkg)
    await this._run(parser.parse(cmd))
  }

  async info() {
    const workspace = await getWorkspace(process.cwd(), true)
    if (workspace) {
      if (this.options.filter) filter(workspace, this.options.filter as string)
      const localPackages = workspace.packages.map(p => p.name)
      let counter = 0
      workspace.packages.forEach(p => {
        console.log(
          `${chalk.bgGray.cyanBright(` ${counter++} `)} ${chalk.green(
            `${p.name}`
          )} at ./${chalk.whiteBright(relative(workspace.root, p.root))}`
        )
        Object.keys(p.dependencies || {})
          .filter(dep => localPackages.includes(dep))
          .sort()
          .forEach(s => {
            console.log(`  ❯ ${chalk.grey(s)}`)
          })
      })
    }
  }

  deps = new Map<string | undefined, Promise<void>>()

  async runRecursive(cmd: string) {
    const workspace = await getWorkspace(process.cwd(), true)

    if (!workspace?.packages?.length)
      throw new Error(
        "Could not find packages in your workspace. Supported: yarn, pnpm, lerna"
      )
    if (this.options.filter) filter(workspace, this.options.filter as string)
    const command = new Command([], CommandType.script)

    const workspacePackages = workspace.packages.map(p => p.name)
    let hasScript = false
    command.children = workspace.packages
      .map(pkg => {
        const command = new CommandParser(pkg, pkg.root)
          .parse(cmd)
          .setCwd(pkg.root)
        command.name = chalk.cyanBright(pkg.name || "Package")
        command.type = CommandType.script
        if (this.options.tree)
          command.beforeRun = async () => {
            this.deps.set(
              pkg.name,
              new Promise(resolve => {
                command.afterRun = () => resolve()
              })
            )
            await Promise.all(
              Object.keys(pkg.dependencies || [])
                .filter(dep => workspacePackages.includes(dep))
                .map(dep => this.deps.get(dep))
            )
          }
        hasScript =
          hasScript || command.children.some(c => c.type == CommandType.script)
        return command
      })
      .filter(
        c => !hasScript || c.children.some(c => c.type == CommandType.script)
      )

    this._run(command, -1)

    // process.exit(1)
  }

  async _run(command: Command, level = -2) {
    try {
      if (this.options.concurrent) command.concurrent = true
      // console.dir(command.debug(true), { depth: Infinity })
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
    } catch (error) {
      this.spinner._stop()
      if (error instanceof Error) {
        console.error(error.message)
      } else console.error(error)
      // eslint-disable-next-line unicorn/no-process-exit
      process.exit(1)
    }
  }
}
