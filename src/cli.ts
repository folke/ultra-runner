/* eslint-disable unicorn/no-process-exit */
import chalk from "chalk"
import { parse } from "./options"
import { Runner } from "./runner"

async function showHelp(exitCode: number) {
  ;(await import("./yargs")).showHelp(exitCode)
}
export async function run(argv: string[] = process.argv) {
  const options = parse(argv)
  const args = options["--"]

  if (argv.includes("--build") && !args.length) args.push("build")
  if (argv.includes("--rebuild") && !args.length) args.push("build")

  if (options.serial) options.concurrency = 1

  if (options.help) return await showHelp(1)

  if (options.monitor) {
    return (await import("./monitor")).nodeTop(options.monitorInterval * 1000)
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
  void run()
}
