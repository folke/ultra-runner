/* eslint-disable @typescript-eslint/ban-ts-ignore */
import chalk from "chalk"

export const HASH_FILE = ".ultra.cache.json"

export const defaults = {
  recursive: false,
  filter: undefined as string | undefined,
  color: chalk.supportsColor !== undefined,
  pretty: process.stdout.isTTY,
  raw: false,
  silent: false,
  dryRun: false,
  rebuild: false,
  list: false,
  info: false,
  topology: false,
  build: false,
  concurrency: 10,
  debug: false,
  root: false,
  help: false,
  monitor: false,
  monitorInterval: 2,
  serial: false,
}

export type RunnerOptions = typeof defaults

type RunnerOptionDef = {
  type: "number" | "boolean" | "string"
  description: string
  hidden?: boolean
  alias?: string
}

export const RunnerOptionDefs: Record<keyof RunnerOptions, RunnerOptionDef> = {
  debug: {
    type: "boolean",
    hidden: true,
    description: "Secret debugging option 🚀",
  },
  help: {
    type: "boolean",
    hidden: true,
    description: "Show help message",
  },
  recursive: {
    type: "boolean",
    description: "Run command in every workspace folder concurrently",
    alias: "r",
  },
  topology: {
    type: "boolean",
    description:
      "Run concurrently, automatically waiting for dependencies when needed. Defaults to 'true' for 'build'",
  },
  concurrency: {
    type: "number",
    description: "Set the maximum number of concurrency",
  },
  serial: {
    type: "boolean",
    description:
      "Set the maximum number of concurrency to 1. Same as --concurrency 1",
  },
  filter: {
    type: "string",
    description:
      "Filter package name or directory using wildcard pattern. Prefix the filter with '+' to always include dependencies.",
  },
  root: {
    type: "boolean",
    description:
      "When using --recursive, also include the root package of the workspace",
  },
  info: { type: "boolean", description: "Show workspace dependencies" },
  list: {
    type: "boolean",
    description: "List package scripts. Also works with --recursive",
  },
  monitor: {
    type: "boolean",
    description: "Show node process list, updated every 2 seconds",
  },
  monitorInterval: {
    type: "number",
    description: "Set process list interval in seconds",
  },
  build: {
    type: "boolean",
    description: "Use dependency tree to build packages in correct order",
    alias: "b",
  },
  rebuild: {
    type: "boolean",
    description: "Triggers a build without checking for file changes",
  },
  pretty: {
    type: "boolean",
    description:
      "enable pretty output, spinners and seperate command output. Default when a TTY",
  },
  raw: { type: "boolean", description: "Output only raw command output" },
  silent: {
    type: "boolean",
    description: "Skip script output. ultra console logs will still be shown",
  },
  color: { type: "boolean", description: "colorize output" },
  dryRun: {
    type: "boolean",
    description:
      "Show what commands would be executed, without actually executing them",
    alias: "d",
  },
}

export function parse(argv: string[] = process.argv) {
  const argNames = new Map<string, RunnerOptionDef & { name: string }>()
  Object.entries(RunnerOptionDefs).forEach(([name, def]) => {
    const deff: RunnerOptionDef & { name: string } = { ...def, name }
    argNames.set(name, deff)
    if (def.alias) argNames.set(def.alias, deff)
  })

  const ret: RunnerOptions = { ...defaults }
  const unknown: string[] = []

  let offset = 2
  for (offset = 2; offset < argv.length; offset++) {
    if (!argv[offset].startsWith("-")) break
    let arg = argv[offset]
      .replace(/^[-]+/u, "")
      .replace(/-./gu, (x) => x.toUpperCase()[1])
    const negate = /^no[A-Z]/u.test(arg)
    if (negate) arg = arg[2].toLowerCase() + arg.slice(3)
    const def = argNames.get(arg)
    if (def) {
      arg = def.name
      if (def.type == "boolean") {
        // @ts-ignore
        ret[arg] = !negate
      } else if (def.type == "number") {
        // @ts-ignore
        ret[arg] = +argv[++offset]
      } else if (def.type == "string") {
        // @ts-ignore
        ret[arg] = argv[++offset]
      }
    } else unknown.push(arg)
  }

  return { ...ret, _: unknown, "--": argv.slice(offset) }
}
