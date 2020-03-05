import { parseFiles, getGitFiles, cache } from "../src/git"
import path from "path"

const workspaceRoot = path.resolve(__dirname, "workspace")

function f(files: Record<string, unknown>) {
  if (!files) return files
  const ret: Record<string, unknown> = {}
  Object.entries(files).forEach(([k, v]) => (ret[k.replace(/\\/gu, "/")] = v))
  return ret
}

test("parseGitFiles", () => {
  const data = `C libs
C foo
C 100644 9201c50257439147d031322052f0f0961e06275c 0     lerna.json
C 100644 9201c50257439147d031322052f0f0961e06275c 0     deleted.json
H 100644 3991509708716f0a78b7f4d9ff469084213e18fb 0     libs/lib3/package.json
H 100644 afcd42dfe13cb03ac1cdf0f7843188bdb6cbdb66 0     package.json`
  const files = parseFiles(data, workspaceRoot)
  expect(files["lerna.json"]).toMatch(
    /9201c50257439147d031322052f0f0961e06275c\.\d+\.\d+/u
  )
  expect(files["libs"]).toBeDefined()
  files["libs"] = "foo"
  files["lerna.json"] = "foo"
  expect(files).toStrictEqual({
    libs: "foo",
    "lerna.json": "foo",
    "deleted.json": "9201c50257439147d031322052f0f0961e06275c.del",
    "libs/lib3/package.json": "3991509708716f0a78b7f4d9ff469084213e18fb",
    "package.json": "afcd42dfe13cb03ac1cdf0f7843188bdb6cbdb66",
  })
})

test("getGitFiles", async () => {
  const files = f(await getGitFiles(path.resolve(workspaceRoot, "apps")))
  expect(files["__tests__/workspace/apps/app1/package.json"]).toMatch(
    /^[a-z0-9]*$/u
  )
  expect(files["__tests__/workspace/apps/app2/package.json"]).toMatch(
    /^[a-z0-9]*$/u
  )
  expect(files[""]).toMatch(/^\d+\.\d+$/u)

  expect(Object.keys(files)).toHaveLength(3)
})

test("cache", async () => {
  const files = f(await cache.getFiles(path.resolve(workspaceRoot, "apps")))
  expect(files["app1/package.json"]).toMatch(/^[a-z0-9]*$/u)
  expect(files["app2/package.json"]).toMatch(/^[a-z0-9]*$/u)
  expect(Object.keys(files)).toHaveLength(2)
  expect(cache.cache.size).not.toBe(0)
  await cache.getFiles(path.resolve(workspaceRoot, "apps"))
  cache.clear()
  expect(cache.cache.size).toBe(0)
})

test("cache error", () => {
  return expect(cache.getFiles("/foo/bar/blablabla")).rejects.toThrow()
})
