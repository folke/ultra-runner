import typescript from "@rollup/plugin-typescript"
import pkg from "./package.json"
import resolve from "@rollup/plugin-node-resolve"
import { terser } from "rollup-plugin-terser"
import json from "@rollup/plugin-json"
import commonjs from "@rollup/plugin-commonjs"
// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
import progress from "rollup-plugin-progress"
// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
import sizes from "rollup-plugin-sizes"
// eslint-disable-next-line import/default
import builtins from "builtin-modules"

export default {
  input: "src/cli.ts", // our source file
  output: [
    {
      file: pkg.main,
      format: "cjs",
    },
  ],
  external: [...Object.keys(pkg.dependencies || {}), ...builtins],
  plugins: [
    progress(),
    json(),
    resolve({
      preferBuiltins: true,
    }),
    commonjs(),
    typescript({
      tsconfig: "./tsconfig.build.json",
      module: "esnext",
      typescript: require("typescript"),
    }),
    terser(),
    sizes(),
  ],
}
