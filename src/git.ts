import { exec } from "child_process"
import fs from "fs"
import path from "path"
import { findUp } from "./workspace"

const regex = /^([A-Z?]) (\d{6}) ([a-z0-9]{40}) (\d+)\t(.*)$/u

type GitFiles = Record<string, string>

function parseFiles(data: string, root: string): GitFiles {
  const ret: GitFiles = {}
  data.split("\n").forEach(line => {
    const m = regex.exec(line)
    if (m) {
      const file = m[5]
      let hash = m[3]
      if (m[1] == "C")
        hash += `.${fs.lstatSync(path.resolve(root, file)).mtimeMs}`
      ret[file] = hash
    } else {
      const file = line.slice(2)
      if (fs.existsSync(path.resolve(root, file)))
        ret[file] = `${fs.lstatSync(path.resolve(root, file)).mtimeMs}`
    }
  })
  return ret
}

export async function getGitFiles(root: string): Promise<GitFiles> {
  if (!fs.existsSync(path.resolve(root, ".git")))
    throw new Error("Directory is not a top git root")
  return new Promise((resolve, reject) => {
    exec(
      "git ls-files --full-name -s -d -c -m -o --directory -t",
      { cwd: root },
      (error, stdout) => {
        if (error) return reject(error)
        return resolve(parseFiles(stdout, root))
      }
    )
  })
}

class FilesCache {
  cache = new Map<string, Record<string, string>>()

  clear() {
    this.cache.clear()
  }

  async getFiles(directory: string, exclude: string[] = []): Promise<GitFiles> {
    const root = findUp(".git", directory)
    if (!root) throw new Error(`Not a Git repository ${directory}`)

    if (!this.cache.has(root)) {
      this.cache.set(root, await getGitFiles(root))
    }
    const files = this.cache.get(root)
    if (files) {
      return Object.fromEntries(
        Object.entries(files)
          .filter(([file]) => path.resolve(root, file).startsWith(directory))
          .map(([file, hash]) => [
            path.relative(directory, path.resolve(root, file)),
            hash,
          ])
          .filter(([file]) => file.length && !exclude.includes(file))
      )
    } else throw new Error(`Could not find Git files for ${root}`)
  }
}

export const cache = new FilesCache()
