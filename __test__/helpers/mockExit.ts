export function mockExit() {
  return jest
    .spyOn(process, "exit")
    .mockImplementation((() => {
      throw new Error("process.exit called");
    }) as any);
}
