import { CommandParser } from "../src/parser"

test("should ", () => {
  const parser = new CommandParser({ scripts: { test: "foo" } })
  const cmd = parser.parse("sleep 10")
  expect(cmd.debug()).toStrictEqual("system:sleep 10")
})

test("no scripts", () => {
  const parser = new CommandParser({})
  expect(parser.getScript("foo")).toBeUndefined()
  const cmd = parser.parse("sleep 10")
  expect(cmd.children).toHaveLength(1)
  expect(cmd.children[0].args).toStrictEqual(["sleep", "10"])
})

test("test pre ", () => {
  const parser = new CommandParser({ scripts: { pretest: "bar", test: "foo" } })
  const cmd = parser.parse("test")
  expect(cmd.debug()).toStrictEqual({
    "script:test": [{ "script:pretest": "system:bar" }, "system:foo"],
  })
})

test("test post ", () => {
  const parser = new CommandParser({
    scripts: { posttest: "bar", test: "foo" },
  })
  const cmd = parser.parse("test")
  expect(cmd.debug()).toStrictEqual({
    "script:test": ["system:foo", { "script:posttest": "system:bar" }],
  })
})

test("test bin ", () => {
  const parser = new CommandParser({ scripts: {} })
  const cmd = parser.parse("jest")
  expect(cmd.children).toHaveLength(1)
  expect(cmd.debug()).toStrictEqual("bin:jest")
})

test("yarn bin", () => {
  const parser = new CommandParser({ scripts: {} })
  const cmd = parser.parse("yarn jest")
  expect(cmd.children).toHaveLength(1)
  expect(cmd.debug()).toStrictEqual("bin:jest")
})

test("yarn script", () => {
  const parser = new CommandParser({ scripts: { foo: "yarn jest" } })
  const cmd = parser.parse("foo")
  expect(cmd.debug()).toStrictEqual({
    "script:foo": "bin:jest",
  })
})

test("test npx bin ", () => {
  const parser = new CommandParser({ scripts: {} })
  const cmd = parser.parse("npx jest")
  expect(cmd.debug()).toStrictEqual("bin:jest")
})

test("test op", () => {
  const parser = new CommandParser({ scripts: {} })
  const cmd = parser.parse("npx jest && npx foo")
  expect(cmd.debug()).toStrictEqual(["bin:jest", "op:&&", "system:npx foo"])
})

test("test op ;", () => {
  const parser = new CommandParser({ scripts: {} })
  const cmd = parser.parse("test ; test")
  expect(cmd.debug()).toStrictEqual(["system:test", "op:;", "system:test"])
})

test("test op &&", () => {
  const parser = new CommandParser({ scripts: {} })
  const cmd = parser.parse("jest && test")
  expect(cmd.debug()).toStrictEqual(["bin:jest", "op:&&", "system:test"])
})

test("test op ; 2", () => {
  const parser = new CommandParser({ scripts: {} })
  const cmd = parser.parse("test; test")
  expect(cmd.debug()).toStrictEqual(["system:test", "op:;", "system:test"])
})

test("test op only", () => {
  const parser = new CommandParser({ scripts: {} })
  const cmd = parser.parse("&&")
  expect(cmd.debug()).toStrictEqual("op:&&")
})

test("test non top level script", () => {
  const parser = new CommandParser({ scripts: { test: "foo" } })
  const cmd = parser.parse("test")
  expect(cmd.debug()).toStrictEqual({ "script:test": "system:foo" })
})
