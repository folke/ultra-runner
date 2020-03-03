import chalk from "chalk"

export const defaults = {
  recursive: false,
  filter: undefined as string | undefined,
  color: chalk.supportsColor,
  pretty: process.stdout.isTTY,
  cwd: process.cwd(),
  raw: false,
  silent: false,
  dryRun: false,
  rebuild: false,
  list: false,
  info: false,
}

export type RunnerOptions = typeof defaults
