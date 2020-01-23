import chalk from "chalk"
import commander from "commander"
import { existsSync } from "fs"
import { resolve } from "path"
import supportsColor from "supports-color"
import { PackageScripts } from "./parser"
import { Runner } from "./runner"

export async function run(argv: string[] = process.argv) {
  const program = new commander.Command()
    .option("-c|--concurrent", "Run the given commands concurrently")
    .option("-p|--parallel", "alias for --concurrent")
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
    if (!argv[offset].startsWith("-")) break
  }
  program.parse(argv.slice(0, offset))
  const packageFile = resolve(process.cwd(), "./package.json")
  const pkg = existsSync(packageFile)
    ? (require(packageFile) as PackageScripts)
    : /* c8 ignore next */ { scripts: {} }
  const runner = new Runner(pkg, program.opts())
  const args = argv.slice(offset)
  if (args.length) await runner.run(args.join(" "))
  else {
    program.outputHelp()
    console.log(
      chalk.underline("\nAvailable Scripts: ") +
        /* c8 ignore next */ Object.keys(pkg?.scripts ?? {}).join(", ")
    )
    // eslint-disable-next-line unicorn/no-process-exit
    process.exit(1)
  }
}

/* c8 ignore next 3 */
if (module === require.main) {
  run()
}
