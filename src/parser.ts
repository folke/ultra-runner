import { existsSync } from "fs"
import { resolve } from "path"
import Shellwords from "shellwords-ts"

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

export class Command {
  name: string
  children: Command[] = []

  constructor(public args: string[], public type: CommandType) {
    this.name = args[0]
  }

  debug(skipRoot = true): any {
    const ret = `${this.type}:${this.args.join(" ")}`
    const children = []
    for (const c of this.children) {
      children.push(c.debug(false))
    }
    if (skipRoot) return children
    return children.length ? [ret, children] : ret
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

  constructor(public pkg: PackageScripts) {}

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
    const ret = this.createGroup(script + " " + args.join(" "), false)
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
      for (let i = 0; i < prefix.length; i++) {
        if (prefix[i] != cmd[i]) continue hook
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

  isBin(name: string) {
    return existsSync(resolve("./node_modules/.bin/", name))
  }

  getScript(name: string) {
    return this.pkg.scripts?.[name]
  }
}
