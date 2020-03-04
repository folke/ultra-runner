// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
import globrex from "globrex"
import path from "path"
import { getPackage, findPackages, PackageJsonWithRoot } from "./package"
import { providers, WorkspaceProviderType } from "./workspace.providers"

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
    packages.forEach(p => {
      if (!p.name) p.name = p.root
      this.packages.set(p.name, p)
      this.roots.set(p.root, p.name)
    })

    this.order = []
    ;[...this.packages.entries()].forEach(([name]) => {
      if (!this.order.includes(name)) {
        ;[...this.getDepTree(name), name].forEach(
          n => this.order.includes(n) || this.order.push(n)
        )
      }
    })
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
          await findPackages(info.patterns, { cwd: info.root })
        ).map(p => getPackage(p)) as PackageJsonWithRoot[]
        return new Workspace(info.root, packages, type)
      }
    }
  }

  getPackageForRoot(root: string) {
    return this.roots.get(root)
  }

  getDeps(pkgName: string) {
    return Object.keys(this.packages.get(pkgName)?.dependencies || {}).filter(
      dep => this.packages.has(dep) && dep !== pkgName
    )
  }

  _getDepTree(pkgName: string, seen: string[] = []) {
    if (seen.includes(pkgName)) return []
    seen.push(pkgName)

    const ret: string[] = []
    this.getDeps(pkgName).forEach(d => {
      ;[...this._getDepTree(d, seen), d].forEach(
        dd => ret.includes(dd) || ret.push(dd)
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
      const regex: RegExp = globrex(filter, { filepath: true }).regex
      ret = ret.filter(
        p =>
          regex.test(p.name || "") ||
          regex.test(path.relative(this.root, p.root).replace(/\\/gu, "/"))
      )
    }
    return ret.sort(
      (a, b) => this.order.indexOf(a.name) - this.order.indexOf(b.name)
    )
  }
}

export async function getWorkspace(options?: Partial<WorkspaceOptions>) {
  return Workspace.getWorkspace(options)
}
