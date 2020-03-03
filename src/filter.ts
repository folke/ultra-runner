// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
import globrex from "globrex"
import { Workspace } from "./workspace"
import path from "path"

export function filter(workspace: Workspace, filter: string) {
  const regex: RegExp = globrex(filter, { filepath: true }).regex
  workspace.packages = workspace.packages.filter(
    p =>
      regex.test(p.name || "") ||
      regex.test(path.relative(workspace.root, p.root).replace(/\\/gu, "/"))
  )
  return workspace
}
