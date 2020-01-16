import pkg from "../package.json"
import { FullVersion } from "package-json"
import { parse, ParseEntry, quote } from "shell-quote"
import { existsSync } from "fs"
import { resolve } from "path"

import execa from "execa"

class Runner {
  ops = [";", "||", "&&"]

  constructor(public pkg: FullVersion) {
    console.log(pkg.author)
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

  eat(args: ParseEntry[]) {
    for (let i = 0; i < args.length; i++) {
      const op = (args[i] as { op: string })?.op

      if (this.ops.includes(op)) {
        return [args.slice(0, i), args.slice(i)]
      }
    }
    return [args, []]
  }

  parse(cmd: ParseEntry[]) {
    const op = (cmd[0] as { op: string })?.op

    if (this.ops.includes(op)) {
      this.runOp(op)
      this.parse(cmd.slice(1))
    } else if (cmd[0] == "yarn") {
      cmd = cmd.slice(1)
      if (cmd[0] == "run") cmd = cmd.slice(1)
      const [args, other] = this.eat(cmd)
      this.runYarn(args)
      if (other.length) this.parse(other)
    } else if (cmd[0] == "npx") {
      cmd = cmd.slice(1)
      const [args, other] = this.eat(cmd)
      this.runNpx(args)
      if (other.length) this.parse(other)
    } else if (cmd[0] == "npm" && cmd[1] == "run") {
      cmd = cmd.slice(2)
      const [args, other] = this.eat(cmd)
      this.runNpm(args)
      if (other.length) this.parse(other)
    } else if (this.isBin(cmd[0] as string)) {
      const [args, other] = this.eat(cmd)
      this.runBin(args)
      if (other.length) this.parse(other)
    } else {
      const [args, other] = this.eat(cmd)
      this.runSystem(args)
      if (other.length) this.parse(other)
    }
  }

  runOp(op: string) {
    console.log(`[${op}]`)
  }

  runNpm(args: ParseEntry[]) {
    console.log(`[npm-script] ${args[0]}`, args)
    this.run(args[0] as string, args.slice(1))
  }

  runNpx(args: ParseEntry[]) {
    console.log(`[npx] `, args)
    if (this.isBin(args[0] as string)) {
      this.runBin(args)
    }
  }

  runYarn(args: ParseEntry[]) {
    console.log(`[yarn] ${args[0]}`, args)
    this.run(args[0] as string, args.slice(1))
  }

  async runSystem(args: ParseEntry[]) {
    console.log(`[system] `, this.quote(args).join(" "))
    const cmd = this.quote(args)
    await this.exec(cmd)
  }

  async runBin(args: ParseEntry[]) {
    console.log(`[bin] `, this.quote(args).join(" "))
    const cmd = this.quote(args)
    await this.exec(cmd)
  }

  async exec(args: string[]) {
    const e = execa(args[0], args.slice(1))
    e.stdout?.pipe(process.stdout)
    return e
  }

  quote(args: ParseEntry[]) {
    const ret = []
    for (const arg of args) {
      const op = (arg as any)?.op
      if (op) {
        if (op == "glob") {
          ret.push((arg as any).pattern)
        }
      } else {
        const a = arg as string
        ret.push(a.includes(" ") ? quote([a]) : a)
      }
    }
    return ret
  }

  run(name: string, args: ParseEntry[] = []) {
    console.log(`[run] ${name}`, args)
    if (this.isScript(name)) {
      if (this.isScript(`pre${name}`)) {
        this.run(`pre${name}`)
      }
      const script = this.getScript(name) as string
      this.parse(parse(script).concat(args))
    } else {
      this.parse([name, ...args])
    }
  }
}

const runner = new Runner(pkg as any)

// console.log(runner.run("build"))
// console.log(runner.run("lint:fix"))
console.log(runner.run("lint"))
// console.log(runner.isBin("ts-node"))
// console.log(data)

console.log("122")
