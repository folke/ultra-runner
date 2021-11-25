import * as ws from "../src/workspace"
import path from "path"

test("filter dir", async () => {
  const workspace = await ws.getWorkspace({
    cwd: "__tests__/workspace/apps/app1",
  })
  expect(workspace).toBeDefined()
  if (workspace) {
    const dirs = workspace
      .getPackages(["apps/*"])
      .map((p) =>
        path.relative("__tests__/workspace", p.root).replace(/\\/gu, "/")
      )
    dirs.sort()
    // eslint-disable-next-line jest/no-conditional-expect
    expect(dirs).toStrictEqual(["apps/app1", "apps/app2"])
  }
})

test("filter pkg", async () => {
  const workspace = await ws.getWorkspace({
    cwd: "__tests__/workspace/apps/app1",
  })
  expect(workspace).toBeDefined()
  if (workspace) {
    const dirs = workspace
      .getPackages(["@scoped/*"])
      .map((p) =>
        path.relative("__tests__/workspace", p.root).replace(/\\/gu, "/")
      )
    dirs.sort()
    // eslint-disable-next-line jest/no-conditional-expect
    expect(dirs).toStrictEqual(["libs/lib3"])
  }
})

test("filter pkg no deps", async () => {
  const workspace = await ws.getWorkspace({
    cwd: "__tests__/workspace/apps/app1",
  })
  expect(workspace).toBeDefined()
  if (workspace) {
    const dirs = workspace
      .getPackages(["*app1"])
      .map((p) =>
        path.relative("__tests__/workspace", p.root).replace(/\\/gu, "/")
      )
    dirs.sort()
    // eslint-disable-next-line jest/no-conditional-expect
    expect(dirs).toStrictEqual(["apps/app1"])
  }
})

test("filter pkg with deps", async () => {
  const workspace = await ws.getWorkspace({
    cwd: "__tests__/workspace/apps/app1",
  })
  expect(workspace).toBeDefined()
  if (workspace) {
    const dirs = workspace
      .getPackages(["+*app1"])
      .map((p) =>
        path.relative("__tests__/workspace", p.root).replace(/\\/gu, "/")
      )
    dirs.sort()
    // eslint-disable-next-line jest/no-conditional-expect
    expect(dirs).toStrictEqual(["apps/app1", "libs/lib1", "libs/lib2"])
  }
})

test("filter multiple apps", async () => {
  const workspace = await ws.getWorkspace({
    cwd: "__tests__/workspace/apps/app1",
  })
  expect(workspace).toBeDefined()
  if (workspace) {
    const dirs = workspace
      .getPackages(["*/lib1", "*/lib2"])
      .map((p) =>
        path.relative("__tests__/workspace", p.root).replace(/\\/gu, "/")
      )
    dirs.sort()
    // eslint-disable-next-line jest/no-conditional-expect
    expect(dirs).toStrictEqual(["libs/lib1", "libs/lib2"])
  }
})
