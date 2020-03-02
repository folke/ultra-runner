import { run } from "../src/cli"
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

test("--help", async () => {
  await run(["", "", "--help"])
  stubs.exit.should.be.calledWith(1)
})

test("false", async () => {
  await run(["", "", "false"])
  stubs.exit.should.be.calledWith(1)
})

test("no params", async () => {
  await run(["", ""])
  stubs.log.should.be.calledWithMatch("See --list for available scripts")
  stubs.exit.should.be.calledWith(1)
})
