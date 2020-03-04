import { findPackages, findUp, getPackage } from "../src/package"
import path from "path"

test("findPackages without options ", async () => {
  const root = path.resolve("__tests__/workspace")
  const packages = (
    await findPackages(["**"], {
      cwd: root,
    })
  )
    .map(p => path.relative(root, p))
    .sort()
  expect(packages).toStrictEqual([
    "",
    "apps/app1",
    "apps/app2",
    "libs/lib1",
    "libs/lib2",
    "libs/lib3",
  ])
})

test("findUp", () => {
  const up = findUp("package.json", __dirname)
  expect(up).toBe(process.cwd())
})

test("getPackage", () => {
  const up = getPackage(".")
  expect(up).toBeDefined()
})
