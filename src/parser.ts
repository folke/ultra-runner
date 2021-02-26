import { existsSync } from "fs"
import * as path from "path"
import Shellwords from "shellwords-ts"
import { PackageJson } from "./package"
import { getBinaries } from "./pnp"

export enum CommandType {
  script = "script",
  bin = "bin",
  system = "system",
  op = "op",
  unknown = "unknown",
}

type DebugCommand = string | { [cmd: string]: DebugCommand } | DebugCommand[]

export class Command {
  name: string
  children: Command[] = []
  concurrent = false
  cwd?: string
  packageName?: string

  // eslint-disable-next-line @typescript-eslint/require-await
  beforeRun = async () => {
    return
  }

  // eslint-disable-next-line @typescript-eslint/require-await
  afterRun = () => {
    return
  }

  constructor(
    public args: string[],
    public type: CommandType,
    public bin?: string,
    public env: Record<string, string> = {}
  ) {
    this.name = args[0]
  }

  add(...children: Command[]) {
    this.children.push(...children)
    return this
  }

  setCwd(cwd: string) {
    this.cwd = cwd
    for (const c of this.children) {
      c.setCwd(cwd)
    }
    return this
  }

  setPackageName(name: string) {
    this.packageName = name
    for (const c of this.children) {
      c.setPackageName(name)
    }
    return this
  }

  debug(showConcurrent = false): DebugCommand {
    const args = this.args.slice(1).join(" ")
    let cmd = `${this.type}:${this.name}${args.length ? ` ${args}` : ""}`
    if (showConcurrent && this.concurrent) cmd += ":cc"
    const children = []
    for (const c of this.children) {
      children.push(c.debug(showConcurrent))
    }
    if (children.length) {
      if (this.type == CommandType.unknown)
        return children.length == 1 ? children[0] : children
      const ret: DebugCommand = {}
      ret[cmd] = children.length == 1 ? children[0] : children
      return ret
    }
    return cmd
  }

  isPreScript() {
    return this.type == CommandType.script && this.name.startsWith("pre")
  }

  isPostScript() {
    return this.type == CommandType.script && this.name.startsWith("post")
  }
}

export class CommandParser {
  ops = [";", "||", "&&"]

  hooks: [string[], string[]][] = [
    [["yarn"], [CommandType.script, CommandType.bin]],
    [
      ["yarn", "run"],
      [CommandType.script, CommandType.bin],
    ],
    [["npm", "run"], [CommandType.script]],
    [["npx"], [CommandType.bin]],
    [["pnpx"], [CommandType.bin]],
    [["pnpm", "run"], [CommandType.script]],
  ]

  binPath: string[] = []
  binsPnp = new Map<string, string>()

  constructor(public pkg: PackageJson, cwd = process.cwd()) {
    while (cwd != "/") {
      const p = path.resolve(cwd, "./node_modules/.bin")
      if (existsSync(p)) this.binPath.push(p)
      if (
        existsSync(path.resolve(cwd, ".pnp.js")) ||
        existsSync(path.resolve(cwd, ".pnp.cjs"))
      ) {
        this.binsPnp = getBinaries(cwd, pkg.name)
      }
      const up = path.resolve(cwd, "../")
      if (up == cwd) break
      cwd = up
    }
  }

  parseArgs(cmd: string) {
    const args: string[] = []
    Shellwords.split(cmd, (rawPart) => {
      rawPart = rawPart.trim()
      // Fix incorrect handling of ops
      for (const op of this.ops) {
        if (rawPart !== op && rawPart.endsWith(op)) {
          args.push(rawPart.slice(0, -op.length), op)
          return
        }
      }
      args.push(rawPart)
    })
    return args
  }

  createScript(
    name: string,
    args: string[] = [],
    env: Record<string, string> = {}
  ) {
    const script = this.getScript(name)
    if (args[0] == "--") args.shift()
    const ret = this.createGroup(`${script} ${args.join(" ")}`, false)
    ret.name = name
    ret.type = CommandType.script
    if (this.getScript(`pre${name}`))
      ret.children.unshift(this.createScript(`pre${name}`, [], env))
    if (this.getScript(`post${name}`))
      ret.children.push(this.createScript(`post${name}`, [], env))
    ret.concurrent = this.pkg.ultra?.concurrent?.includes(name) ?? false
    return ret
  }

  createCommand(
    cmd: string[],
    allowScriptCmd: boolean,
    env: Record<string, string>
  ) {
    hook: for (const [prefix, types] of this.hooks) {
      for (const [i, p] of prefix.entries()) {
        if (p != cmd[i]) continue hook
      }
      const c = cmd[prefix.length]
      if (this.isScript(c) && types.includes(CommandType.script)) {
        return this.createScript(c, cmd.slice(prefix.length + 1), env)
      }

      if (types.includes(CommandType.bin) && this.isBin(c)) {
        return new Command(
          cmd.slice(prefix.length),
          CommandType.bin,
          this.getBin(c),
          env
        )
      }
    }
    if (allowScriptCmd && this.isScript(cmd[0]))
      return this.createScript(cmd[0], cmd.slice(1), env)
    if (this.isBin(cmd[0]))
      return new Command(cmd, CommandType.bin, this.getBin(cmd[0]), env)
    return new Command(cmd, CommandType.system, undefined, env)
  }

  parseEnvVar(arg: string): [string, string] | undefined {
    return /^([a-z_0-9-]+)=(.+)$/iu.exec(arg)?.slice(1, 3) as
      | [string, string]
      | undefined
  }

  isEnvVar(arg: string) {
    return this.parseEnvVar(arg) !== undefined
  }

  createGroup(cmd: string, allowScriptCmd = true) {
    const args = this.parseArgs(cmd)
    const group = new Command([], CommandType.unknown)
    let cmdArgs: string[] = []
    const env: Record<string, string> = {}
    let canBeEnvVar = true
    for (const a of args) {
      const envVar = this.parseEnvVar(a)
      if (canBeEnvVar && envVar) {
        env[envVar[0]] = envVar[1]
        continue
      } else canBeEnvVar = false
      if (this.ops.includes(a)) {
        if (cmdArgs.length)
          group.children.push(this.createCommand(cmdArgs, allowScriptCmd, env))
        cmdArgs = []
        group.children.push(new Command([a], CommandType.op))
      } else cmdArgs.push(a)
    }
    if (cmdArgs.length)
      group.children.push(this.createCommand(cmdArgs, allowScriptCmd, env))
    return group
  }

  parse(cmd: string) {
    return this.createGroup(cmd)
  }

  isScript(name: string) {
    return this.pkg.scripts && name in this.pkg.scripts
  }

  private getBin(name: string) {
    for (const dir of this.binPath) {
      const bin = path.resolve(dir, name)
      if (existsSync(bin)) return bin
    }
    // Special syntax for pnp binaries. Handles by spawn.ts
    if (this.binsPnp.has(name)) {
      return `yarn:${this.binsPnp.get(name)}`
    }
  }

  private isBin(name: string) {
    return this.getBin(name) ? true : false
  }

  getScript(name: string) {
    return this.pkg.scripts?.[name]
  }
}
