# :runner: :sparkles: Ultra Runner

**Smart** and **beautiful** script runner that hijacks any `npm run`, `yarn` and `npx` calls for **ultra** fast execution.

## Why

|                        | `npm run`          | `npx`              | `yarn`             | `yarn exec`        | `ultra`            |
| ---------------------- | ------------------ | ------------------ | ------------------ | ------------------ | ------------------ |
| `package.json` scripts | :white_check_mark: | :x:                | :white_check_mark: | :x:                | :white_check_mark: |
| `./node_modules/.bin/` | :x:                | :white_check_mark: | :white_check_mark: | :white_check_mark: | :white_check_mark: |
| system binaries        | :x:                | :white_check_mark: | :x:                | :white_check_mark: | :white_check_mark: |
| execution overhead \*  | 250ms              | 60ms               | 220ms              | 200ms              | 80ms               |

<!-- markdownlint-disable MD033 -->

> <sup>\* each program was run 10x with the command `true` or `{scripts:{"true":"true}}` to calculate the execution overhead</sup>

## TODO

- [ ] add signale
