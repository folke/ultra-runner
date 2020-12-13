import chalk from "chalk"
import { ChildProcess } from "child_process"
import { onProcessExit } from "./process"
import { spawn } from "cross-spawn"
import npmPath = require("npm-run-path")

export class Spawner {
  static children = new Map<number, ChildProcess>()

  output = ""
  buffer = ""
  exitCode: number | undefined = undefined

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

  constructor(
    public cmd: string,
    public args: string[] = [],
    public cwd = process.cwd(),
    public env?: Record<string, string>
  ) {}

  spawn(raw = false) {
    const env: Record<string, string> = {
      ...npmPath.env({ cwd: this.cwd }),
      FORCE_COLOR: `${chalk.level}`,
      ...this.env,
    }
    
    const child = spawn(this.cmd, this.args, {
      env,
      stdio: raw ? "inherit" : "pipe",
      cwd: this.cwd,
    })
    if (!Spawner.children.size) onProcessExit((reason) => Spawner.exit(reason))

    Spawner.children.set(child.pid, child)

    const processData = (data: string) => {
      data = `${data}`
      this.output += data
      let chunk = `${data}`
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

    return new Promise<void>((resolve, reject) => {
      child.stdout?.on("data", processData)
      child.stderr?.on("data", processData)
      child.on("error", (err) => {
        Spawner.children.delete(child.pid)
        reject(this.onError(err))
      })
      child.on("close", (code) => {
        this.exitCode = code
        if (this.buffer.length) this.onLine(`${this.buffer}\n`)
        this.buffer = ""
        Spawner.children.delete(child.pid)
        if (code) reject(this.onExit(code))
        else resolve()
      })
    })
  }

  static exit(_reason: string) {
    Spawner.children.forEach((child) => {
      // console.log(`[${reason}] Killing ${child.pid}`)
      child.kill()
    })
  }
}
