/* istanbul ignore file */
import chalk from "chalk"

const isSupported =
  process.platform !== "win32" ||
  process.env.CI ||
  process.env.TERM === "xterm-256color"

const main = {
  info: chalk.blue("ℹ"),
  success: chalk.green("✔"),
  warning: chalk.yellow("⚠"),
  error: chalk.red("✖"),
  bullet: "●",
}

const fallbacks = {
  info: chalk.blue("i"),
  success: chalk.green("√"),
  warning: chalk.yellow("‼"),
  error: chalk.red("×"),
  bullet: "*",
}

function get(name: string) {
  const symbols = isSupported ? main : fallbacks
  return (symbols as { [key: string]: string })[name]
}

export default { ...(isSupported ? main : fallbacks), get }
