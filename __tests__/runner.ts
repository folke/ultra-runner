/* eslint-disable @typescript-eslint/unbound-method */
import { Runner } from "../src/runner"

test("should ", async () => {
  const runner = new Runner(
    { scripts: { test: "jest" } },
    { silent: true, flat: true }
  )
  const spawns: [string, string[]][] = []
  jest
    .spyOn(runner, "spawn")
    .mockImplementation((cmd: string, args: string[]) => {
      spawns.push([cmd, args])
      return new Promise(resolve => resolve())
    })
  await runner.run("sleep 10 && yarn test")

  expect(spawns).toStrictEqual([
    ["sleep", ["10"]],
    ["./node_modules/.bin/jest", []],
  ])
})
