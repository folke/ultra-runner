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
  build: false,
  concurrency: 10,
  debug: false,
  root: false,
}

export type RunnerOptions = typeof defaults
