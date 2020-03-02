import * as ws from "../src/workspace"
import path from "path"
import { filter } from "../src/filter"

test("filter dir", async () => {
  const workspace = await ws.getWorkspace("__tests__/workspace/apps/app1", true)
  expect(workspace).toBeDefined()
  if (workspace) {
    filter(workspace, "apps/*")
    const dirs = workspace.packages.map(p =>
      path.relative("__tests__/workspace", p.root)
    )
    dirs.sort()
    expect(dirs).toStrictEqual(["apps/app1", "apps/app2"])
  }
})

test("filter pkg", async () => {
  const workspace = await ws.getWorkspace("__tests__/workspace/apps/app1", true)
  expect(workspace).toBeDefined()
  if (workspace) {
    filter(workspace, "@scoped/*")
    const dirs = workspace.packages.map(p =>
      path.relative("__tests__/workspace", p.root)
    )
    dirs.sort()
    expect(dirs).toStrictEqual(["libs/lib3"])
  }
})
