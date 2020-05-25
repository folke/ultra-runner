import chalk from "chalk"
import { basename } from "path"
// eslint-disable-next-line import/default
import stringWidth from "string-width"
import wrapAnsi from "wrap-ansi"
import { Spinner } from "./spinner"
import { RunnerOptions } from "./options"

export class CommandFormatter {
  output = ""

  constructor(
    public cmd: string,
    public level: number,
    public spinner: Spinner | undefined,
    public options: RunnerOptions,
    public packageName?: string
  ) {}

  private format(prefix: string, text: string) {
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

  write(data: string) {
    if (!this.options.pretty) {
      let cmdName = basename(this.cmd)
      if (this.packageName) cmdName = `${this.packageName}::${cmdName}`
      const prefix = `${chalk.grey.dim(`[${cmdName}]`)} `
      data = prefix + this.format(prefix, data)
      this.output += `${data}\n`
      if (!this.options.silent) console.log(data)
    } else {
      const prefix = `${"".padEnd(this.level * 2)}${chalk.grey(`  │`)} `
      let ret = this.format(prefix, data)
      if (!this.output.length) ret = prefix + ret
      this.output += ret
      if (!this.options.silent && this.spinner) {
        this.spinner.output += ret
      }
    }
  }
}
