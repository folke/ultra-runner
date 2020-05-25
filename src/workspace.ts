// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import globrex from "globrex"
import path from "path"
import { getPackage, findPackages, PackageJsonWithRoot } from "./package"
import { providers, WorkspaceProviderType } from "./workspace.providers"
import { existsSync } from "fs"

const defaultOptions = {
  cwd: process.cwd(),
  type: undefined as WorkspaceProviderType | undefined,
  includeRoot: false,
}

export type WorkspaceOptions = typeof defaultOptions

export class Workspace {
  packages = new Map<string, PackageJsonWithRoot>()
  roots = new Map<string, string>()
  order: string[]

  private constructor(
    public root: string,
    packages: PackageJsonWithRoot[],
    public type: WorkspaceProviderType
  ) {
    packages.forEach((p) => {
      if (!p.name) p.name = p.root
      this.packages.set(p.name, p)
      this.roots.set(p.root, p.name)
    })

    this.order = []
    ;[...this.packages.entries()].forEach(([name]) => {
      if (!this.order.includes(name)) {
        ;[...this.getDepTree(name), name].forEach(
          (n) => this.order.includes(n) || this.order.push(n)
        )
      }
    })
  }

  getPackageManager() {
    const pms = {
      npm: ["package-lock.json", "npm-shrinkwrap.json"],
      yarn: ["yarn.lock"],
      pnpm: ["pnpm-lock.yaml"],
    }
    for (const [type, files] of Object.entries(pms)) {
      if (files.some((f) => existsSync(path.resolve(this.root, f)))) return type
    }
  }

  static async detectWorkspaceProviders(cwd = process.cwd()) {
    const ret: WorkspaceProviderType[] = []
    const types = Object.entries(providers)
    for (const [type, provider] of types) {
      if (["single", "recursive"].includes(type)) continue
      if ((await provider(cwd))?.patterns.length) {
        ret.push(type as WorkspaceProviderType)
      }
    }
    return ret
  }

  static async getWorkspace(_options?: Partial<WorkspaceOptions>) {
    const options: WorkspaceOptions = { ...defaultOptions, ..._options }

    const types = options.type
      ? [options.type]
      : (Object.keys(providers) as WorkspaceProviderType[])

    for (const type of types) {
      const provider = providers[type]
      const info = await provider(options.cwd)
      if (info) {
        if (options.includeRoot) info.patterns.push(".")
        const packages = (
          await findPackages(info.patterns, {
            cwd: info.root,
            ignore: type == WorkspaceProviderType.recursive ? undefined : [],
          })
        ).map((p) => getPackage(p)) as PackageJsonWithRoot[]
        return new Workspace(info.root, packages, type)
      }
    }
  }

  getPackageForRoot(root: string) {
    return this.roots.get(root)
  }

  getDeps(pkgName: string) {
    return Object.keys({
      ...this.packages.get(pkgName)?.dependencies,
      ...this.packages.get(pkgName)?.devDependencies,
    }).filter((dep) => this.packages.has(dep) && dep !== pkgName)
  }

  _getDepTree(pkgName: string, seen: string[] = []) {
    if (seen.includes(pkgName)) return []
    seen.push(pkgName)

    const ret: string[] = []
    this.getDeps(pkgName).forEach((d) => {
      ;[...this._getDepTree(d, seen), d].forEach(
        (dd) => ret.includes(dd) || ret.push(dd)
      )
    })
    return ret
  }

  getDepTree(pkgName: string) {
    const ret = this._getDepTree(pkgName)
    const idx = ret.indexOf(pkgName)
    if (idx >= 0) ret.splice(idx, 1)
    return ret
  }

  getPackages(filter?: string) {
    let ret = [...this.packages.values()]

    if (filter) {
      const withDeps = filter.startsWith("+")
      if (withDeps) filter = filter.slice(1)
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
      const regex: RegExp = globrex(filter, { filepath: true }).regex
      const names = new Set<string>()
      ret.forEach((p) => {
        if (
          regex.test(p.name || "") ||
          regex.test(path.relative(this.root, p.root).replace(/\\/gu, "/"))
        ) {
          names.add(p.name)
          if (withDeps) this.getDepTree(p.name).forEach((dep) => names.add(dep))
        }
      })
      ret = ret.filter((p) => names.has(p.name))
    }
    return ret.sort(
      (a, b) => this.order.indexOf(a.name) - this.order.indexOf(b.name)
    )
  }
}

export async function getWorkspace(options?: Partial<WorkspaceOptions>) {
  return Workspace.getWorkspace(options)
}
