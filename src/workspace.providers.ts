import fs from "fs"
import path from "path"

import { findUp, getPackage } from "./package"

export enum WorkspaceProviderType {
  single = "single",
  lerna = "lerna",
  yarn = "yarn",
  pnpm = "pnpm",
  rush = "rush",
  recursive = "recursive",
}

type WorkspaceProviderInfo = { root: string; patterns: string[] } | undefined

type WorkspaceProvider = (
  cwd: string
) => WorkspaceProviderInfo | Promise<WorkspaceProviderInfo>

export const providers: Record<WorkspaceProviderType, WorkspaceProvider> = {
  yarn: cwd => {
    let root = findUp("package.json", cwd)
    while (root) {
      const pkg = getPackage(root)
      if (pkg?.workspaces) {
        if (Array.isArray(pkg.workspaces))
          return { root, patterns: pkg.workspaces }
        if (Array.isArray(pkg.workspaces.packages))
          return { root, patterns: pkg.workspaces.packages }
      }
      root = findUp("package.json", path.resolve(path.dirname(root), ".."))
    }
  },

  pnpm: async cwd => {
    const yaml = await import("yaml")
    const root = findUp("pnpm-workspace.yaml", cwd)
    if (root) {
      const y = yaml.parse(
        fs.readFileSync(path.resolve(root, "pnpm-workspace.yaml"), "utf8")
      )
      if (y.packages) return { root, patterns: y.packages }
    }
  },

  lerna: cwd => {
    const root = findUp("lerna.json", cwd)
    if (root)
      return {
        root,
        patterns: require(path.resolve(root, "lerna.json"))
          .packages as string[],
      }
  },

  rush: async cwd => {
    const { parse } = await import("comment-json")
    const root = findUp("rush.json", cwd)
    if (root)
      return {
        root,
        patterns: parse(
          fs.readFileSync(path.resolve(root, "rush.json")).toString()
        )?.projects.map((p: { projectFolder?: string }) => p.projectFolder),
      }
  },

  recursive: cwd => {
    return { root: cwd, patterns: ["*/**"] }
  },

  single: cwd => {
    const root = findUp("package.json", cwd)
    if (root) return { root, patterns: [root] }
  },
}
