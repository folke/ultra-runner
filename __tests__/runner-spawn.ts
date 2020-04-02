import chai from "chai"
import chalk from "chalk"
import sinon from "sinon"
import sinonChai from "sinon-chai"
import { Runner } from "../src/runner"

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
  // if (fs.existsSync(HASH_FILE)) fs.unlinkSync(HASH_FILE)
})

afterAll(() => {
  sinon.restore()
  chalk.level = chalkLevel
})

test("failed command", async () => {
  const runner = new Runner({ pretty: true })
  const spawn = sinon.stub(runner, "spawn").rejects()
  await expect(
    runner.run("test", { name: "test", scripts: { test: "fail" } })
  ).rejects.toThrow()
  // await
  spawn.should.be.calledWith("fail", [])
})

test("formatDuration", () => {
  const runner = new Runner({})
  chai.expect(runner.formatDuration(2)).to.be.equal("2.000s")
  chai.expect(runner.formatDuration(0.1)).to.be.equal("100ms")
})

test("error", async () => {
  const runner = new Runner({ pretty: true })
  await expect(
    runner.run("test", {
      name: "test",
      scripts: { test: "false", pretest: "false" },
    })
  ).rejects.toThrow()
})

test("string error", async () => {
  const runner = new Runner()
  sinon.stub(runner, "spawn").throws(new Error("foobar"))
  await expect(runner.run("test", { name: "test" })).rejects.toThrow()
})

test("error --silent", async () => {
  const runner = new Runner({ pretty: false, silent: true })
  await expect(runner.run("false", { name: "test" })).rejects.toThrow()
})

test("unknown command", async () => {
  const runner = new Runner({ pretty: false })
  await expect(runner.run("foobar", { name: "test" })).rejects.toThrow()
})

test("warning", async () => {
  const runner = new Runner({ pretty: true })
  await runner.run("echo warning", { name: "test" })
  stubs.write.should.be.calledWithMatch("⚠")
})

test("--no-pretty", async () => {
  const runner = new Runner({ pretty: false })
  await runner.run("echo foobar", { name: "test" })
  stubs.log.should.be.calledWithMatch("foobar")
})
