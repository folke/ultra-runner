import chalk from "chalk"

export const defaults = {
  recursive: false,
  filter: undefined as string | undefined,
  color: chalk.supportsColor,
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
