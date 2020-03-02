import commander from "commander"
import supportsColor from "supports-color"
import { Runner } from "./runner"

export async function run(argv: string[] = process.argv) {
  const program = new commander.Command()
    .option("-c|--concurrent", "Run the given commands concurrently")
    .option("-p|--parallel", "Run the given commands in parallel")
    .option("-r|--recursive", "Run command in every workspace folder")
    .option("--info", "Show workspace dependencies")
    .option("-l|--list", "List package scripts. Also works with --recusive")
    .option(
      "--tree",
      "Follow workspace dependency tree. Also works with --concurrent"
    )
    .option(
      "-f|--filter <filter>",
      "Filter package name or directory using wildcard pattern"
    )
    .option(
      "--fancy",
      "enable fancy output, spinners and seperate command output. Default when a TTY",
      process.stdout.isTTY
    )
    .option(
      "--no-fancy",
      "disables fancy output, spinners and seperate command output. Default when not a TTY. Useful for logging",
      !process.stdout.isTTY
    )
    .option("--cwd <directory>", "Run in directory")
    .option("--raw", "Output only raw command output")
    .option(
      "-s|--silent",
      "skip script output. ultra console logs will still be shown"
    )
    .option("--color", "colorize output", supportsColor.stdout.level > 0)
    .option("--no-color", "don't colorize output")
    .option("-d|--dry-run", "output what would be executed")
    .version(require("../package.json").version, "-v|--version")

  let offset = 2
  for (offset = 2; offset < argv.length; offset++) {
    if (["--cwd", "--filter", "-f"].includes(argv[offset])) {
      offset++
      continue
    }
    if (!argv[offset].startsWith("-")) break
  }
  program.parse(argv.slice(0, offset))
  const options = program.opts()

  const runner = new Runner(options)
  if (options.list) return await runner.list()
  if (program.info) return await runner.info()

  const args = argv.slice(offset)

  if (args.length) {
    if (options.recursive) await runner.runRecursive(args.join(" "))
    else await runner.run(args.join(" "))
  } else {
    program.outputHelp()
    console.log("See --list for available scripts")
    // eslint-disable-next-line unicorn/no-process-exit
    process.exit(1)
  }
}

/* c8 ignore next 3 */
if (module === require.main) {
  run()
}
