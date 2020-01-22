import { CommandParser, CommandType } from "../src/parser"

test("should ", () => {
  const parser = new CommandParser({ scripts: { test: "foo" } })
  const cmd = parser.parse("sleep 10")
  expect(cmd.children).toHaveLength(1)
  expect(cmd.children[0].args).toStrictEqual(["sleep", "10"])
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
  expect(cmd.children).toHaveLength(1)
  expect(cmd.children[0].children).toHaveLength(2)
  expect(cmd.children[0].children[0].name).toBe("pretest")
  expect(cmd.children[0].children[1].name).toBe("foo")
})

test("test post ", () => {
  const parser = new CommandParser({
    scripts: { posttest: "bar", test: "foo" },
  })
  const cmd = parser.parse("test")
  expect(cmd.children).toHaveLength(1)
  expect(cmd.children[0].children).toHaveLength(2)
  expect(cmd.children[0].children[0].name).toBe("foo")
  expect(cmd.children[0].children[1].name).toBe("posttest")
})

test("test bin ", () => {
  const parser = new CommandParser({ scripts: {} })
  const cmd = parser.parse("jest")
  expect(cmd.children).toHaveLength(1)
  expect(cmd.children[0].name).toBe("jest")
  expect(cmd.children[0].type).toBe(CommandType.bin)
})

test("test npx bin ", () => {
  const parser = new CommandParser({ scripts: {} })
  const cmd = parser.parse("npx jest")
  expect(cmd.children).toHaveLength(1)
  expect(cmd.children[0].name).toBe("jest")
  expect(cmd.children[0].type).toBe(CommandType.bin)
})

test("test op", () => {
  const parser = new CommandParser({ scripts: {} })
  const cmd = parser.parse("npx jest && npx foo")
  expect(cmd.debug()).toStrictEqual(["bin:jest", "op:&&", "system:npx foo"])
  expect(cmd.children).toHaveLength(3)
  expect(cmd.children[1].name).toBe("&&")
  expect(cmd.children[1].type).toBe(CommandType.op)
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
  expect(cmd.children).toHaveLength(1)
  expect(cmd.children[0].name).toBe("&&")
  expect(cmd.children[0].type).toBe(CommandType.op)
})

test("test non top level script", () => {
  const parser = new CommandParser({ scripts: { test: "foo" } })
  const cmd = parser.parse("test")
  expect(cmd.children).toHaveLength(1)
  expect(cmd.children[0].children).toHaveLength(1)
  expect(cmd.children[0].children[0].name).toBe("foo")
  expect(cmd.children[0].children[0].type).toBe(CommandType.system)
})
