import Shellwords from "shellwords-ts"
import { existsSync } from "fs"
import { resolve, posix } from "path"

export type PackageScripts = {
  scripts?: { [key: string]: string }
  ultra?: {
    concurrent?: string[]
  }
}

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

  constructor(public args: string[], public type: CommandType) {
    this.name = args[0]
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  debug(): DebugCommand {
    const args = this.args.slice(1).join(" ")
    const cmd = `${this.type}:${this.name}${args.length ? ` ${args}` : ""}`
    const children = []
    for (const c of this.children) {
      children.push(c.debug())
    }
    if (children.length) {
      if (this.type == CommandType.unknown)
        return children.length == 1 ? children[0] : children
      const ret: DebugCommand = {}
      ret[cmd] = children.length == 1 ? children[0] : children
      return ret
    }
    return cmd
    // if (skipRoot) return children
  }
}

export class CommandParser {
  ops = [";", "||", "&&"]

  hooks: [string[], string[]][] = [
    [["yarn"], ["script", "bin"]],
    [
      ["yarn", "run"],
      ["script", "bin"],
    ],
    [["npm", "run"], ["script"]],
    [["npx"], ["bin"]],
  ]

  bins: string[] = []

  constructor(public pkg: PackageScripts) {
    let cwd = process.cwd()
    while (cwd != "/") {
      const p = posix.resolve(cwd, "./node_modules/.bin")
      if (existsSync(p)) this.bins.push(p)
      cwd = posix.resolve(cwd, "../")
    }
  }

  parseArgs(cmd: string) {
    const args: string[] = []
    Shellwords.split(cmd, rawPart => {
      rawPart = rawPart.trim()
      // Fix incorrect handling of ops
      for (const op of this.ops) {
        if (rawPart !== op && rawPart.endsWith(op)) {
          args.push(rawPart.slice(0, -op.length))
          args.push(op)
          return
        }
      }
      args.push(rawPart)
    })
    return args
  }

  createScript(name: string, args: string[] = []) {
    const script = this.getScript(name)
    const ret = this.createGroup(`${script} ${args.join(" ")}`, false)
    ret.name = name
    ret.type = CommandType.script
    if (this.getScript(`pre${name}`))
      ret.children.unshift(this.createScript(`pre${name}`))
    if (this.getScript(`post${name}`))
      ret.children.push(this.createScript(`post${name}`))
    return ret
  }

  createCommand(cmd: string[], allowScriptCmd: boolean) {
    hook: for (const [prefix, types] of this.hooks) {
      for (const [i, p] of prefix.entries()) {
        if (p != cmd[i]) continue hook
      }
      const c = cmd[prefix.length]
      if (this.isScript(c) && types.includes(CommandType.script)) {
        return this.createScript(c, cmd.slice(prefix.length + 1))
      }

      if (this.isBin(c) && types.includes(CommandType.bin)) {
        return new Command(cmd.slice(prefix.length), CommandType.bin)
      }
    }
    if (allowScriptCmd && this.isScript(cmd[0]))
      return this.createScript(cmd[0], cmd.slice(1))
    if (this.isBin(cmd[0])) return new Command(cmd, CommandType.bin)
    return new Command(cmd, CommandType.system)
  }

  createGroup(cmd: string, allowScriptCmd = true) {
    const args = this.parseArgs(cmd)
    const group = new Command([], CommandType.unknown)
    let cmdArgs: string[] = []
    for (const a of args) {
      if (this.ops.includes(a)) {
        if (cmdArgs.length)
          group.children.push(this.createCommand(cmdArgs, allowScriptCmd))
        cmdArgs = []
        group.children.push(new Command([a], CommandType.op))
      } else cmdArgs.push(a)
    }
    if (cmdArgs.length)
      group.children.push(this.createCommand(cmdArgs, allowScriptCmd))
    return group
  }

  parse(cmd: string) {
    return this.createGroup(cmd)
  }

  isScript(name: string) {
    return this.pkg.scripts && name in this.pkg.scripts
  }

  getBin(name: string) {
    for (const dir of this.bins) {
      const bin = resolve(dir, name)
      if (existsSync(bin)) return bin
    }
  }

  isBin(name: string) {
    return this.getBin(name) ? true : false
  }

  getScript(name: string) {
    return this.pkg.scripts?.[name]
  }
}
