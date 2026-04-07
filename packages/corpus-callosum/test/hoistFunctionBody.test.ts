import { describe, expect, it } from "bun:test";
import { hoistFunctionBody } from "../src/generateApiClient/hoistFunctionBody";

describe("hoistFunctionBody", () => {
	it("returns source unchanged if no function contains listen", () => {
		const source = `const x = 1;`;
		expect(hoistFunctionBody(source)).toBe(source);
	});

	it("returns source unchanged if listen is already at top level", () => {
		const source = `const server = new Server();\nawait server.listen(3000);`;
		expect(hoistFunctionBody(source)).toBe(source);
	});

	it("hoists function body to top level", () => {
		const source = `async function start() {\n  const server = new Server();\n  await server.listen(3000);\n}`;
		const result = hoistFunctionBody(source);
		expect(result).toContain("const server = new Server()");
		expect(result).toContain("server.listen(3000)");
		expect(result).not.toContain("async function start");
	});

	it("removes the call site of the hoisted function", () => {
		const source = `async function start() {\n  await server.listen(3000);\n}\nawait start();`;
		const result = hoistFunctionBody(source);
		expect(result).not.toContain("start()");
		expect(result).not.toContain("async function start");
	});

	it("removes void call site", () => {
		const source = `async function start() {\n  await server.listen(3000);\n}\nvoid start();`;
		const result = hoistFunctionBody(source);
		expect(result).not.toContain("start()");
	});

	it("only hoists the outermost function containing listen", () => {
		const source = `
async function outer() {
  async function inner() {
    await server.listen(3000);
  }
  await inner();
}
await outer();`;
		const result = hoistFunctionBody(source);
		expect(result).not.toContain("async function outer");
		expect(result).toContain("async function inner");
	});

	it("preserves imports outside the function", () => {
		const source = `import { Server } from "@ozanarslan/corpus";\nasync function start() {\n  await server.listen(3000);\n}`;
		const result = hoistFunctionBody(source);
		expect(result).toContain(`import { Server } from "@ozanarslan/corpus"`);
	});

	it("preserves statements after the function", () => {
		const source = `async function start() {\n  await server.listen(3000);\n}\nconst x = 1;`;
		const result = hoistFunctionBody(source);
		expect(result).toContain("const x = 1");
	});
});
