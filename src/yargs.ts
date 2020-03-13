/* eslint-disable unicorn/no-process-exit */
import chalk from "chalk"
import yargs from "yargs"
import { defaults } from "./options"
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
  .strict()
  .wrap(Math.min(120, yargs.terminalWidth()))
  .locale("en")
  .usage(
    `${chalk.green("Usage:")} $0 ${chalk.gray.dim(
      "[options]"
    )} ${chalk.gray.bold("<cmd>")} ${chalk.gray.dim("[cmd-options]")}`
  )
  .alias("h", "help")
  .help(false)
  .version(require(path.resolve(__dirname, "../package.json")).version)
  .option("debug", {
    type: "boolean",
    hidden: true,
    description: "Secret debugging option 🚀",
  })
  .option("recursive", {
    type: "boolean",
    description: "Run command in every workspace folder concurrently",
    alias: "r",
  })
  .option("concurrency", {
    type: "number",
    default: defaults.concurrency,
    requiresArg: true,
    description: "Set the maximum number of concurrency",
  })
  .option("filter", {
    type: "string",
    requiresArg: true,
    description: "Filter package name or directory using wildcard pattern",
  })
  .option("root", {
    type: "boolean",
    description:
      "When using --recursive, also include the root package of the workspace",
  })
  .group(["recursive", "filter", "root", "concurrency"], "Workspace:")
  .option("info", {
    type: "boolean",
    description: "Show workspace dependencies",
  })
  .option("list", {
    type: "boolean",
    description: "List package scripts. Also works with --recusive",
  })
  .option("monitor", {
    type: "boolean",
    description: "Show node process list, updated every 2 seconds",
  })
  .option("monitor-interval", {
    type: "number",
    default: defaults.monitorInterval,
    requiresArg: true,
    description: "Set process list interval in seconds",
  })
  .group(["info", "list", "monitor", "monitor-interval"], "Status:")
  .option("build", {
    type: "boolean",
    description: "Use dependency tree to build packages in correct order",
    alias: "b",
  })
  .option("rebuild", {
    type: "boolean",
    description: "Triggers a build without checking for file changes",
  })
  .group(["build", "rebuild"], "Build:")
  .option("pretty", {
    type: "boolean",
    default: defaults.pretty,
    description:
      "enable pretty output, spinners and seperate command output. Default when a TTY",
  })
  .option("raw", {
    type: "boolean",
    description: "Output only raw command output",
  })
  .option("silent", {
    type: "boolean",
    description: "Skip script output. ultra console logs will still be shown",
  })
  .option("color", {
    type: "boolean",
    description: "colorize output",
    default: defaults.color,
  })
  .group(["pretty", "raw", "silent", "color"], "Formatting:")
  .option("dry-run", {
    type: "boolean",
    description:
      "Show what commands would be executed, without actually executing them",
    alias: "d",
  })

const ret: Record<string, string> = {}
styles.forEach(style =>
  style.strings.forEach(str => (ret[str] = style.style(str)))
)
program.updateStrings(ret)
export function showHelp(exitCode = 1) {
  // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
  // @ts-ignore
  program.showHelp((str: string) =>
    process.stdout.write(
      `${str.replace(/--[a-zA-Z-]+| -[a-z]/gu, str => {
        return chalk.gray.bold(str)
      })}\n\n`
    )
  )
  console.log("See --list for available scripts")
  process.exit(exitCode)
}

export { program }
