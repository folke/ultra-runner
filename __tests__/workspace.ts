import * as ws from "../src/workspace"
import path from "path"
import { findUp } from "../src/package"
import { WorkspaceProviderType } from "../src/workspace.providers"

test("findUp", () => {
  const tests = [
    ["./foo/fa/boo", ".git", path.resolve(__dirname, "../")],
    [".", ".git", path.resolve(__dirname, "../")],
    [".", "node_modules", path.resolve(__dirname, "../")],
    [".", "package.json", path.resolve(__dirname, "../")],
  ]
  expect(findUp("blablabla")).toBeUndefined()
  tests.forEach(([cwd, name, result]) => {
    expect(findUp(name, cwd)).toBe(result)
  })
})

test("lerna", async () => {
  const packages = (
    await ws.getWorkspace({
      cwd: "__tests__/workspace/apps",
      type: WorkspaceProviderType.lerna,
    })
  )?.getPackages()
  expect(packages).toBeDefined()
  if (packages) {
    const dirs = packages.map((p) =>
      path.relative(".", p.root).replace(/\\/gu, "/")
    )
    dirs.sort()
    // eslint-disable-next-line jest/no-conditional-expect
    expect(dirs).toStrictEqual([
      "__tests__/workspace/apps/app1",
      "__tests__/workspace/apps/app2",
      "__tests__/workspace/libs/lib1",
      "__tests__/workspace/libs/lib2",
      "__tests__/workspace/libs/lib3",
    ])
  }
})

test("yarn", async () => {
  const packages = (
    await ws.getWorkspace({
      cwd: "__tests__/workspace/apps/app1",
      type: WorkspaceProviderType.yarn,
    })
  )?.getPackages()
  expect(packages).toBeDefined()
  if (packages) {
    const dirs = packages.map((p) =>
      path.relative(".", p.root).replace(/\\/gu, "/")
    )
    dirs.sort()
    // eslint-disable-next-line jest/no-conditional-expect
    expect(dirs).toStrictEqual([
      "__tests__/workspace/apps/app1",
      "__tests__/workspace/apps/app2",
      "__tests__/workspace/libs/lib1",
      "__tests__/workspace/libs/lib2",
      "__tests__/workspace/libs/lib3",
    ])
  }
})

test("pnpm", async () => {
  const packages = (
    await ws.getWorkspace({
      cwd: "__tests__/workspace/apps/app1",
      type: WorkspaceProviderType.pnpm,
    })
  )?.getPackages()
  expect(packages).toBeDefined()
  if (packages) {
    const dirs = packages.map((p) =>
      path.relative(".", p.root).replace(/\\/gu, "/")
    )
    dirs.sort()
    // eslint-disable-next-line jest/no-conditional-expect
    expect(dirs).toStrictEqual([
      "__tests__/workspace/apps/app1",
      "__tests__/workspace/apps/app2",
      "__tests__/workspace/libs/lib1",
      "__tests__/workspace/libs/lib2",
      "__tests__/workspace/libs/lib3",
    ])
  }
})

test("recursive", async () => {
  const packages = (
    await ws.getWorkspace({
      cwd: "__tests__/workspace",
      type: WorkspaceProviderType.recursive,
    })
  )?.getPackages()
  expect(packages).toBeDefined()
  if (packages) {
    const dirs = packages.map((p) =>
      path.relative(".", p.root).replace(/\\/gu, "/")
    )
    dirs.sort()
    // eslint-disable-next-line jest/no-conditional-expect
    expect(dirs).toStrictEqual([
      "__tests__/workspace/apps/app1",
      "__tests__/workspace/apps/app2",
      "__tests__/workspace/libs/lib1",
      "__tests__/workspace/libs/lib2",
      "__tests__/workspace/libs/lib3",
    ])
  }
})

test("workspace", async () => {
  const packages = (
    await ws.getWorkspace({ cwd: "__tests__/workspace/apps/app1" })
  )?.getPackages()
  expect(packages).toBeDefined()
  if (packages) {
    const dirs = packages.map((p) =>
      path.relative(".", p.root).replace(/\\/gu, "/")
    )
    dirs.sort()
    // eslint-disable-next-line jest/no-conditional-expect
    expect(dirs).toStrictEqual([
      "__tests__/workspace/apps/app1",
      "__tests__/workspace/apps/app2",
      "__tests__/workspace/libs/lib1",
      "__tests__/workspace/libs/lib2",
      "__tests__/workspace/libs/lib3",
    ])
  }
})
