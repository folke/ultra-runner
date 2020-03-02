import { Runner } from "../src/runner"
import sinon from "sinon"
import chai from "chai"
import sinonChai from "sinon-chai"
import chalk from "chalk"

chai.use(sinonChai)
chai.should()

const stubs = {
  write: sinon.stub(process.stdout, "write"),
  exit: sinon.stub(process, "exit"),
  log: sinon.stub(console, "log"),
  logError: sinon.stub(console, "error"),
}
const chalkLevel = chalk.level
chalk.level = 0

beforeEach(() => {
  sinon.resetHistory()
})

afterAll(() => {
  sinon.restore()
  chalk.level = chalkLevel
})

test("failed command", async () => {
  const runner = new Runner({ fancy: true })
  const spawn = sinon.stub(runner, "spawn").rejects()
  await runner.run("test", { scripts: { test: "fail" } })
  spawn.should.be.calledWith("fail", [])
  stubs.exit.should.be.calledWith(1)
})

test("formatDuration", () => {
  const runner = new Runner({})
  chai.expect(runner.formatDuration(2)).to.be.equal("2.000s")
  chai.expect(runner.formatDuration(0.1)).to.be.equal("100ms")
})

test("error", async () => {
  const runner = new Runner({ fancy: true })
  await runner.run("test", { scripts: { test: "false", pretest: "false" } })
  stubs.exit.should.be.calledWith(1)
})

test("string error", async () => {
  const runner = new Runner()
  sinon.stub(runner, "spawn").throws({ foo: "bar" })
  await runner.run("test", {})
  stubs.exit.should.be.calledWith(1)
})

test("error --silent", async () => {
  const runner = new Runner({ fancy: false, silent: true })
  await runner.run("false", {})
  stubs.exit.should.be.calledWith(1)
})

test("unknown command", async () => {
  const runner = new Runner({ fancy: false })
  await runner.run("foobar", {})
  stubs.exit.should.be.calledWith(1)
})

test("warning", async () => {
  const runner = new Runner({ fancy: true })
  await runner.run("echo warning", {})
  stubs.write.should.be.calledWithMatch("⚠")
})

test("--no-fancy", async () => {
  const runner = new Runner({ fancy: false })
  await runner.run("echo foobar", {})
  stubs.log.should.be.calledWithMatch("foobar")
})
