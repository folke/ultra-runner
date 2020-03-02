import * as ws from "../src/workspace"
import path from "path"

test("findUp ", () => {
  const tests = [
    ["./foo/fa/boo", ".git", path.resolve(__dirname, "../")],
    [".", ".git", path.resolve(__dirname, "../")],
    [".", "node_modules", path.resolve(__dirname, "../")],
    [".", "package.json", path.resolve(__dirname, "../")],
  ]
  expect(ws.findUp("blablabla")).toBeUndefined()
  tests.forEach(([cwd, name, result]) => {
    expect(ws.findUp(name, cwd)).toBe(result)
  })
})

test("lerna", async () => {
  const packages = (await ws.getLernaWorkspace("__tests__/workspace/apps"))
    ?.packages
  expect(packages).toBeDefined()
  if (packages) {
    const dirs = packages.map(p =>
      path.relative(".", p.root).replace("\\", "/")
    )
    dirs.sort()
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
  const packages = (await ws.getYarnWorkspace("__tests__/workspace/apps/app1"))
    ?.packages
  expect(packages).toBeDefined()
  if (packages) {
    const dirs = packages.map(p =>
      path.relative(".", p.root).replace("\\", "/")
    )
    dirs.sort()
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
  const packages = (await ws.getPnpmWorkspace("__tests__/workspace/apps/app1"))
    ?.packages
  expect(packages).toBeDefined()
  if (packages) {
    const dirs = packages.map(p =>
      path.relative(".", p.root).replace("\\", "/")
    )
    dirs.sort()
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
  const packages = (await ws.getRecursiveWorkspace("__tests__/workspace"))
    ?.packages
  expect(packages).toBeDefined()
  if (packages) {
    const dirs = packages.map(p =>
      path.relative(".", p.root).replace("\\", "/")
    )
    dirs.sort()
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
    await ws.getWorkspace("__tests__/workspace/apps/app1", true)
  )?.packages
  expect(packages).toBeDefined()
  if (packages) {
    const dirs = packages.map(p =>
      path.relative(".", p.root).replace("\\", "/")
    )
    dirs.sort()
    expect(dirs).toStrictEqual([
      "__tests__/workspace/apps/app1",
      "__tests__/workspace/apps/app2",
      "__tests__/workspace/libs/lib1",
      "__tests__/workspace/libs/lib2",
      "__tests__/workspace/libs/lib3",
    ])
  }
})
