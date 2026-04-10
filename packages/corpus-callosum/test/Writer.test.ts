import { describe, it, expect } from "bun:test";
import { Writer } from "../src/Writer/Writer";
import { unlinkSync, readFileSync, writeFileSync } from "node:fs";

describe("Writer core", () => {
	it("write joins with newline by default", () => {
		const w = new Writer();
		w.append("a", "b");
		expect(w.read()).toBe("a\nb");
	});

	it("write joins with custom separator", () => {
		const w = new Writer();
		w.append("a", "b");
		expect(w.read("")).toBe("ab");
	});

	it("append adds tabs based on indent level", () => {
		const w = new Writer(2);
		w.append("x");
		expect(w.read()).toBe("\t\tx");
	});

	it("appendRaw skips indentation", () => {
		const w = new Writer(2);
		w.appendRaw("raw");
		expect(w.read()).toBe("raw");
	});

	it("inline appends to last line", () => {
		const w = new Writer();
		w.append("hello");
		w.inline(" world");
		expect(w.read()).toBe("hello world");
	});

	it("inline on empty buffer uses empty string as base", () => {
		const w = new Writer();
		w.inline("x");
		expect(w.read()).toBe("x");
	});

	it("tab adds extra indentation", () => {
		const w = new Writer(1);
		w.tab("nested");
		expect(w.read()).toBe("\t\t\tnested"); // 1 base + 1 default tab = 2, but tab calls append which adds base indent again
	});

	it("tab with custom indent level", () => {
		const w = new Writer(0);
		w.tab("x", 3);
		expect(w.read()).toBe("\t\t\tx");
	});

	it("pair with value", () => {
		const w = new Writer();
		w.pair("foo", "bar");
		expect(w.read()).toBe("foo: bar,");
	});

	it("pair without value (shorthand)", () => {
		const w = new Writer();
		w.pair("foo");
		expect(w.read()).toBe("foo,");
	});

	it("variables set is populated by $var", () => {
		const w = new Writer();
		w.$const({ name: "myVar", value: "1" });
		expect(w.variables.has("myVar")).toBe(true);
	});

	it("interfaces set is populated by $interface", () => {
		const w = new Writer();
		w.$interface({ variant: "interface", name: "MyInterface", body: () => {} });
		expect(w.interfaces.has("MyInterface")).toBe(true);
	});

	it("writeToFilePath writes incrementally", () => {
		const path = "/tmp/writer-incremental-test.ts";
		const w = new Writer(path);
		w.append(`const x = 1;`);
		w.append(`const y = 2;`);
		expect(readFileSync(path, "utf-8")).toContain(`const x = 1;`);
		expect(readFileSync(path, "utf-8")).toContain(`const y = 2;`);
		unlinkSync(path);
	});

	it("writeToFilePath inline patches last line", () => {
		const path = "/tmp/writer-inline-test.ts";
		const w = new Writer(path);
		w.append(`const x`);
		w.inline(` = 1;`);
		expect(readFileSync(path, "utf-8")).toContain(`const x = 1;`);
		unlinkSync(path);
	});

	it("writeToFilePath clears file on construction", () => {
		const path = "/tmp/writer-clear-test.ts";
		writeFileSync(path, "old content");
		new Writer(path);
		expect(readFileSync(path, "utf-8")).toBe("");
		unlinkSync(path);
	});
});

describe("$var", () => {
	it("const without type", () => {
		const w = new Writer();
		w.$const({ name: "x", value: "1" });
		expect(w.read()).toBe("const x = 1;");
	});

	it("const with type", () => {
		const w = new Writer();
		w.$const({ name: "x", type: "number", value: "1" });
		expect(w.read()).toBe("const x:number = 1;");
	});

	it("let", () => {
		const w = new Writer();
		w.$let({ name: "x", value: "0" });
		expect(w.read()).toBe("let x = 0;");
	});

	it("classMember with keyword", () => {
		const w = new Writer();
		w.$member({
			keyword: "private",
			name: "x",
			value: "0",
		});
		expect(w.read()).toBe("private x = 0;");
	});

	it("classMember without keyword", () => {
		const w = new Writer();
		w.$member({ name: "x", value: "0" });
		expect(w.read()).toBe("x = 0;");
	});
});

describe("$array", () => {
	it("const array without type", () => {
		const w = new Writer();
		w.$array({ variant: "const", name: "arr", items: ["1", "2", "3"] });
		expect(w.read()).toBe("const arr = [1, 2, 3];");
	});

	it("const array with type", () => {
		const w = new Writer();
		w.$array({
			variant: "const",
			name: "arr",
			type: "number",
			items: ["1", "2"],
		});
		expect(w.read()).toBe("const arr: number[] = [1, 2];");
	});

	it("let array", () => {
		const w = new Writer();
		w.$array({ variant: "let", name: "arr", items: ["'a'", "'b'"] });
		expect(w.read()).toBe("let arr = ['a', 'b'];");
	});

	it("anon array", () => {
		const w = new Writer();
		w.$array({ variant: "anon", items: ["x", "y"] });
		expect(w.read()).toBe("[x, y]");
	});

	it("adds to variables set", () => {
		const w = new Writer();
		w.$array({ variant: "const", name: "arr", items: [] });
		expect(w.variables.has("arr")).toBe(true);
	});
});

describe("$return", () => {
	it("void return", () => {
		const w = new Writer();
		w.$return({ variant: "void" });
		expect(w.read()).toBe("return;");
	});

	it("value return", () => {
		const w = new Writer();
		w.$return({ variant: "value", value: "42" });
		expect(w.read()).toBe("return 42;");
	});

	it("object return", () => {
		const w = new Writer();
		w.$return({
			variant: "object",
			body: (w) => {
				w.pair("a", "1");
				w.pair("b", "2");
			},
		});
		const result = w.read();
		expect(result).toContain("return {");
		expect(result).toContain("a: 1,");
		expect(result).toContain("b: 2,");
		expect(result).toContain("};");
	});
});

describe("$throw", () => {
	it("throw new Error", () => {
		const w = new Writer();
		w.$throw({ args: `"something went wrong"` });
		expect(w.read()).toBe(`throw new Error("something went wrong");`);
	});

	it("throw new custom error type", () => {
		const w = new Writer();
		w.$throw({ errorType: "TypeError", args: `"bad type"` });
		expect(w.read()).toBe(`throw new TypeError("bad type");`);
	});
});

describe("$comment", () => {
	it("line comment", () => {
		const w = new Writer();
		w.$comment({ variant: "line", text: "hello" });
		expect(w.read()).toBe("// hello");
	});

	it("block comment", () => {
		const w = new Writer();
		w.$comment({ variant: "block", lines: ["line 1", "line 2"] });
		expect(w.read()).toBe("/*\n * line 1\n * line 2\n */");
	});

	it("jsdoc comment", () => {
		const w = new Writer();
		w.$comment({ variant: "jsdoc", lines: ["@param x", "@returns y"] });
		expect(w.read()).toBe("/**\n * @param x\n * @returns y\n */");
	});
});

describe("$import", () => {
	it("default import", () => {
		const w = new Writer();
		w.$import({ def: "Foo", from: "./foo" });
		expect(w.read()).toBe(`import Foo from "./foo";`);
	});

	it("named imports", () => {
		const w = new Writer();
		w.$import({ keys: ["a", "b"], from: "./mod" });
		expect(w.read()).toBe(`import { a, b } from "./mod";`);
	});

	it("aliased named import", () => {
		const w = new Writer();
		w.$import({ keys: [{ key: "foo", as: "bar" }], from: "./mod" });
		expect(w.read()).toBe(`import { foo as bar } from "./mod";`);
	});
});

describe("$export", () => {
	it("type export", () => {
		const w = new Writer();
		w.$export({ variant: "type", keys: ["Foo", "Bar"] });
		expect(w.read()).toBe("export type { Foo, Bar };");
	});

	it("obj export", () => {
		const w = new Writer();
		w.$export({ variant: "obj", keys: ["a", "b"] });
		expect(w.read()).toBe("export { a, b };");
	});

	it("named export", () => {
		const w = new Writer();
		w.$export({ variant: "named", name: "routes", keys: ["get", "post"] });
		expect(w.read()).toBe("export const routes = { get, post };");
	});

	it("default export single", () => {
		const w = new Writer();
		w.$export({ variant: "default", keys: ["MyClass"] });
		expect(w.read()).toBe("export default MyClass;");
	});

	it("default export multiple", () => {
		const w = new Writer();
		w.$export({ variant: "default", keys: ["a", "b"] });
		expect(w.read()).toBe("export default { a, b };");
	});

	it("reexport", () => {
		const w = new Writer();
		w.$export({ variant: "reexport", keys: ["Foo"], from: "./foo" });
		expect(w.read()).toBe(`export { Foo } from "./foo";`);
	});

	it("reexport star", () => {
		const w = new Writer();
		w.$export({ variant: "reexportStar", from: "./foo" });
		expect(w.read()).toBe(`export * from "./foo";`);
	});
});

describe("$if", () => {
	it("simple if", () => {
		const w = new Writer();
		w.$if("x > 0").then((w) => {
			w.append("return x;");
		});
		const result = w.read();
		expect(result).toContain("if (x > 0) {");
		expect(result).toContain("return x;");
		expect(result).toContain("}");
	});

	it("if with multiple conditions", () => {
		const w = new Writer();
		w.$if("x > 0", "&&", "x < 10").then((w) => {
			w.append("ok();");
		});
		expect(w.read()).toContain("if (x > 0 && x < 10) {");
	});

	it("if/else", () => {
		const w = new Writer();
		w.$if("x")
			.then((w) => {
				w.append("a();");
			})
			.else((w) => {
				w.append("b();");
			});
		const result = w.read();
		expect(result).toContain("if (x) {");
		expect(result).toContain("a();");
		expect(result).toContain("else {");
		expect(result).toContain("b();");
	});

	it("if/elseif/else", () => {
		const w = new Writer();
		w.$if("x === 1")
			.then((w) => {
				w.append("one();");
			})
			.elseif("x === 2")
			.then((w) => {
				w.append("two();");
			})
			.else((w) => {
				w.append("other();");
			});
		const result = w.read();
		expect(result).toContain("if (x === 1) {");
		expect(result).toContain("else if (x === 2) {");
		expect(result).toContain("else {");
	});
});

describe("$for", () => {
	it("for..of loop", () => {
		const w = new Writer();
		w.$for(["const", "item", "of", "items"], (w) => {
			w.append("use(item);");
		});
		const result = w.read();
		expect(result).toContain("for (const item of items) {");
		expect(result).toContain("use(item);");
		expect(result).toContain("}");
	});

	it("for..in loop", () => {
		const w = new Writer();
		w.$for(["const", "key", "in", "obj"], (w) => {
			w.append("log(key);");
		});
		expect(w.read()).toContain("for (const key in obj) {");
	});
});

describe("$switch", () => {
	it("basic switch with break", () => {
		const w = new Writer();
		w.$switch(
			"x",
			{
				condition: `"a"`,
				body: (w) => {
					w.append(`doA();`);
				},
			},
			{
				condition: `"b"`,
				body: (w) => {
					w.append(`doB();`);
				},
			},
		);
		const result = w.read();
		expect(result).toContain(`switch (x) {`);
		expect(result).toContain(`case "a": {`);
		expect(result).toContain(`doA();`);
		expect(result).toContain(`break;`);
		expect(result).toContain(`case "b": {`);
	});

	it("case with break: false", () => {
		const w = new Writer();
		w.$switch("x", {
			condition: `"a"`,
			body: (w) => {
				w.append(`fall();`);
			},
			break: false,
		});
		expect(w.read()).not.toContain("break;");
	});

	it("switch with default", () => {
		const w = new Writer();
		w.$switch("x", {
			condition: "default",
			body: (w) => w.append("noop();"),
		});
		const result = w.read();
		expect(result).toContain("default: {");
		expect(result).toContain("noop();");
	});
});

describe("$tryCatch", () => {
	it("try only", () => {
		const w = new Writer();
		w.$tryCatch({
			try: (w) => {
				w.append("risky();");
			},
		});
		const result = w.read();
		expect(result).toContain("try {");
		expect(result).toContain("risky();");
		expect(result).not.toContain("catch");
		expect(result).not.toContain("finally");
	});

	it("try/catch", () => {
		const w = new Writer();
		w.$tryCatch({
			try: (w) => {
				w.append("risky();");
			},
			catch: {
				body: (w) => {
					w.append("handle(e);");
				},
			},
		});
		const result = w.read();
		expect(result).toContain("catch (e) {");
		expect(result).toContain("handle(e);");
	});

	it("catch with custom arg", () => {
		const w = new Writer();
		w.$tryCatch({
			try: (w) => {
				w.append("x();");
			},
			catch: {
				arg: "err",
				body: (w) => {
					w.append("log(err);");
				},
			},
		});
		expect(w.read()).toContain("catch (err) {");
	});

	it("try/catch/finally", () => {
		const w = new Writer();
		w.$tryCatch({
			try: (w) => {
				w.append("x();");
			},
			catch: {
				body: (w) => {
					w.append("y();");
				},
			},
			finally: (w) => {
				w.append("cleanup();");
			},
		});
		const result = w.read();
		expect(result).toContain("finally {");
		expect(result).toContain("cleanup();");
	});
});

describe("$function", () => {
	it("function declaration", () => {
		const w = new Writer();
		w.$function({
			variant: "function",
			name: "greet",
			body: (w) => {
				w.append(`return "hi";`);
			},
		});
		const result = w.read();
		expect(result).toContain("function");
		expect(result).toContain("greet");
		expect(result).toContain(`return "hi";`);
		expect(result).toContain("}");
	});

	it("async function declaration", () => {
		const w = new Writer();
		w.$function({
			variant: "function",
			name: "fetch",
			isAsync: true,
			body: () => {},
		});
		expect(w.read()).toContain("async");
	});

	it("function with generics and return type", () => {
		const w = new Writer();
		w.$function({
			variant: "function",
			name: "id",
			generics: ["T"],
			type: "T",
			args: ["x: T"],
			body: () => {},
		});
		const result = w.read();
		expect(result).toContain("<T>");
		expect(result).toContain("x: T");
		expect(result).toContain(": T");
	});

	it("const arrow function", () => {
		const w = new Writer();
		w.$function({
			variant: "const",
			name: "add",
			args: ["a: number", "b: number"],
			type: "number",
			body: (w) => {
				w.append("return a + b;");
			},
		});
		const result = w.read();
		expect(result).toContain("const add");
		expect(result).toContain("=>");
		expect(result).toContain("return a + b;");
	});

	it("method", () => {
		const w = new Writer();
		w.$function({
			variant: "method",
			name: "run",
			keyword: "public",
			body: (w) => {
				w.append("this.go();");
			},
		});
		const result = w.read();
		expect(result).toContain("public");
		expect(result).toContain("run");
		expect(result).toContain("this.go();");
	});

	it("constMethod", () => {
		const w = new Writer();
		w.$function({ variant: "constMethod", name: "handler", body: () => {} });
		const result = w.read();
		expect(result).toContain("handler");
		expect(result).toContain("=>");
	});

	it("abstractMethod has no body", () => {
		const w = new Writer();
		w.$function({ variant: "abstractMethod", name: "run", keyword: "public" });
		const result = w.read();
		expect(result).toContain("abstract");
		expect(result).toContain("run");
	});

	it("adds to variables set", () => {
		const w = new Writer();
		w.$function({ variant: "const", name: "myFn", body: () => {} });
		expect(w.variables.has("myFn")).toBe(true);
	});
});

describe("$object", () => {
	it("const object", () => {
		const w = new Writer();
		w.$object({
			variant: "const",
			name: "config",
			body: (w) => {
				w.pair("debug", "true");
			},
		});
		const result = w.read();
		expect(result).toContain("const config");
		expect(result).toContain("debug: true,");
		expect(result).toContain("};");
	});

	it("objectMember", () => {
		const w = new Writer();
		w.$object({ variant: "objectMember", name: "meta", body: () => {} });
		expect(w.read()).toContain("meta: {");
	});

	it("classMember with keyword", () => {
		const w = new Writer();
		w.$object({
			variant: "classMember",
			name: "state",
			keyword: "private readonly",
			body: () => {},
		});
		expect(w.read()).toContain("private readonly state = {");
	});

	it("anon object no semicolon", () => {
		const w = new Writer();
		w.$object({ variant: "anon", body: () => {} });
		const result = w.read();
		expect(result).toContain("{");
		expect(result).not.toContain("};");
	});
});

describe("$class", () => {
	it("basic class", () => {
		const w = new Writer();
		w.$class({ name: "MyClass", body: () => {} });
		const result = w.read();
		expect(result).toContain("class MyClass");
		expect(result).toContain("}");
	});

	it("abstract class", () => {
		const w = new Writer();
		w.$class({ name: "Base", isAbstract: true, body: () => {} });
		expect(w.read()).toContain("abstract class Base");
	});

	it("exported class", () => {
		const w = new Writer();
		w.$class({ name: "Foo", isExported: true, body: () => {} });
		expect(w.read()).toContain("export");
	});

	it("class with extends", () => {
		const w = new Writer();
		w.$class({ name: "Child", extends: "Parent", body: () => {} });
		const result = w.read();
		expect(result).toContain("extends Parent");
	});

	it("class with implements", () => {
		const w = new Writer();
		w.$class({ name: "Impl", implements: "MyInterface", body: () => {} });
		expect(w.read()).toContain("implements MyInterface");
	});

	it("class with constructor args and body", () => {
		const w = new Writer();
		w.$class({
			name: "Service",
			constr: {
				args: [{ keyword: "private", key: "name", type: "string" }],
				body: (w) => {
					w.append("this.init();");
				},
			},
			body: () => {},
		});
		const result = w.read();
		expect(result).toContain("constructor(private name: string)");
		expect(result).toContain("this.init();");
	});

	it("class body is written", () => {
		const w = new Writer();
		w.$class({
			name: "X",
			body: (w) => {
				w.$function({ variant: "method", name: "go", body: () => {} });
			},
		});
		expect(w.read()).toContain("go");
	});

	it("adds to variables set", () => {
		const w = new Writer();
		w.$class({ name: "MyClass", body: () => {} });
		expect(w.variables.has("MyClass")).toBe(true);
	});
});

describe("$interface", () => {
	it("interface declaration", () => {
		const w = new Writer();
		w.$interface({
			variant: "interface",
			name: "IFoo",
			body: (w) => {
				w.append("x: number;");
			},
		});
		const result = w.read();
		expect(result).toContain("interface IFoo");
		expect(result).toContain("x: number;");
	});

	it("type alias", () => {
		const w = new Writer();
		w.$interface({ variant: "type", name: "MyType", body: () => {} });
		expect(w.read()).toContain("type MyType =");
	});

	it("interface with generics", () => {
		const w = new Writer();
		w.$interface({
			variant: "interface",
			name: "Repo",
			generics: ["T"],
			body: () => {},
		});
		expect(w.read()).toContain("Repo<T>");
	});

	it("anon interface", () => {
		const w = new Writer();
		w.$interface({
			variant: "anon",
			body: (w) => {
				w.append("id: string;");
			},
		});
		const result = w.read();
		expect(result).toContain("{");
		expect(result).toContain("id: string;");
	});

	it("adds to interfaces set", () => {
		const w = new Writer();
		w.$interface({ variant: "interface", name: "IBar", body: () => {} });
		expect(w.interfaces.has("IBar")).toBe(true);
	});
});

describe("nested Writers", () => {
	it("nested indent is correct", () => {
		const w = new Writer(0);
		w.$function({
			variant: "function",
			name: "outer",
			body: (inner) => {
				inner.$function({
					variant: "function",
					name: "inner",
					body: (innermost) => {
						innermost.append("return 1;");
					},
				});
			},
		});
		const result = w.read();
		expect(result).toContain("function outer");
		expect(result).toContain("function inner");
		expect(result).toContain("return 1;");
	});
});
