export function setCliArgs(args: string[]) {
  process.argv = ["node", "cli", ...args];
}
