/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import splitAnsi from "ansi-split"
import readline from "readline"
// eslint-disable-next-line import/default
import ansiLength from "string-width"

export function showCursor(stream: NodeJS.WriteStream = process.stderr) {
  stream.isTTY && stream.write("\u001B[?25h")
}

export function hideCursor(stream: NodeJS.WriteStream = process.stderr) {
  if (!stream.isTTY) return
  ;(["SIGTERM", "SIGINT"] as const).forEach((event) =>
    process.once(event, () => showCursor(stream))
  )
  process.once("exit", () => showCursor(stream))
  stream.write("\u001B[?25l")
}

export class Terminal {
  lines: string[] = []
  output = ""
  resized = false

  constructor(
    public stream = process.stdout,
    public options = { clearScreen: false }
  ) {
    stream.setMaxListeners(50)
    stream.on("resize", () => (this.resized = true))
    hideCursor(stream)
    if (options.clearScreen) this.clearScreen()
  }

  clearScreen() {
    readline.cursorTo(this.stream, 0, 0)
    readline.clearScreenDown(this.stream)
    this.lines = []
  }

  diff(from: string, to: string) {
    if (!from || !to || from.length !== to.length) return
    const fromParts: string[] = splitAnsi(from)
    const toParts: string[] = splitAnsi(to)
    let left = 0
    let leftP = 0
    let leftWidth = 0
    let right = 0
    if (fromParts.length == toParts.length) {
      // eslint-disable-next-line unicorn/no-for-loop
      for (let i = 0; i < toParts.length; i++) {
        if (fromParts[i] == toParts[i]) {
          leftP = i + 1
          left += toParts[i].length
          leftWidth += ansiLength(toParts[i])
        } else break
      }
      // eslint-disable-next-line unicorn/no-for-loop
      for (let i = toParts.length - 1; i >= 0; i--) {
        if (fromParts[i] == toParts[i]) {
          right += toParts[i].length
        } else break
      }
    } else return
    // Even idx is a non-ansi string, so add previous ansi string to result
    if (leftP > 0 && leftP % 2 == 0) {
      left -= toParts[leftP - 1].length
    }
    return left > 0 || right > 0
      ? {
          left: leftWidth,
          str: to.slice(left),
          // FIX: str: to.slice(left, -right + 1),
        }
      : undefined
  }

  update(text: string | string[]) {
    this.output = ""
    if (this.resized) {
      this.lines = []
      this.resized = false
      if (this.options.clearScreen) {
        this.clearScreen()
      } else {
        readline.moveCursor(this.stream, 0, -this.lines.length + 1)
        readline.cursorTo(this.stream, 0)
        readline.clearScreenDown(this.stream)
      }
    }
    const lines = Array.isArray(text) ? text : text.split("\n")

    // Check if we will write the same lines
    if (
      lines.length == this.lines.length &&
      lines.every((line, idx) => this.lines[idx] == line)
    )
      return this.output

    // Move cursor to first line
    if (this.lines.length)
      readline.moveCursor(this.stream, 0, -this.lines.length + 1)

    // Update existing lines
    for (let l = 0; l < this.lines.length; l++) {
      const line = lines[l]
      if (line != this.lines[l]) {
        const diff = this.diff(line, this.lines[l])
        if (diff) {
          readline.cursorTo(this.stream, diff.left)
          this.stream.write(diff.str)
        } else {
          readline.cursorTo(this.stream, 0)
          if (!line || ansiLength(line) < ansiLength(this.lines[l]))
            readline.clearLine(this.stream, 0)
          if (line) this.stream.write(line)
        }
      }
      if (l < this.lines.length - 1) readline.moveCursor(this.stream, 0, 1)
    }

    // Render remaining lines
    if (lines.length > this.lines.length) {
      if (this.lines.length > 0) this.stream.write("\n")
      this.stream.write(lines.slice(this.lines.length).join("\n"))
    }
    this.lines = lines
  }
}
