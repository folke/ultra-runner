import { defaults, parse } from "../src/options"

test("should", () => {
  expect(defaults).toBeDefined()
})

test("should parse array options correctly", () => {
  const options = parse(["", "", "--filter", "a", "--filter", "b"])
  expect(options.filter).toEqual(["a", "b"])
})
