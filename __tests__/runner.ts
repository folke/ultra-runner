import { Runner } from "../src/runner"
import sinon from "sinon"
import chai from "chai"
import sinonChai from "sinon-chai"
import { Spinner } from "../src/spinner"

chai.use(sinonChai)
chai.should()

let runnerSpawn = sinon.stub(Runner.prototype, "spawn").resolves()
const runnerWrite = sinon.stub(process.stdout, "write")
const runnerExit = sinon.stub(process, "exit")
const runnerLog = sinon.stub(console, "log")
const runnerLogError = sinon.stub(console, "error")

beforeEach(() => {
  sinon.resetHistory()
  runnerSpawn.restore()
  runnerSpawn = sinon.stub(Runner.prototype, "spawn").resolves()
})

afterAll(() => {
  sinon.restore()
})

test("--fancy", async () => {
  const runner = new Runner({}, { fancy: true })
  await runner.run("echo foobar")
  runnerWrite.should.be.calledWithMatch("✔")
  runnerWrite.should.be.calledWithMatch("foobar")
  runnerLog.should.be.calledOnce
})

test("error", async () => {
  runnerSpawn.restore()
  runnerSpawn = sinon.stub(Runner.prototype, "spawn").rejects()
  const runner = new Runner({}, { fancy: true })
  await runner.run("fail")
  runnerExit.should.be.calledWith(1)
})

describe("real spawn, danger!", () => {
  beforeEach(() => {
    runnerSpawn.restore()
  })
  test("error", async () => {
    const runner = new Runner({}, { fancy: false })
    await runner.run("false")
    runnerExit.should.be.calledWith(1)
  })

  test("unknown command", async () => {
    const runner = new Runner({}, { fancy: false })
    await runner.run("foobar")
    runnerExit.should.be.calledWith(1)
  })

  test("warning", async () => {
    const runner = new Runner({}, { fancy: true })
    await runner.run("echo warning")
    runnerWrite.should.be.calledWithMatch("⚠")
  })

  test("--no-fancy", async () => {
    const runner = new Runner({}, { fancy: false })
    await runner.run("echo foobar")
    runnerLog.should.be.calledWithMatch("foobar")
  })
})

test("--no-fancy", async () => {
  const runner = new Runner({}, { fancy: false })
  await runner.run("echo foobar")
  runnerLog.should.be.calledWithMatch("success")
  runnerLog.should.be.calledWithMatch("foobar")
})

describe("spawn", () => {
  const runner = new Runner(
    { scripts: { test: "jest" } },
    { silent: true, raw: true }
  )

  test("should ", async () => {
    await runner.run("sleep 10 && yarn test")
    runnerSpawn.should.be.calledTwice
    runnerSpawn.getCall(0).should.be.calledWith("sleep", ["10"])
    runnerSpawn.getCall(1).should.be.calledWith("./node_modules/.bin/jest", [])
  })

  test("should 2", async () => {
    await runner.run("sleep 10 && yarn test")
    runnerSpawn.should.be.calledTwice
    runnerSpawn.getCall(0).should.be.calledWith("sleep", ["10"])
    runnerSpawn.getCall(1).should.be.calledWith("./node_modules/.bin/jest", [])
  })
})
