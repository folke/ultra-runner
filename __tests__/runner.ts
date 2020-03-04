import chai from "chai"
import chalk from "chalk"
import * as path from "path"
import sinon from "sinon"
import sinonChai from "sinon-chai"
import { defaults } from "../src/options"
import { PackageJson } from "../src/package"
import { Runner } from "../src/runner"

chai.use(sinonChai)
chai.should()

const stubs = {
  spawn: sinon.stub(Runner.prototype, "spawn").resolves(),
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

const advancedPackage: PackageJson = {
  name: "advanced-package",
  scripts: {
    prebuildit: "yarn clean && yarn lint && yarn test",
    "build:rollup": "npx rollup -c",
    buildit: "yarn build:rollup",
    clean: "npx rimraf lib",
    test: "npx jest",
    lint: "yarn lint:ts && yarn lint:eslint && yarn lint:docs",
    "lint:eslint": "npx eslint src/*.ts",
    "lint:docs": "npx markdownlint README.md",
    "lint:ts": "npx tsc --noEmit",
  },
}

test("constructor", () => {
  chai.expect(new Runner({}).options).to.be.deep.equal(defaults)
})

test("advanced build --dry-run", async () => {
  const runner = new Runner({ dryRun: true })
  await runner.run("buildit", advancedPackage)
  chai.expect(stubs.spawn).not.to.be.called
})

test("advanced build --no-pretty", async () => {
  const runner = new Runner()
  await runner.run("buildit", advancedPackage)

  stubs.log.should.be.calledWith("❯ lint")
  stubs.log.should.be.calledWith("❯ prebuildit")
  stubs.log.should.be.calledWith("❯ clean")

  stubs.spawn.should.be.callCount(6)
  stubs.spawn
    .getCall(0)
    .should.be.calledWith(
      path.resolve(process.cwd(), "./node_modules/.bin/rimraf"),
      ["lib"]
    )
  stubs.spawn
    .getCall(1)
    .should.be.calledWith(
      path.resolve(process.cwd(), "./node_modules/.bin/tsc"),
      ["--noEmit"]
    )
  stubs.spawn
    .getCall(2)
    .should.be.calledWith(
      path.resolve(process.cwd(), "./node_modules/.bin/eslint"),
      ["src/*.ts"]
    )
  stubs.spawn
    .getCall(3)
    .should.be.calledWith(
      path.resolve(process.cwd(), "./node_modules/.bin/markdownlint"),
      ["README.md"]
    )
  stubs.spawn
    .getCall(4)
    .should.be.calledWith(
      path.resolve(process.cwd(), "./node_modules/.bin/jest"),
      []
    )
  stubs.spawn
    .getCall(5)
    .should.be.calledWith(
      path.resolve(process.cwd(), "./node_modules/.bin/rollup"),
      ["-c"]
    )
})

test("advanced build --pretty", async () => {
  const runner = new Runner({ pretty: true })
  await runner.run("buildit", advancedPackage)

  stubs.write.should.be.calledWithMatch("✔")

  stubs.spawn.should.be.callCount(6)
  stubs.spawn
    .getCall(0)
    .should.be.calledWith(
      path.resolve(process.cwd(), "./node_modules/.bin/rimraf"),
      ["lib"]
    )
  stubs.spawn
    .getCall(1)
    .should.be.calledWith(
      path.resolve(process.cwd(), "./node_modules/.bin/tsc"),
      ["--noEmit"]
    )
  stubs.spawn
    .getCall(2)
    .should.be.calledWith(
      path.resolve(process.cwd(), "./node_modules/.bin/eslint"),
      ["src/*.ts"]
    )
  stubs.spawn
    .getCall(3)
    .should.be.calledWith(
      path.resolve(process.cwd(), "./node_modules/.bin/markdownlint"),
      ["README.md"]
    )
  stubs.spawn
    .getCall(4)
    .should.be.calledWith(
      path.resolve(process.cwd(), "./node_modules/.bin/jest"),
      []
    )
  stubs.spawn
    .getCall(5)
    .should.be.calledWith(
      path.resolve(process.cwd(), "./node_modules/.bin/rollup"),
      ["-c"]
    )
})

test("advanced build --raw", async () => {
  const runner = new Runner({ raw: true })
  await runner.run("buildit", advancedPackage)

  stubs.spawn.should.be.callCount(6)
  stubs.spawn
    .getCall(0)
    .should.be.calledWith(
      path.resolve(process.cwd(), "./node_modules/.bin/rimraf"),
      ["lib"]
    )
  stubs.spawn
    .getCall(1)
    .should.be.calledWith(
      path.resolve(process.cwd(), "./node_modules/.bin/tsc"),
      ["--noEmit"]
    )
  stubs.spawn
    .getCall(2)
    .should.be.calledWith(
      path.resolve(process.cwd(), "./node_modules/.bin/eslint"),
      ["src/*.ts"]
    )
  stubs.spawn
    .getCall(3)
    .should.be.calledWith(
      path.resolve(process.cwd(), "./node_modules/.bin/markdownlint"),
      ["README.md"]
    )
  stubs.spawn
    .getCall(4)
    .should.be.calledWith(
      path.resolve(process.cwd(), "./node_modules/.bin/jest"),
      []
    )
  stubs.spawn
    .getCall(5)
    .should.be.calledWith(
      path.resolve(process.cwd(), "./node_modules/.bin/rollup"),
      ["-c"]
    )
})

test("concurrent ", async () => {
  const runner = new Runner({})
  await runner.run("test", {
    name: "test",
    scripts: { test: "jest" },
    ultra: { concurrent: ["test"] },
  })
  stubs.spawn.should.be.calledOnce
  stubs.spawn
    .getCall(0)
    .should.be.calledWith(
      path.resolve(process.cwd(), "./node_modules/.bin/jest"),
      []
    )
})
