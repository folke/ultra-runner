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

class TSpinner {
  result?: SpinnerResult
  start: number
  stop?: number

  constructor(
    public readonly line: number,
    public text: string,
    public level = 0
  ) {
    this.start = performance.now()
  }

  format(symbol: string) {
    const padding = "".padEnd(this.level * 2)
    if (this.result) {
      symbol = symbols.get(SpinnerResult[this.result])
      if (this.stop) {
        const duration = (this.stop - this.start) / 1000
        let du = duration.toFixed(3) + "s"
        if (duration < 1) du = (duration * 1000).toFixed(0) + "ms"
        return `${padding} ${symbol} ${this.text} ${chalk.grey.dim(du)}`
      }
    }
    return `${padding} ${symbol} ${this.text}`
  }
}

function ansiHeight(text: string) {
  if (text == "") return [0, 0]
  let line = 0,
    lines = 1
  const regex = new RegExp(["\\u001b\\[([0-9]*)(A|B)", "\n"].join("|"), "ig")
  let m
  while ((m = regex.exec(text)) !== null) {
    if (m[0] == "\n") line++
    else if (m[2] == "A") line -= m[1] == "" ? 1 : +m[1]
    else if (m[2] == "B") line += m[1] == "" ? 1 : +m[1]
    if (line + 1 > lines) lines = line + 1
  }
  return [lines, line]
}

export class Spinner {
  spinner = process.platform === "win32" ? cliSpinners.line : cliSpinners.dots
  frame = 0
  lines = 0
  interval: NodeJS.Timeout | undefined
  spinners = new Map<number, TSpinner>()
  running = false
  text = ""

  constructor(public stream = process.stdout) {}

  clear() {
    for (let i = 0; i < this.lines; i++) {
      if (i > 0) readline.moveCursor(this.stream, 0, -1)
      readline.clearLine(this.stream, 0)
    }
    this.lines = 0
  }

  render() {
    this.clear()
    const symbol = chalk.yellow(this.spinner.frames[this.frame])
    const lines = this.text.split("\n")
    for (const spinner of this.spinners.values()) {
      lines[spinner.line] = spinner.format(symbol)
    }
    const out = lines.join("\n")

    // Go to end of output, to make sure next clear will work as expected
    const [height, line] = ansiHeight(out)
    for (let i = line; i < height - 1; i++) {
      readline.moveCursor(this.stream, 0, 1)
    }
    readline.cursorTo(this.stream, 0)
    this.stream.write(out)
    this.lines = height
  }

  append(text: string, fixNL = true) {
    if (fixNL && this.text.length && !this.text.endsWith("\n"))
      this.text += "\n"
    this.text += text
    this.render()
  }

  start(text: string, level = 0) {
    this.append(text)
    const s = new TSpinner(this.text.split("\n").length - 1, text, level)
    this.append("")
    this.spinners.set(s.line, s)
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
      this.append("")
      this.render()
      this.interval = undefined
      cliCursor.show(this.stream)
      this.running = false
      this.spinners.clear()
      this.text = ""
      this.lines = 0
    }
  }
}
