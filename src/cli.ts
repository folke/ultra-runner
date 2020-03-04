/* eslint-disable unicorn/no-process-exit */
import chalk from "chalk"
import yargs from "yargs"
import { defaults } from "./options"
import { Runner } from "./runner"

type YargsStyle = { style: chalk.Chalk; strings: string[] }

const styles = [
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
function updateStyles<T>(y: yargs.Argv<T>) {
  const ret: Record<string, string> = {}
  styles.forEach(style =>
    style.strings.forEach(str => (ret[str] = style.style(str)))
  )
  y.updateStrings(ret)
  return ret
}

function showHelp<T>(program: yargs.Argv<T>, exitCode = 1) {
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

export async function run(argv: string[] = process.argv) {
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
    .group(["info", "list"], "Status:")
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

  updateStyles(program)
  let offset = 2
  for (offset = 2; offset < argv.length; offset++) {
    if (["--filter", "--concurrency"].includes(argv[offset])) {
      offset++
      continue
    }
    if (!argv[offset].startsWith("-")) break
  }

  const options = program.parse(argv.slice(0, offset))
  const args = argv.slice(offset)

  if (options.help || args.includes("-h") || args.includes("--help"))
    showHelp(program, 0)

  if (args[0]) {
    if (args[0] == "build" || args[0].startsWith("build ")) options.build = true
    if (args[0] == "rebuild" || args[0].startsWith("rebuild ")) {
      args[0] = args[0].slice(2)
      options.rebuild = true
    }
  }
  if (options.rebuild) options.build = true

  const runner = new Runner(options)
  try {
    if (options.list) return await runner.list()
    if (options.info) return await runner.info()

    if (args.length) {
      if (options.recursive) await runner.runRecursive(args.join(" "))
      else await runner.run(args.join(" "))
    } else showHelp(program, 1)
  } catch (error) {
    runner.spinner._stop()
    if (error instanceof Error) {
      console.error(chalk.red("error ") + error.message)
    } else console.error(chalk.red("error ") + error)
    if (options.debug) console.log(error)
    process.exit(1)
  }
}

/* c8 ignore next 3 */
if (module === require.main) {
  run()
}
