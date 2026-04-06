import { describe, expect, it } from "bun:test";
import { replaceListenCall } from "../src/replaceListenCall";
import { writeFileSync, readFileSync, existsSync, unlinkSync } from "fs";
import { join } from "path";
import { tmpdir } from "os";

const tmp = (name: string) => join(tmpdir(), name);

function cleanup(...paths: string[]) {
	for (const p of paths) {
		if (existsSync(p)) unlinkSync(p);
	}
}

describe("replaceListenCall", () => {
	it("replaces top-level listen call", () => {
		const main = tmp("main.ts");
		const gen = tmp("main.gen.ts");
		writeFileSync(
			main,
			`const server = new Server();\nawait server.listen(3000);`,
		);
		replaceListenCall("Generator.mjs", main, "@ozanarslan/corpus", gen, {});
		const result = readFileSync(gen, "utf-8");
		expect(result).toContain("new Generator");
		expect(result).toContain("generator.generate()");
		expect(result).not.toContain("server.listen");
		cleanup(main, gen);
	});

	it("hoists function body and replaces listen", () => {
		const main = tmp("main2.ts");
		const gen = tmp("main2.gen.ts");
		writeFileSync(
			main,
			`async function start() {\n  const server = new Server();\n  await server.listen(3000);\n}\nawait start();`,
		);
		replaceListenCall("Generator.mjs", main, "@ozanarslan/corpus", gen, {});
		const result = readFileSync(gen, "utf-8");
		expect(result).toContain("new Generator");
		expect(result).not.toContain("async function start");
		cleanup(main, gen);
	});

	it("prepends registry and generator imports", () => {
		const main = tmp("main3.ts");
		const gen = tmp("main3.gen.ts");
		writeFileSync(main, `await server.listen(3000);`);
		replaceListenCall("Generator.mjs", main, "@ozanarslan/corpus", gen, {});
		const result = readFileSync(gen, "utf-8");
		expect(result).toContain(`import { $registry } from "@ozanarslan/corpus"`);
		expect(result).toContain(`import { Generator } from`);
		cleanup(main, gen);
	});

	it("passes cliOverrides to Generator", () => {
		const main = tmp("main4.ts");
		const gen = tmp("main4.gen.ts");
		writeFileSync(main, `await server.listen(3000);`);
		replaceListenCall("Generator.mjs", main, "@ozanarslan/corpus", gen, {
			output: "./out/gen.ts",
		});
		const result = readFileSync(gen, "utf-8");
		expect(result).toContain(`"output":"./out/gen.ts"`);
		cleanup(main, gen);
	});

	it("exits if no listen call found", () => {
		const main = tmp("main5.ts");
		const gen = tmp("main5.gen.ts");
		writeFileSync(main, `const x = 1;`);
		expect(() =>
			replaceListenCall("Generator.mjs", main, "@ozanarslan/corpus", gen, {}),
		).toThrow();
		cleanup(main, gen);
	});
});
