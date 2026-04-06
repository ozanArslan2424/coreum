import { describe, expect, it } from "bun:test";
import { getVariables } from "../src/getVariables";

describe("getVariables", () => {
	it("parses -m flag", () => {
		const result = getVariables(["-m", "./src/main.ts"]);
		expect(result.mainPath).toEndWith("src/main.ts");
	});

	it("resolves mainPath to absolute", () => {
		const result = getVariables(["-m", "./src/main.ts"]);
		expect(result.mainPath).toStartWith("/");
	});

	it("defaults packagePath to @ozanarslan/corpus", () => {
		const result = getVariables(["-m", "./src/main.ts"]);
		expect(result.packagePath).toBe("@ozanarslan/corpus");
	});

	it("accepts custom package path", () => {
		const result = getVariables([
			"-m",
			"./src/main.ts",
			"-p",
			"./local/corpus",
		]);
		expect(result.packagePath).toBe("./local/corpus");
	});

	it("sets tempPath by replacing .ts with .gen.ts", () => {
		const result = getVariables(["-m", "./src/main.ts"]);
		expect(result.tempPath).toEndWith("src/main.gen.ts");
	});

	it("parses silent flag", () => {
		const result = getVariables(["-m", "./src/main.ts", "-s"]);
		expect(result.silent).toBe(true);
	});

	it("silent defaults to undefined", () => {
		const result = getVariables(["-m", "./src/main.ts"]);
		expect(result.silent).toBeUndefined();
	});

	it("parses output override", () => {
		const result = getVariables(["-m", "./src/main.ts", "-o", "./out/gen.ts"]);
		expect(result.cliOverrides.output).toBe("./out/gen.ts");
	});

	it("parses generateClient flag", () => {
		const result = getVariables(["-m", "./src/main.ts", "--generateClient"]);
		expect(result.cliOverrides.generateClient).toBe(true);
	});

	it("excludes undefined overrides", () => {
		const result = getVariables(["-m", "./src/main.ts"]);
		expect(Object.keys(result.cliOverrides)).toHaveLength(0);
	});

	it("exits if -m is missing", () => {
		expect(() => getVariables([])).toThrow();
	});
});
