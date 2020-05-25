/* eslint-disable unicorn/no-process-exit */
import chalk from "chalk"
import yargs from "yargs"
import { RunnerOptionDefs } from "./options"
import path from "path"

type YargsStyle = { style: chalk.Chalk; strings: string[] }

const styles: YargsStyle[] = [
  {
    style: chalk.blue.underline,
    strings: [
      "Status:",
      "Build:",
      "Formatting:",
      "Workspace:",
      "Options:",
      "Usage:",
    ],
  },
  { style: chalk.cyan, strings: ["boolean"] },
  { style: chalk.yellow, strings: ["number"] },
  { style: chalk.magenta, strings: ["string"] },
]

const program = yargs
  .wrap(Math.min(120, yargs.terminalWidth()))
  .locale("en")
  .usage(
    `${chalk.green("Usage:")} $0 ${chalk.gray.dim(
      "[options]"
    )} ${chalk.gray.bold("<cmd>")} ${chalk.gray.dim("[cmd-options]")}`
  )
  .alias("h", "help")
  .help(false)
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  .version(require(path.resolve(__dirname, "../package.json")).version)
  .group(
    ["recursive", "filter", "root", "concurrency", "serial", "topology"],
    "Workspace:"
  )
  .group(["info", "list", "monitor", "monitor-interval"], "Status:")
  .group(["build", "rebuild"], "Build:")
  .group(["pretty", "raw", "silent", "color"], "Formatting:")

Object.entries(RunnerOptionDefs).forEach(([name, def]) => {
  program.option(name, { ...def, requiresArg: def.type !== "boolean" })
})

const ret: Record<string, string> = {}
styles.forEach((style) =>
  style.strings.forEach((str) => (ret[str] = style.style(str)))
)
program.updateStrings(ret)
export function showHelp(exitCode = 1) {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  program.showHelp((str: string) =>
    process.stdout.write(
      `${str.replace(/--[a-zA-Z-]+| -[a-z]/gu, (str) => {
        return chalk.gray.bold(str)
      })}\n\n`
    )
  )
  console.log("See --list for available scripts")
  process.exit(exitCode)
}
