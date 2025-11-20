export function setEnv(env: Record<string, string>) {
  for (const key in env) {
    process.env[key] = env[key];
  }
}
