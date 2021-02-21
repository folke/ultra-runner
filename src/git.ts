import { exec } from "child_process"
import fs from "fs"
import path from "path"
import { findUp } from "./package"
import { HASH_FILE } from "./options"

const regex = /^([A-Z?])\s+(\d{6})\s+([a-z0-9]{40})\s+(\d+)\s+(.*)$/u

type GitFiles = Record<string, string>

export class NoGitError extends Error {}

export function parseFiles(data: string, root: string): GitFiles {
  const ret: GitFiles = {}
  data.split("\n").forEach((line) => {
    const m = regex.exec(line)
    if (m) {
      const file = m[5]
      let hash = m[3]
      if (m[1] == "C") {
        const filePath = path.resolve(root, file)
        hash += fs.existsSync(filePath)
          ? `.${fs.lstatSync(filePath).mtimeMs}`
          : ".del"
      }
      ret[file] = hash
    } else {
      const file = line.slice(2)
      const filePath = path.resolve(root, file)
      if (fs.existsSync(filePath))
        ret[file] = `${fs.lstatSync(filePath).mtimeMs}`
    }
  })
  return ret
}

export async function getGitFiles(root: string): Promise<GitFiles> {
  return new Promise((resolve, reject) => {
    const ultraIgnoreExists = fs.existsSync(path.resolve(root, ".ultraignore"))
    const lsFiles = `git ls-files --full-name -s -d -c -m -o ${
      ultraIgnoreExists ? "-X .ultraignore" : ""
    } --directory -t`
    exec(
      lsFiles,
      { cwd: root, maxBuffer: 1024 * 1024 * 1024 },
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
    if (!root) throw new NoGitError(`Not a Git repository ${directory}`)

    if (!this.cache.has(root)) {
      this.cache.set(root, await getGitFiles(root))
    }
    const files = this.cache.get(root) || {}
    const ret: GitFiles = {}

    Object.entries(files)
      .filter(([file]) => {
        const filePath = path.resolve(root, file)
        return (
          filePath == directory || filePath.startsWith(directory + path.sep)
        )
      })
      .map(([file, hash]) => [
        path.relative(directory, path.resolve(root, file)),
        hash,
      ])
      .filter(
        ([file]) =>
          file.length && !exclude.includes(file) && !file.endsWith(HASH_FILE)
      )
      .forEach(([file, hash]) => (ret[file] = hash))
    return ret
  }
}

export const cache = new FilesCache()
