import { setCliArgs } from "./helpers/mockCli";
import { setEnv } from "./helpers/mockEnv";
import { mockExit } from "./helpers/mockExit";
import { mockFetch } from "./helpers/mockFetch";

describe("Movie CLI", () => {
  beforeEach(() => {
    jest.resetModules();

    setEnv({
      ACCESSS_TOKEN: "test-token",
    });
  });

  test("fails if --type flag is missing", async() => {
    const exitSpy = mockExit();
    const consoleError = jest.spyOn(console, "error").mockImplementation();
    
    setCliArgs([]); // set args
    const { runCLI } = await import("../index.ts"); // import AFTER args

    expect(() => {
      runCLI()
    }).toThrow("process.exit called");

    expect(consoleError).toHaveBeenCalledWith("Please provide a --type flag");
    expect(exitSpy).toHaveBeenCalled();
  });

  test("fails if category is missing", async () => {
    const exitSpy = mockExit();
    const consoleWarn = jest.spyOn(console, "warn").mockImplementation();

    setCliArgs(["--type"]); // set args
    const { runCLI } = await import("../index.ts"); // import AFTER args

    expect(() => {
      runCLI()
    }).toThrow("process.exit called");

    expect(consoleWarn).toHaveBeenCalledWith("Choose a category of movie!");
    expect(exitSpy).toHaveBeenCalled()
  });

  test("fails if invalid category provided", async () => {
    const exitSpy = mockExit();
    const consoleWarn = jest.spyOn(console, "warn").mockImplementation();

    setCliArgs(["--type", "invalid"]);
    const { runCLI } = await import("../index.ts"); // import AFTER args

    expect(() => {
      runCLI()
    }).toThrow("process.exit called");

    expect(consoleWarn).toHaveBeenCalledWith("Please give the appropriate category!");
    expect(exitSpy).toHaveBeenCalled()
  });

  test("fetches movie data for valid category", async () => {
    const consoleLog = jest.spyOn(console, "log").mockImplementation();

    setCliArgs(["--type", "playing"]);  // 1️⃣ set args
    mockFetch({ results: ["movie1"] }); // 2️⃣ mock fetch
    const { runCLI } = await import("../index.ts"); // 3️⃣ import AFTER mocks and args
    await runCLI(); // 4️⃣ run CLI


    expect(fetch).toHaveBeenCalled();
    expect(consoleLog).toHaveBeenCalledWith({ results: ["movie1"] });
  });

});


