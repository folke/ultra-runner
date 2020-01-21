import { existsSync } from "fs"
import { resolve } from "path"
import Shellwords from "shellwords-ts"

export type PackageScripts = { scripts: { [key: string]: string } }

export enum CommandType {
  script = "script",
  bin = "bin",
  system = "system",
  op = "op",
  unknown = "unknown",
}

export class Command {
  name: string
  kids: Command[] = []

  constructor(
    public args: string[],
    public type: CommandType = CommandType.system
  ) {
    this.name = args?.[0]
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
      args.push(rawPart.trim())
    })
    return args
  }

  createScript(name: string, args: string[] = []) {
    const script = this.getScript(name)
    if (!script) throw new Error(`Script '${script}' not found in package.json`)
    const ret = this.createGroup(script + " " + args.join(" "), false)
    ret.name = name
    ret.type = CommandType.script
    if (this.getScript(`pre${name}`))
      ret.kids.unshift(this.createScript(`pre${name}`))
    if (this.getScript(`${name}post`))
      ret.kids.push(this.createScript(`${name}post`))
    return ret
  }

  createCommand(cmd: string[], allowScriptCmd = true) {
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
    const cmdArgs: string[] = []
    for (const a of args) {
      if (this.ops.includes(a)) {
        if (cmdArgs.length)
          group.kids.push(this.createCommand(cmdArgs, allowScriptCmd))
        cmdArgs.length = 0
        group.kids.push(new Command([a], CommandType.op))
      } else cmdArgs.push(a)
    }
    if (cmdArgs.length)
      group.kids.push(this.createCommand(cmdArgs, allowScriptCmd))
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
