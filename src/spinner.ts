import * as cliCursor from "cli-cursor"
// eslint-disable-next-line import/default
import cliSpinners from "cli-spinners"
import chalk from "chalk"
import { performance } from "perf_hooks"
import symbols from "./symbols"

import readline from "readline"

export enum SpinnerResult {
  success = 1,
  error,
  warning,
}

export class TSpinner {
  result?: SpinnerResult
  start: number
  stop?: number
  output = ""

  constructor(public text: string, public level = 0) {
    this.start = performance.now()
  }

  format(symbol: string) {
    const padding = "".padEnd(this.level * 2)
    const output = this.output.length ? `\n${this.output}` : ""
    if (this.result) {
      symbol = symbols.get(SpinnerResult[this.result])
      if (this.stop) {
        const duration = (this.stop - this.start) / 1000
        let du = duration.toFixed(3) + "s"
        if (duration < 1) du = (duration * 1000).toFixed(0) + "ms"
        return `${padding} ${symbol} ${this.text} ${chalk.grey.dim(
          du
        )}${output}`
      }
    }
    return `${padding} ${symbol} ${this.text}${output}`
  }
}

export class Spinner {
  spinner = process.platform === "win32" ? cliSpinners.line : cliSpinners.dots
  frame = 0
  lines = 0
  interval: NodeJS.Timeout | undefined
  spinners: TSpinner[] = []
  running = false

  constructor(public stream = process.stdout) {}

  clear() {
    for (let i = 0; i < this.lines; i++) {
      if (i > 0) readline.moveCursor(this.stream, 0, -1)
      readline.clearLine(this.stream, 0)
    }
    this.lines = 0
  }

  render(full = false) {
    this.clear()
    const symbol = chalk.yellow(this.spinner.frames[this.frame])
    let text = ""
    for (const spinner of this.spinners) text += spinner.format(symbol) + "\n"
    if (!full) text = text.trim()
    let lines = text.split("\n")
    if (!full) lines = lines.slice(-process.stdout.rows)
    readline.cursorTo(this.stream, 0)
    this.stream.write(lines.join("\n"))
    this.lines = lines.length
  }

  start(text: string, level = 0) {
    const s = new TSpinner(text, level)
    this.spinners.push(s)
    if (!this.running) this._start()
    this.render()
    return s
  }

  stop(spinner: TSpinner) {
    spinner.stop = performance.now()
    this.render()
  }

  error(spinner: TSpinner) {
    spinner.result = SpinnerResult.error
    this.stop(spinner)
  }

  warning(spinner: TSpinner) {
    spinner.result = SpinnerResult.warning
    this.stop(spinner)
  }

  success(spinner: TSpinner) {
    spinner.result = SpinnerResult.success
    this.stop(spinner)
  }

  _start() {
    if (this.running) return
    this.running = true
    cliCursor.hide(this.stream)
    this.interval = setInterval(() => {
      this.frame = ++this.frame % this.spinner.frames.length
      this.render()
    }, this.spinner.interval)
  }

  _stop() {
    if (this.running) {
      if (this.interval) clearInterval(this.interval)
      this.render(true)
      this.interval = undefined
      cliCursor.show(this.stream)
      this.running = false
      this.spinners.length = 0
      this.lines = 0
    }
  }
}
