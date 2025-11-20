export function mockFetch(response: any) {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () => Promise.resolve(response),
    })
  ) as any;
}
