import chalk from "chalk"
// eslint-disable-next-line import/default
import { performance } from "perf_hooks"
import symbols from "./symbols"
import { Terminal } from "./terminal"

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
  spinner =
    process.platform === "win32"
      ? {
          interval: 130,
          frames: ["-", "\\", "|", "/"],
        }
      : {
          interval: 120,
          frames: ["⠋", "⠙", "⠹", "⠸", "⠼", "⠴", "⠦", "⠧", "⠇", "⠏"],
        }

  frame = 0
  interval: NodeJS.Timeout | undefined
  running = false
  spinnerMap = new Map<Spinner | undefined, Spinner[]>()
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  terminal: Terminal

  constructor(public stream = process.stdout) {
    this.terminal = new Terminal(stream)
  }

  render(full = false) {
    const symbol = chalk.yellow(this.spinner.frames[this.frame])

    let lineCount = 0
    const spinnerLines = this.spinners.map((spinner) => {
      const text = `${spinner.format(symbol)}`
      const lines = text.split("\n")
      lineCount += Math.min(lines.length, 3)
      return { count: Math.min(lines.length, 3), lines }
    })

    while (lineCount < process.stdout.rows) {
      const loopLineCount = +lineCount
      spinnerLines.every((s) => {
        if (s.lines.length > s.count) {
          s.count++
          lineCount++
        }
        return lineCount < process.stdout.rows
      })
      if (lineCount == loopLineCount) break
    }

    const limitLines = (lines: string[], count: number) => {
      const ret = [lines[0]]
      if (count > 1) ret.push(...lines.slice(1 - count))
      return ret
    }

    let text = `${spinnerLines
      .map((s) => (full ? s.lines : limitLines(s.lines, s.count)).join("\n"))
      .join("\n")}\n`

    if (!full) text = text.trim()
    let lines = text.split("\n")
    if (!full) lines = lines.slice(-process.stdout.rows)

    this.terminal.update(lines)
  }

  get spinners(): Spinner[] {
    const ret = new Array<Spinner>()
    const queue = this.spinnerMap.get(undefined)?.slice() ?? []
    while (queue.length) {
      const spinner = queue.shift() as Spinner
      ret.push(spinner)
      queue.unshift(...(this.spinnerMap.get(spinner) || []))
    }
    return ret
  }

  start(text: string, level = 0, parentSpinner?: Spinner) {
    const s = new Spinner(text, level)
    if (!this.spinnerMap.has(parentSpinner))
      this.spinnerMap.set(parentSpinner, [])
    this.spinnerMap.get(parentSpinner)?.push(s)

    // this.spinners.push(s)
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
      this.running = false
      this.spinnerMap.clear()
    }
  }
}
