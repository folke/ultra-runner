# :runner: Ultra Runner

Smart and beautiful script runner that hijacks any `npm run`, `yarn` and `npx` calls for **ultra** fast execution.

## Why

|                        | `npm run`          | `npx`              | `yarn`             | `ultra`            |
| ---------------------- | ------------------ | ------------------ | ------------------ | ------------------ |
| `package.json` scripts | :white_check_mark: | :x:                | :white_check_mark: | :white_check_mark: |
| `./node_modules/.bin/` | :x:                | :white_check_mark: | :white_check_mark: | :white_check_mark: |
| system binaries        | :x:                | :white_check_mark: | :x:                | :white_check_mark: |
| execution overhead     | 250ms              | 60ms               | 220ms              | 80ms               |

# TODO

Modes

- raw|silent: stdio:inherit
-

* [ ] add signale
