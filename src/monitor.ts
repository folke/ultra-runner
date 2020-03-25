import pslist = require("ps-list")
import chalk from "chalk"
import { basename, normalize, relative, resolve } from "path"
import readline, { Key } from "readline"
import { join, split } from "shellwords-ts"
import { findUp } from "./package"
import { onProcessExit } from "./process"
import { hideCursor } from "./terminal"
import pidCwd = require("pid-cwd")
import stringWidth = require("string-width")

type ProcessListInfo = {
  pid: number
  name: string
  ppid: number
  cmd?: string
  cpu?: number
  memory?: number
  uid?: number
}

type ProcessInfo = ProcessListInfo & {
  argv: string[]
  project?: string
  cwd?: string
  children: ProcessInfo[]
  prefix?: string
}

async function parseCommand(proc: ProcessListInfo): Promise<ProcessInfo> {
  if (!proc.cmd) proc.cmd = "node"

  const ret: ProcessInfo = {
    ...proc,
    argv: split(proc.cmd).map((ss) => normalize(ss)),
    children: [],
  }

  // shift node binary
  ret.argv.shift()

  if (!ret.argv.length) ret.argv[0] = proc.cmd || proc.name

  // shift all node options
  while (ret.argv.length && ret.argv[0].startsWith("-")) ret.argv.shift()

  if (!ret.argv.length) ret.argv[0] = proc.cmd || proc.name

  // Compact node_modules scripts
  ret.argv[0] = ret.argv[0].replace(
    /^.*node_modules\/.*\/([^/]+?)(\.[tj]s)?$/u,
    (_str, bin) => bin
  )

  // Compact all node_modules stuff
  ret.argv = ret.argv.map((arg) => arg.replace(/.*node_modules\//u, ""))

  // Replace common binaries
  const knownBins = ["npx", "npm"]
  knownBins.forEach((r) => {
    if (new RegExp(`/${r}(.[tj]s)?$`, "u").test(ret.argv[0])) ret.argv[0] = r
  })

  ret.argv[0] = ret.argv[0].replace(/^\.bin\//u, "")

  ret.cwd = await pidCwd(proc.pid)
  if (ret.cwd) {
    const root = findUp("package.json", ret.cwd)
    if (root) {
      ret.project = (await import(resolve(ret.cwd, "package.json"))).name
      if (ret.argv[0].startsWith(root))
        ret.argv[0] = relative(root, ret.argv[0])
    }
    if (!ret.project) ret.project = basename(ret.cwd)
  }

  return ret
}

async function getProcessList(): Promise<ProcessInfo[]> {
  const procs = (await pslist())
    .map((proc) => {
      const name = proc.cmd?.length ? proc.cmd?.split(" ")?.[0] : proc.name
      return { ...proc, name }
    })
    .filter((proc) => /node(\.exe)?/iu.test(basename(proc.name)))
  return await Promise.all(procs.map((proc) => parseCommand(proc)))
}

function getTotalCpu(proc: ProcessInfo): number {
  return (
    (proc.cpu || 0) +
    proc.children.reduce((p, c) => (getTotalCpu(c) || 0) + p, 0)
  )
}

async function getProcessTree() {
  const procs = await getProcessList()
  const pids = new Map(procs.map((proc) => [proc.pid, proc]))
  const children = new Set<number>()
  procs.forEach((proc) => {
    if (pids.has(proc.ppid)) {
      pids.get(proc.ppid)?.children.push(proc)

      children.add(proc.pid)
    }
  })
  return procs
    .filter((proc) => !children.has(proc.pid))
    .sort((a, b) => getTotalCpu(b) - getTotalCpu(a))
}

function flatten(proc: ProcessInfo) {
  proc.prefix = proc.children.length ? "─┬" : "─"
  const ret = [proc]
  proc.children.forEach((child, c) => {
    const flatChildren = flatten(child)
    flatChildren.forEach((other, o) => {
      if (o == 0)
        other.prefix =
          (c == proc.children.length - 1 ? " └" : " ├") + other.prefix
      else
        other.prefix =
          (c == proc.children.length - 1 ? "  " : " │") + other.prefix
    })
    ret.push(...flatChildren)
  })
  return ret
}

function flattenTree(procs: ProcessInfo[]): ProcessInfo[] {
  const root: ProcessInfo = {
    pid: 0,
    name: "",
    ppid: 0,
    argv: [],
    children: procs,
  }

  const ret: ProcessInfo[] = flatten(root)
  return ret.slice(1)
}

function table(procs: ProcessInfo[]) {
  const header = ["pid", "cpu", "mem", "project", "cmd"].map((h) =>
    chalk.red(h)
  )

  let items: string[][] = [
    header,
    ...procs.map((proc) => [
      `${chalk.magenta(proc.pid)}`,
      proc.cpu === undefined
        ? ""
        : ((proc.cpu ?? 0) > 10 ? chalk.red : chalk.green)(
            `${proc.cpu}%`.padEnd(5)
          ),
      proc.memory === undefined
        ? ""
        : ((proc.memory ?? 0) > 10 ? chalk.red : chalk.green)(
            `${proc.memory}%`
          ),
      chalk.blue(proc.project ? proc.project : ""),
      proc.prefix || "",
      join(proc.argv),
    ]),
  ]

  const widths = new Array<number>()
  items.forEach((item) =>
    item.forEach(
      (value, col) =>
        (widths[col] = Math.max(widths[col] || 0, stringWidth(value)))
    )
  )

  const cmdWidth =
    process.stdout.columns -
    widths
      .slice(0, -1)
      .map((v) => v + 1)
      .reduce((p, c) => p + c) -
    8

  items = items.map((item, row) => {
    for (let col = 0; col <= 3; col++)
      item[col] += " ".repeat(widths[col] - stringWidth(item[col]))
    if (row !== 0) {
      item[4] = item[4].padEnd(widths[4], "─")
      if (item[5].length > cmdWidth - 1)
        item[5] = `${item[5].slice(0, cmdWidth - 2)}…`
      const argv = item[5].split(" ")
      item[4] = `${item[4]} ${chalk.yellow(argv[0])} ${argv.slice(1).join(" ")}`
    }
    return item.slice(0, 5)
  })
  widths[4] += cmdWidth
  return items
    .map((item, row) => {
      let ret = item.join(chalk.grey(" │ "))
      // return `${stringWidth(ret)}`
      // console.log(stringWidth(ret))
      if (row === 0)
        ret += `\n${chalk.gray(
          widths
            .slice(0, -1)
            .map((w) => "─".repeat(w))
            .join("─┼─")
        )}`
      return ret
    })
    .join("\n")
}

async function updater() {
  const list = flattenTree(await getProcessTree())
  let text = table(list)
  text = text.split("\n").slice(0, process.stdout.rows).join("\n")
  // terminal.clearScreen()
  readline.cursorTo(process.stdout, 0, 0)
  readline.clearScreenDown(process.stdout)
  process.stdout.write(text)
}

export function nodeTop(ms = 2000) {
  ms = Math.max(ms, 1000)
  hideCursor()
  process.stdout.on("resize", () => {
    updater()
  })
  updater()
  const interval = setInterval(() => {
    updater()
  }, ms)
  onProcessExit(() => clearInterval(interval))

  readline.emitKeypressEvents(process.stdin)
  if (process.stdin.isTTY) process.stdin.setRawMode(true)
  process.stdin.on("keypress", (_event, key: Key) => {
    if (key.name === "q" || (key.ctrl && key.name == "c")) {
      clearInterval(interval)
      // eslint-disable-next-line unicorn/no-process-exit
      process.exit(0)
    }
  })
}
