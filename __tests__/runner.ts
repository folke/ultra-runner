import { Runner } from "../src/runner"
import sinon from "sinon"
import chai from "chai"
import sinonChai from "sinon-chai"
import chalk from "chalk"
import { PackageScripts } from "../src/parser"
import * as path from "path"

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
})

afterAll(() => {
  sinon.restore()
  chalk.level = chalkLevel
})

const advancedPackage: PackageScripts = {
  scripts: {
    prebuild: "yarn clean && yarn lint && yarn test",
    "build:rollup": "npx rollup -c",
    build: "yarn build:rollup",
    clean: "npx rimraf lib",
    test: "npx jest",
    lint: "yarn lint:ts && yarn lint:eslint && yarn lint:docs",
    "lint:eslint": "npx eslint src/*.ts",
    "lint:docs": "npx markdownlint README.md",
    "lint:ts": "npx tsc --noEmit",
  },
}

test("constructor", () => {
  chai.expect(new Runner({}).options).to.be.empty
  chai.expect(new Runner({}, { parallel: true }).options.concurrent).to.be.true
})

test("advanced build --dry-run", async () => {
  const runner = new Runner(advancedPackage, { dryRun: true })
  await runner.run("build")
  chai.expect(stubs.spawn).not.to.be.called
})

test("advanced build --no-fancy", async () => {
  const runner = new Runner(advancedPackage)
  await runner.run("build")

  stubs.log.should.be.calledWith("❯ lint")
  stubs.log.should.be.calledWith("❯ prebuild")
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

test("advanced build --fancy", async () => {
  const runner = new Runner(advancedPackage, { fancy: true })
  await runner.run("build")

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
  const runner = new Runner(advancedPackage, { raw: true })
  await runner.run("build")

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
  const runner = new Runner(
    { scripts: { test: "jest" }, ultra: { concurrent: ["test"] } },
    {}
  )
  await runner.run("test")
  stubs.spawn.should.be.calledOnce
  stubs.spawn
    .getCall(0)
    .should.be.calledWith(
      path.resolve(process.cwd(), "./node_modules/.bin/jest"),
      []
    )
})
