import * as cliCursor from "cli-cursor"
import chalk from "chalk"
// eslint-disable-next-line import/default
import cliSpinners from "cli-spinners"
import { performance } from "perf_hooks"
import readline from "readline"
import symbols from "./symbols"

export enum SpinnerResult {
  success = 1,
  error,
  warning,
}

export class Spinner {
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
        let du = `${duration.toFixed(3)}s`
        if (duration < 1) du = `${(duration * 1000).toFixed(0)}ms`
        return `${padding}${symbol} ${this.text} ${chalk.grey.dim(du)}${output}`
      }
    }
    return `${padding}${symbol} ${this.text}${output}`
  }
}

export class OutputSpinner {
  /* c8 ignore next */
  spinner = process.platform === "win32" ? cliSpinners.line : cliSpinners.dots
  frame = 0
  interval: NodeJS.Timeout | undefined
  spinners: Spinner[] = []
  running = false
  renderedLines: string[] = []
  perf = { rendered: 0, skipped: 0 }

  constructor(public stream = process.stdout) {}

  render(full = false) {
    const symbol = chalk.yellow(this.spinner.frames[this.frame])
    let text = ""
    for (const spinner of this.spinners) text += `${spinner.format(symbol)}\n`
    if (!full) text = text.trim()
    let lines = text.split("\n")
    if (!full) lines = lines.slice(-process.stdout.rows)

    // Check if we will write the same lines
    if (lines.length == this.renderedLines.length) {
      for (let i = 0; i < lines.length; i++) {
        if (lines[i] != this.renderedLines[i]) break
        /* c8 ignore next 4 */
        if (i == lines.length - 1) {
          this.perf.skipped += lines.length
          return
        }
      }
    }

    // Move cursor to first line
    if (this.renderedLines.length)
      readline.moveCursor(this.stream, 0, -this.renderedLines.length + 1)

    // Update existing lines
    for (let l = 0; l < this.renderedLines.length; l++) {
      const line = lines[l]
      if (line != this.renderedLines[l]) {
        readline.cursorTo(this.stream, 0)
        readline.clearLine(this.stream, 0)
        if (line) this.stream.write(line)
        this.perf.rendered++
      } else {
        this.perf.skipped++
      }
      if (l < this.renderedLines.length - 1)
        readline.moveCursor(this.stream, 0, 1)
    }

    // Render remaining lines
    if (lines.length > this.renderedLines.length) {
      if (this.renderedLines.length > 0) this.stream.write("\n")
      this.stream.write(lines.slice(this.renderedLines.length).join("\n"))
      this.perf.rendered += lines.length - this.renderedLines.length
    }

    this.renderedLines = lines
  }

  start(text: string, level = 0) {
    const s = new Spinner(text, level)
    this.spinners.push(s)
    if (!this.running) this._start()
    this.render()
    return s
  }

  stop(spinner: Spinner) {
    spinner.stop = performance.now()
    this.render()
  }

  error(spinner: Spinner) {
    spinner.result = SpinnerResult.error
    this.stop(spinner)
  }

  warning(spinner: Spinner) {
    spinner.result = SpinnerResult.warning
    this.stop(spinner)
  }

  success(spinner: Spinner) {
    spinner.result = SpinnerResult.success
    this.stop(spinner)
  }

  _start() {
    /* c8 ignore next */
    if (this.running) return
    this.running = true
    cliCursor.hide(this.stream)
    this.interval = setInterval(() => {
      /* c8 ignore next 2 */
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
      this.spinners = []
    }
  }
}
