import chalk from "chalk"
import { existsSync } from "fs"
import { basename } from "path"
import { performance } from "perf_hooks"
import Shellwords from "shellwords-ts"
// eslint-disable-next-line import/default
import stringWidth from "string-width"
import wrapAnsi from "wrap-ansi"
import { Command, CommandParser, CommandType, PackageScripts } from "./parser"
import { Spawner } from "./spawn"
import { OutputSpinner, Spinner } from "./spinner"

type CliOptions = { [key: string]: string | boolean }

export class Runner {
  spinner = new OutputSpinner()
  constructor(public pkg: PackageScripts, public options: CliOptions = {}) {
    if (options.parallel) options.concurrent = true
  }

  formatStart(cmd: Command, level: number) {
    if (this.options.raw) return
    const title = this.formatCommand(cmd)
    if (!this.options.fancy) {
      if (cmd.type == CommandType.script) console.log(`❯ ${title}`)
      else console.log(title)
    } else return this.spinner.start(title, level)
  }

  async runCommand(cmd: Command, level = -2, forceConcurrent = false) {
    if (cmd.type == CommandType.op) return

    const concurrent =
      forceConcurrent ||
      (cmd.type == CommandType.script &&
        this.pkg.ultra?.concurrent?.includes(cmd.name))

    let spinner
    if (cmd.type == CommandType.script) {
      if (level >= 0) spinner = this.formatStart(cmd, level)
    } else {
      if (cmd.args.length) {
        const args = Shellwords.split(cmd.args.join(" "))
        if (cmd.type == CommandType.bin)
          args[0] = `./node_modules/.bin/${args[0]}`

        const cmdSpinner = this.formatStart(cmd, level)
        try {
          if (!this.options.dryRun) {
            await this.spawn(args[0], args.slice(1), level, cmdSpinner)
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
        promises.push(this.runCommand(child, level + 1))
        if (!concurrent) await promises[promises.length - 1]
      }
      if (concurrent) await Promise.all(promises)
      spinner && this.spinner.success(spinner)
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

  spawn(cmd: string, args: string[], level: number, spinner?: Spinner) {
    const spawner = new Spawner(cmd, args)
    let output = ""

    if (!this.options.fancy)
      spawner.onLine = (line: string) => {
        const prefix = `${chalk.grey.dim(`[${basename(cmd)}]`)} `
        line = wrapAnsi(
          `${line}`,
          process.stdout.columns - stringWidth(prefix) - 1,
          {
            hard: true,
            trim: false,
            wordWrap: true,
          }
        )
        line = prefix + line.replace(/\n/gu, `\n${prefix}`)
        output += `${line}\n`
        if (!this.options.silent) console.log(line)
      }
    else
      spawner.onData = (data: string) => {
        const prefix = `${"".padEnd(level * 2)}${chalk.grey(`  │`)} `
        let ret = wrapAnsi(
          `${data}`,
          process.stdout.columns - stringWidth(prefix),
          {
            hard: true,
            trim: false,
            wordWrap: true,
          }
        )
        ret = ret.replace(/\n/gu, `\n${prefix}`)
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

  async run(cmd: string) {
    try {
      const command = new CommandParser(this.pkg).parse(cmd)
      await this.runCommand(command, -2, this.options.concurrent as boolean)
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
