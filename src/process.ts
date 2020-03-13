type ExitListener = (signal: NodeJS.Signals | "exit") => void

export function onProcessExit(listener: ExitListener, forceExit = true) {
  ;(["SIGTERM", "SIGINT"] as const).forEach(event =>
    process.once(event, (signal: NodeJS.Signals) => {
      listener(signal)
      if (forceExit) process.exit(1)
    })
  )
  process.once("exit", () => listener("exit"))
}
