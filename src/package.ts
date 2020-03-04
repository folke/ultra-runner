import fastGlob from "fast-glob"
import fs from "fs"
import path from "path"

export type PackageJson = {
  name: string
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

interface FindPackagesOption extends fastGlob.Options {
  includeRoot?: boolean
}

const DEFAULT_IGNORE = [
  "**/node_modules/**",
  "**/bower_components/**",
  "**/test/**",
  "**/tests/**",
  "**/__tests__/**",
]

export async function findPackages(
  patterns: string[],
  options?: FindPackagesOption
) {
  if (!options) options = {}

  if (!options.ignore) options.ignore = []
  options.ignore.push(...DEFAULT_IGNORE)

  if (options.includeRoot) patterns.push(".")

  patterns = patterns.map(pattern => pattern.replace(/\/?$/u, "/package.json"))

  return (await fastGlob(patterns, options)).map(file =>
    path.resolve(options?.cwd || process.cwd(), path.dirname(file))
  )
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
  if (fs.existsSync(pkgPath)) {
    const pkg = require(pkgPath) as PackageJsonWithRoot
    if (!pkg.name) pkg.name = root
    pkg.root = root
    return pkg
  }
}
