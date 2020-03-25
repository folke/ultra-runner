/* eslint-disable unicorn/no-process-exit */
import chalk from "chalk"
import { defaults, RunnerOptions } from "./options"
import { Runner } from "./runner"

async function showHelp(exitCode: number) {
  ;(await import("./yargs")).showHelp(exitCode)
}
export async function run(argv: string[] = process.argv) {
  let offset = 2
  for (offset = 2; offset < argv.length; offset++) {
    if (
      ["--filter", "--concurrency", "--monitor-interval"].includes(argv[offset])
    ) {
      offset++
      continue
    }
    if (!argv[offset].startsWith("-")) break
  }

  const args = argv.slice(offset)
  argv = argv.slice(0, offset)
  let options: Partial<RunnerOptions> = { ...defaults }
  if (argv.includes("--build") && !args.length) args.push("build")
  if (argv.includes("--rebuild") && !args.length) args.push("build")

  // When running without options, or with --recursive only,
  // do not parse argv with yargs. Saves about 50ms
  if (argv.length == 3 && (argv[2] == "-r" || argv[2] == "--recursive")) {
    options.recursive = true
    argv = argv.slice(0, -1)
  }
  if (argv.length > 2) {
    options = {
      dryRun: false,
      help: false,
      ...(await import("./yargs")).program.parse(argv),
    }
  }

  if (options.serial) options.concurrency = 1

  if (options.help || args.includes("-h") || args.includes("--help"))
    await showHelp(0)

  if (options.monitor) {
    return (await import("./process-list")).nodeTop(
      (options.monitorInterval || defaults.monitorInterval) * 1000
    )
  }

  if (args[0]) {
    if (args[0] == "build" || args[0].startsWith("build ")) options.build = true
    if (args[0] == "rebuild" || args[0].startsWith("rebuild ")) {
      args[0] = args[0].slice(2)
      options.rebuild = true
    }
  }
  if (options.rebuild) options.build = true

  if (options.debug) console.log({ options, args })

  const runner = new Runner(options)
  try {
    if (options.list) return await runner.list()
    if (options.info) return await runner.info()

    if (args.length) {
      if (options.recursive) await runner.runRecursive(args.join(" "))
      else await runner.run(args.join(" "))
    } else await showHelp(1)
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
