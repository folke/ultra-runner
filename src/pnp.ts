import { existsSync, readFileSync } from "fs"
import * as pnpapi from "pnpapi"
import memoize from "micro-memoize"
import path, { resolve } from "path"
import v8 from "v8"
import zlib from "zlib"

type InstallState = {
  storedResolutions: Map<string, string>
  storedPackages: Map<
    string,
    {
      name: string
      scope?: string
      reference: string
      locatorHash: string
      bin: Map<string, string>
      dependencies?: Map<string, { descriptorHash: string }>
    }
  >
}

type PnpAPI = typeof pnpapi & {
  // getDependencyTreeRoots is missing in pnpapi types https://yarnpkg.com/advanced/pnpapi#getdependencytreeroots
  getDependencyTreeRoots: () => pnpapi.PhysicalPackageLocator[]
}

const getInstallState = memoize((workspaceRoot: string) => {
  const serializedState = readFileSync(
    resolve(workspaceRoot, ".yarn", "install-state.gz")
  )
  const installState: InstallState = v8.deserialize(
    zlib.gunzipSync(serializedState)
  )
  return installState
})

export function getBinaries(workspaceRoot: string, packageName: string) {
  const binaries = new Map<string, string>()
  const installState = getInstallState(workspaceRoot)
  const hashes = new Set<string>()

  const {
    resolveRequest,
    getPackageInformation,
    getDependencyTreeRoots,
  } = getPnpApi(workspaceRoot)

  let packageLocator = getDependencyTreeRoots().find(
    (x) => x.name === packageName
  )

  if (!packageLocator) {
    throw new Error(`Cannot find package locator for ${packageName}`)
  }

  const packageLocation = getPackageInformation(packageLocator).packageLocation

  if (!packageLocation) {
    throw new Error(`Cannot find package location for ${packageName}`)
  }

  for (const p of installState.storedPackages.values()) {
    const pkgName = p.scope ? `@${p.scope}/${p.name}` : p.name
    if (packageName == pkgName) {
      hashes.add(p.locatorHash)
      p.dependencies?.forEach((dep) => {
        const h = installState.storedResolutions.get(dep.descriptorHash)
        if (h) hashes.add(h)
      })
    }
  }

  for (const h of hashes) {
    const p = installState.storedPackages.get(h)
    if (p?.bin.size) {
      ;[...p.bin.keys()].forEach((b) => {
        try {
          const pkgName = p.scope ? `@${p.scope}/${p.name}` : p.name
          const binPath = resolveRequest(
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            path.join(pkgName, p.bin.get(b)!),
            path.resolve(packageLocation, "package.json")
          )
          if (binPath) {
            binaries.set(b, binPath)
          }
          // eslint-disable-next-line no-empty
        } catch {}
      })
    }
  }

  return binaries
}

const getPnpApi = memoize(function getPnpApi(workspaceRoot: string): PnpAPI {
  const jsPath = path.resolve(workspaceRoot, ".pnp.js")
  const cjsPath = path.resolve(workspaceRoot, ".pnp.cjs")
  return existsSync(jsPath) ? require(jsPath) : require(cjsPath)
})
