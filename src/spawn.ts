import { spawn } from "child_process"
import chalk from "chalk"

export class Spawner {
  output = ""
  buffer = ""

  onData = (data: string) => {
    data
  }

  onLine = (line: string) => {
    line
  }

  onError = (error: Error) => {
    return error
  }

  onExit = (code: number) => {
    return new Error(`Exit code ${code}`)
  }

  constructor(public cmd: string, public args: string[]) {}

  spawn() {
    const child = spawn(this.cmd, this.args, {
      stdio: "pipe",
      env: { ...process.env, FORCE_COLOR: chalk.level + "" },
    })
    const processData = (data: string) => {
      data = `${data}`
      this.output += data
      let chunk = data + ""
      let nl
      while ((nl = chunk.indexOf("\n")) >= 0) {
        const line = this.buffer + chunk.slice(0, nl)
        this.buffer = ""
        chunk = chunk.slice(nl + 1)
        this.onLine(line)
      }
      this.buffer = chunk
      this.onData(data)
    }

    return new Promise((resolve, reject) => {
      child.stdout?.on("data", processData)
      child.stderr?.on("data", processData)
      child.on("error", err => {
        reject(this.onError(err))
      })
      child.on("exit", code => {
        if (this.buffer.length) this.onLine(this.buffer + "\n")
        this.buffer = ""
        if (code) reject(this.onExit(code))
        else resolve()
      })
    })
  }
}
