import chalk from "chalk"
import { relative } from "path"
import { RunnerOptions } from "./options"
import { Command, CommandParser, CommandType } from "./parser"
import { Workspace } from "./workspace"

export function createCommand(
  workspace: Workspace,
  cmd: string,
  options: RunnerOptions
) {
  const useTopology = options.build || options.topology
  const topoPromises = new Map<string | undefined, Promise<void>>()
  const topoPackages = new Set<string>()

  const command = new Command([], CommandType.script)

  let hasScript = false
  command.children = workspace
    .getPackages(options.filter)
    .map((pkg) => {
      const command = new CommandParser(pkg, pkg.root)
        .parse(cmd)
        .setCwd(pkg.root)
        .setPackageName(pkg.name)
      command.name = `${chalk.cyanBright(pkg.name)} at ${chalk.grey(
        relative(workspace.root, pkg.root)
      )}`
      command.type = CommandType.script
      if (useTopology) {
        topoPackages.add(pkg.name)
        command.beforeRun = async () => {
          topoPromises.set(
            pkg.name,
            new Promise((resolve) => {
              command.afterRun = () => {
                resolve()
              }
            })
          )
          await Promise.all(
            workspace
              .getDepTree(pkg.name)
              .filter((dep) => topoPackages.has(dep))
              .map((dep) => topoPromises.get(dep))
              .filter((p) => p)
          )
        }
      }
      hasScript =
        hasScript || command.children.some((c) => c.type == CommandType.script)
      return command
    })
    // If we have some scripts, filter out the packages that don't have that script
    .filter(
      (c) => !hasScript || c.children.some((c) => c.type == CommandType.script)
    )
  command.concurrent = true
  return command
}
