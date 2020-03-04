import * as ws from "../src/workspace"
import path from "path"

test("filter dir", async () => {
  const workspace = await ws.getWorkspace({
    cwd: "__tests__/workspace/apps/app1",
  })
  expect(workspace).toBeDefined()
  if (workspace) {
    const dirs = workspace
      .getPackages("apps/*")
      .map(p =>
        path.relative("__tests__/workspace", p.root).replace(/\\/gu, "/")
      )
    dirs.sort()
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
      .getPackages("@scoped/*")
      .map(p =>
        path.relative("__tests__/workspace", p.root).replace(/\\/gu, "/")
      )
    dirs.sort()
    expect(dirs).toStrictEqual(["libs/lib3"])
  }
})
