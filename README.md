# :runner: :mountain: Ultra Runner

**Smart** and **beautiful** script runner that hijacks any `npm run`, `yarn` and `npx` calls for **ultra** fast execution.

![Devmoji Ultra Build](assets/demo.svg?sanitize=true)

## :question: What

|                        | `npm run`          | `npx`              | `yarn`             | `yarn exec`        | `ultra`            |
| ---------------------- | ------------------ | ------------------ | ------------------ | ------------------ | ------------------ |
| `package.json` scripts | :white_check_mark: | :x:                | :white_check_mark: | :x:                | :white_check_mark: |
| `./node_modules/.bin/` | :x:                | :white_check_mark: | :white_check_mark: | :white_check_mark: | :white_check_mark: |
| system binaries        | :x:                | :white_check_mark: | :x:                | :white_check_mark: | :white_check_mark: |

## :package: Installation

Install with `npm` or `yarn`

> globally

```sh
npm install -g ultra-runner
yarn global install ultra-runner
```

> locally inside your project. use with `npx ultra`

```shell
npm install --dev ultra-runner
yarn add --dev ultra-runner
```

See [optional configuration](##gear-optional-configuration) for information on how to setup concurrent script execution.

## :rocket: Usage

```console
$ ultra --help
Usage: ultra [options]

Options:
  -c|--concurrent  Run the given commands concurrently
  -p|--parallel    alias for --concurrently
  --flat           disable fancy output, spinners and seperate command output. Default when not a TTY. Useful for logging (default: false)
  --raw            Output only raw command output
  -s|--silent      skip script output. ultra console logs will still be shown
  --color          colorize output (default: true)
  --no-color       don't colorize output
  -d|--dry-run     output what would be executed
  -v|--version     output the version number
  -h, --help       output usage information
```

## :gear: Optional Configuration

To allow parallel execution of your scripts, you can specify scripts that should run concurrently,
in your `package.json`.

```json
{
  "scripts": {
    "lint:eslint": "npx eslint bin/*.js src/*.ts __tests__/*.ts --cache",
    "lint:docs": "npx markdownlint *.md",
    "lint:ts": "npx tsc -p tsconfig.build.json --noEmit",
    "lint": "yarn lint:eslint && yarn lint:docs && yarn lint:ts",
    "prebuild": "yarn lint && yarn jest",
    "build": "..."
  },
  "ultra": {
    "concurrent": ["lint"]
  }
}
```

- `yarn build` will run the `lint` and `jest` commands sequentially
- `ultra build` will run all `lint` commands concurrently and then execute `jest`. (note that we can also add `prebuild` to `concurrent`, since tests don't depend on linting. this way all commnands would run concurrently)

Example output for `ultra lint`
![Ultra Lint](assets/ultra-lint.png)

## :zap: Benchmark

|                          | `npm run`          | `npx`              | `yarn`             | `yarn exec`        | `ultra`            |
| ------------------------ | ------------------ | ------------------ | ------------------ | ------------------ | ------------------ |
| `package.json` scripts   | :white_check_mark: | :x:                | :white_check_mark: | :x:                | :white_check_mark: |
| `./node_modules/.bin/`   | :x:                | :white_check_mark: | :white_check_mark: | :white_check_mark: | :white_check_mark: |
| system binaries          | :x:                | :white_check_mark: | :x:                | :white_check_mark: | :white_check_mark: |
| execution overhead _(1)_ | 250ms              | 60ms               | 220ms              | 200ms              | 80ms               |

<!-- markdownlint-disable MD033 -->

> <sup>**1.** each program was run 10x with the command `true` or `{scripts:{"true":"true}}` to calculate the execution overhead</sup>

|                                                             | `yarn` | `ultra` not concurrent | `ultra` concurrent |
| ----------------------------------------------------------- | ------ | ---------------------- | ------------------ |
| build [Ultra-Runner](https://github.com/folke/ultra-runner) | 8.9s   | 7.2s                   | 5.1s               |
| build [Devmoji](https://github.com/folke/devmoji)           | 16s    | 13s                    | 8s                 |

## Output Modes

- `default`
- `--flat`
- `--raw`

## TODO

- [ ] add signale
