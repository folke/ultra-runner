import { CommandParser } from "../src/parser"

test("should", () => {
  const parser = new CommandParser({ name: "test", scripts: { test: "foo" } })
  const cmd = parser.parse("sleep 10")
  expect(cmd.debug()).toStrictEqual("system:sleep 10")
})

test("no scripts", () => {
  const parser = new CommandParser({ name: "test" })
  expect(parser.getScript("foo")).toBeUndefined()
  const cmd = parser.parse("sleep 10")
  expect(cmd.children).toHaveLength(1)
  expect(cmd.children[0].args).toStrictEqual(["sleep", "10"])
})

test("npm run with args", () => {
  const parser = new CommandParser({
    name: "test",
    scripts: {
      lint: "eslint",
      fix: "npm run lint -- --fix",
    },
  })
  const cmd = parser.parse("fix")
  expect(cmd.debug()).toStrictEqual({
    "script:fix": { "script:lint": "bin:eslint --fix" },
  })
})

test("pre", () => {
  const parser = new CommandParser({
    name: "test",
    scripts: { pretest: "bar", test: "foo" },
  })
  const cmd = parser.parse("test")
  expect(cmd.debug()).toStrictEqual({
    "script:test": [{ "script:pretest": "system:bar" }, "system:foo"],
  })
})

test("post", () => {
  const parser = new CommandParser({
    name: "test",
    scripts: { posttest: "bar", test: "foo" },
  })
  const cmd = parser.parse("test")
  expect(cmd.debug()).toStrictEqual({
    "script:test": ["system:foo", { "script:posttest": "system:bar" }],
  })
})

test("bin", () => {
  const parser = new CommandParser({ name: "test", scripts: {} })
  const cmd = parser.parse("jest")
  expect(cmd.children).toHaveLength(1)
  expect(cmd.debug()).toStrictEqual("bin:jest")
})

test("yarn bin", () => {
  const parser = new CommandParser({ name: "test", scripts: {} })
  const cmd = parser.parse("yarn jest")
  expect(cmd.children).toHaveLength(1)
  expect(cmd.debug()).toStrictEqual("bin:jest")
})

test("yarn script", () => {
  const parser = new CommandParser({
    name: "test",
    scripts: { foo: "yarn jest" },
  })
  const cmd = parser.parse("foo")
  expect(cmd.debug()).toStrictEqual({
    "script:foo": "bin:jest",
  })
})

test("npx bin", () => {
  const parser = new CommandParser({ name: "test", scripts: {} })
  const cmd = parser.parse("npx jest")
  expect(cmd.debug()).toStrictEqual("bin:jest")
})

test("AA=123 test npx bin", () => {
  const parser = new CommandParser({ name: "test", scripts: {} })
  const cmd = parser.parse("AA=123 npx jest")
  expect(cmd.children[0].env).toStrictEqual({ AA: "123" })
  expect(cmd.debug()).toStrictEqual("bin:jest")
})

test("AA=123 foobar", () => {
  const parser = new CommandParser({ name: "test", scripts: {} })
  const cmd = parser.parse("AA=123 foobar")
  expect(cmd.children[0].env).toStrictEqual({ AA: "123" })
  expect(cmd.debug()).toStrictEqual("system:foobar")
})

test("op", () => {
  const parser = new CommandParser({ name: "test", scripts: {} })
  const cmd = parser.parse("npx jest && npx foo")
  expect(cmd.debug()).toStrictEqual(["bin:jest", "op:&&", "bin:npx foo"])
})

test("op ;", () => {
  const parser = new CommandParser({ name: "test", scripts: {} })
  const cmd = parser.parse("test ; test")
  expect(cmd.debug()).toStrictEqual(["system:test", "op:;", "system:test"])
})

test("op &&", () => {
  const parser = new CommandParser({ name: "test", scripts: {} })
  const cmd = parser.parse("jest && test")
  expect(cmd.debug()).toStrictEqual(["bin:jest", "op:&&", "system:test"])
})

test("op ; 2", () => {
  const parser = new CommandParser({ name: "test", scripts: {} })
  const cmd = parser.parse("test; test")
  expect(cmd.debug()).toStrictEqual(["system:test", "op:;", "system:test"])
})

test("op only", () => {
  const parser = new CommandParser({ name: "test", scripts: {} })
  const cmd = parser.parse("&&")
  expect(cmd.debug()).toStrictEqual("op:&&")
})

test("non top level script", () => {
  const parser = new CommandParser({ name: "test", scripts: { test: "foo" } })
  const cmd = parser.parse("test")
  expect(cmd.debug()).toStrictEqual({ "script:test": "system:foo" })
})
