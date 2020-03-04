import commander from "commander"
import { Runner } from "./runner"
import { defaults, RunnerOptions } from "./options"
import chalk from "chalk"

export async function run(argv: string[] = process.argv) {
  const program = new commander.Command()
    .option(
      "-r|--recursive",
      "Run command in every workspace folder concurrently"
    )
    .option(
      "--root",
      "When using --recursive, also include the root package of the workspace"
    )
    .option("-i|--info", "Show workspace dependencies")
    .option("-l|--list", "List package scripts. Also works with --recusive")
    .option(
      "-f|--filter <filter>",
      "Filter package name or directory using wildcard pattern"
    )
    .option(
      "-b|--build",
      "Use dependency tree to build packages in correct order"
    )
    .option("--rebuild", "Triggers a build without checking for file changes")
    .option(
      "--concurrency",
      `Set the maximum number of concurrency. Default is ${defaults.concurrency}. For unlimited concurrency use Infinity`,
      defaults.concurrency
    )
    .option(
      "--pretty",
      "enable pretty output, spinners and seperate command output. Default when a TTY",
      defaults.pretty
    )
    .option(
      "--no-pretty",
      "disables pretty output, spinners and seperate command output. Default when not a TTY. Useful for logging",
      !defaults.pretty
    )
    .option("--raw", "Output only raw command output")
    .option(
      "-s|--silent",
      "skip script output. ultra console logs will still be shown"
    )
    .option("--color", "colorize output", defaults.color)
    .option("--no-color", "don't colorize output")
    .option("-d|--dry-run", "output what would be executed")
    .version(require("../package.json").version, "-v|--version")
    .arguments("<cmd> [cmd-options]")
    .action(() => {
      return
    })

  const idx = argv.indexOf("--debug")
  const isDebug = idx >= 0
  if (isDebug) argv.splice(idx, 1)

  let offset = 2
  for (offset = 2; offset < argv.length; offset++) {
    if (["--filter", "-f", "--concurrency"].includes(argv[offset])) {
      offset++
      continue
    }
    if (!argv[offset].startsWith("-")) break
  }
  program.parse(argv.slice(0, offset))
  const options = program.opts() as RunnerOptions
  options.concurrency = +options.concurrency
  options.debug = isDebug

  if (options.rebuild) options.build = true

  const args = argv.slice(offset)
  if (args[0]) {
    if (args[0] == "build" || args[0].startsWith("build ")) options.build = true
    if (args[0] == "rebuild" || args[0].startsWith("rebuild ")) {
      args[0] = args[0].slice(2)
      options.build = true
      options.rebuild = true
    }
  }
  const runner = new Runner(options)
  try {
    if (options.list) return await runner.list()
    if (program.info) return await runner.info()

    if (args.length) {
      if (options.recursive) await runner.runRecursive(args.join(" "))
      else await runner.run(args.join(" "))
    } else {
      program.outputHelp()
      console.log("See --list for available scripts")
      // eslint-disable-next-line unicorn/no-process-exit
      process.exit(1)
    }
  } catch (error) {
    runner.spinner._stop()
    if (error instanceof Error) {
      console.error(chalk.red("error ") + error.message)
    } else console.error(chalk.red("error ") + error)
    if (isDebug) console.log(error)
    // eslint-disable-next-line unicorn/no-process-exit
    process.exit(1)
  }
}

/* c8 ignore next 3 */
if (module === require.main) {
  run()
}
