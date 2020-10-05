import { Spawner } from "../src/spawn"
import sinon from "sinon"
import chai from "chai"
import sinonChai from "sinon-chai"

chai.use(sinonChai)

beforeEach(() => sinon.restore())

test("true", async () => {
  const spawner = new Spawner("true")
  await spawner.spawn()
  expect(spawner.output).toBe("")
})

test("echo foo", async () => {
  const spawner = new Spawner("echo", ["foo"])
  await spawner.spawn()
  expect(spawner.output.trim()).toBe("foo")
})

test("command does not exist", () => {
  const spawner = new Spawner("foofoobarbar")
  return expect(spawner.spawn()).rejects.toThrow()
})

test("exit code 0", async () => {
  const spawner = new Spawner("true")
  await spawner.spawn()
  expect(spawner.exitCode).toBe(0)
})

test("exit code 1", async () => {
  const spawner = new Spawner("false")
  await expect(spawner.spawn()).rejects.toThrow()
  expect(spawner.exitCode).toBe(1)
})

test("raw echo foo", async () => {
  const spawner = new Spawner("true", [])
  await spawner.spawn(true)
  expect(spawner.output).toBe("")
  expect(spawner.exitCode).toBe(0)
})

test("lines", async () => {
  const spawner = new Spawner("echo", ["-n", "foo\nbar"])
  spawner.onLine = sinon.fake()
  await spawner.spawn()
  chai.expect(spawner.onLine).to.be.calledTwice
})
