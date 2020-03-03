// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
import { parse } from "comment-json"
import fs from "fs"
import path from "path"
// eslint-disable-next-line import/default
import tinyGlob from "tiny-glob"
import yaml from "yaml"

export type PackageJson = {
  name?: string
  scripts?: { [key: string]: string }
  dependencies?: { [key: string]: string }
  ultra?: {
    concurrent?: string[]
  }
  workspaces?: string[] | { packages?: string[] }
}

export type PackageJsonWithRoot = PackageJson & {
  root: string
}

export enum WorkspaceType {
  single,
  lerna,
  yarn,
  pnpm,
  rush,
  recursive,
}

export type Workspace = {
  type: WorkspaceType
  root: string
  packages: PackageJsonWithRoot[]
}

type GlobOptions = {
  cwd?: string
  dot?: boolean
  absolute?: boolean
  filesOnly?: boolean
  directoriesOnly?: boolean
  flush?: boolean
}

export async function glob(dirs: string[], options?: GlobOptions) {
  if (!options) options = {}
  options = { absolute: true, ...options }
  const ret = (await Promise.all(dirs.map(d => tinyGlob(d, options)))).flat()
  return options.directoriesOnly
    ? ret.filter(f =>
        fs
          .lstatSync(path.resolve(options?.cwd || process.cwd(), f))
          .isDirectory()
      )
    : ret
}

export function findUp(name: string, cwd = process.cwd()): string | undefined {
  let up = path.resolve(cwd)
  do {
    cwd = up
    const p = path.resolve(cwd, name)
    if (fs.existsSync(p)) return cwd
    up = path.resolve(cwd, "../")
  } while (up !== cwd)
}

export function getPackage(root: string): PackageJsonWithRoot | undefined {
  const pkgPath = path.resolve(root, "package.json")
  return fs.existsSync(pkgPath)
    ? { ...(require(pkgPath) as PackageJson), root }
    : undefined
}

export function findPackageUp(
  cwd = process.cwd()
): PackageJsonWithRoot | undefined {
  const root = findUp("package.json", cwd)
  if (root) return getPackage(root)
}

async function getPackages(
  root: string,
  globs: string[],
  type: WorkspaceType
): Promise<Workspace> {
  const packages = (await glob(globs, { cwd: root, directoriesOnly: true }))
    .map(p => getPackage(p))
    .filter(p => p && p.name) as PackageJsonWithRoot[]

  // Sort packages in correct build order based on workspace dependencies
  const map = new Map<string, PackageJsonWithRoot>(
    packages.map(p => [p.name || "", p])
  )
  const queue = packages.map(p => p.name)
  const order: string[] = []
  while (queue.length) {
    const pname = queue.shift() as string
    const deps = Object.keys(
      (map.get(pname) as PackageJsonWithRoot).dependencies || {}
    ).filter(d => map.has(d) && !order.includes(d))
    if (deps.length) queue.push(...deps, pname)
    else if (!order.includes(pname)) order.push(pname)
  }
  return {
    type,
    root,
    packages: packages.sort(
      (p1, p2) => order.indexOf(p1.name || "") - order.indexOf(p2.name || "")
    ),
  }
}

export function getLernaWorkspace(cwd = process.cwd()) {
  const root = findUp("lerna.json", cwd)
  if (root)
    return getPackages(
      root,
      require(path.resolve(root, "lerna.json")).packages,
      WorkspaceType.lerna
    )
}

export function getRushWorkspace(cwd = process.cwd()) {
  const root = findUp("rush.json", cwd)
  if (root)
    return getPackages(
      root,
      parse(
        fs.readFileSync(path.resolve(root, "rush.json")).toString()
      )?.projects.map((p: { projectFolder?: string }) => p.projectFolder),
      WorkspaceType.rush
    )
}

export function getYarnWorkspace(cwd = process.cwd()) {
  let root = findUp("package.json", cwd)
  while (root) {
    const pkg = getPackage(root)
    if (pkg?.workspaces) {
      if (Array.isArray(pkg.workspaces))
        return getPackages(root, pkg.workspaces, WorkspaceType.yarn)
      if (Array.isArray(pkg.workspaces.packages))
        return getPackages(root, pkg.workspaces.packages, WorkspaceType.yarn)
    }
    root = findUp("package.json", path.resolve(path.dirname(root), ".."))
  }
}

export function getPnpmWorkspace(cwd = process.cwd()) {
  const root = findUp("pnpm-workspace.yaml", cwd)
  if (root) {
    const y = yaml.parse(
      fs.readFileSync(path.resolve(root, "pnpm-workspace.yaml"), "utf8")
    )
    if (y.packages) return getPackages(root, y.packages, WorkspaceType.pnpm)
  }
}

export async function getRecursiveWorkspace(cwd = process.cwd()) {
  const dirs = (
    await glob(["**/*/package.json"], { cwd, filesOnly: true })
  ).map(f => path.dirname(f))
  if (dirs.length) return getPackages(cwd, dirs, WorkspaceType.recursive)
}

export async function getWorkspace(
  cwd = process.cwd(),
  recursive = false
): Promise<Workspace | undefined> {
  if (!recursive) {
    const pkg = findPackageUp()
    return pkg
      ? { root: pkg.root, type: WorkspaceType.single, packages: [pkg] }
      : undefined
  }
  const methods = [
    getPnpmWorkspace,
    getYarnWorkspace,
    getLernaWorkspace,
    getRushWorkspace,
    getRecursiveWorkspace,
  ]
  for (const m of methods) {
    const ret = await m(cwd)
    if (ret?.packages?.length) return ret
  }
}
