import { describe, it, expect } from "bun:test";
import { TC } from "./_modules";
import { type } from "arktype";
import * as z from "zod";

// ─── schemas ─────────────────────────────────────────────────────────────────

const arkSimple = type({ name: "string", age: "number" });
const zodSimple = z.object({ name: z.string(), age: z.number() });

const arkWithPipe = type({ name: "string", age: "string" }).pipe((v) => {
	const name = v.name.trim();
	return {
		name: name.charAt(0).toUpperCase() + name.slice(1),
		age: Number(v.age),
	};
});

describe("C.Entity", () => {
	describe("construction via subclass", () => {
		it("assigns parsed values to instance (ark)", () => {
			class Person extends TC.Entity({ name: "Person", schema: arkSimple }) {}
			const p = new Person({ name: "ozan", age: 26 });
			expect(p.name).toBe("ozan");
			expect(p.age).toBe(26);
		});

		it("assigns parsed values to instance (zod)", () => {
			class Person extends TC.Entity({ name: "Person", schema: zodSimple }) {}
			const p = new Person({ name: "ozan", age: 26 });
			expect(p.name).toBe("ozan");
			expect(p.age).toBe(26);
		});

		it("applies schema transformations (pipe)", () => {
			class Person extends TC.Entity({ name: "Person", schema: arkWithPipe }) {}
			const p = new Person({ name: "  ozan  ", age: "26" });
			expect(p.name).toBe("Ozan");
			expect(p.age).toBe(26);
			expect(typeof p.age).toBe("number");
		});

		it("throws on invalid input", () => {
			class Person extends TC.Entity({ name: "Person", schema: arkSimple }) {}
			// @ts-expect-error intentional bad input
			expect(() => new Person({ name: 123, age: "not a number" })).toThrow();
		});
	});

	describe("subclass methods and properties", () => {
		class Person extends TC.Entity({
			name: "Person",
			schema: arkWithPipe,
		}) {
			greet() {
				return `hi, i'm ${this.name}`;
			}
		}

		it("subclass methods work", () => {
			const p = new Person({ name: "ozan", age: "26" });
			expect(p.greet()).toBe("hi, i'm Ozan");
		});

		it("further subclassing works", () => {
			class Ozan extends Person {
				constructor() {
					super({ name: "ozan", age: "26" });
				}
				earthBend() {
					return "Mountains crumble beneath my will";
				}
			}
			const ozan = new Ozan();
			expect(ozan.name).toBe("Ozan"); // pipe uppercases
			expect(ozan.age).toBe(26);
			expect(ozan.earthBend()).toBe("Mountains crumble beneath my will");
			expect(ozan.greet()).toBe("hi, i'm Ozan");
		});
	});

	describe("static members", () => {
		it("exposes schema as static", () => {
			class Person extends TC.Entity({ name: "Person", schema: arkSimple }) {}
			expect(Person.schema).toBe(arkSimple);
		});

		it("exposes jsonSchema as static when provided", () => {
			const jsonSchema = { type: "object" } as any;
			class Person extends TC.Entity({
				name: "Person",
				schema: arkSimple,
				jsonSchema,
			}) {}
			expect(Person.jsonSchema).toBe(jsonSchema);
		});

		it("jsonSchema is undefined when not provided", () => {
			class Person extends TC.Entity({ name: "Person", schema: arkSimple }) {}
			expect(Person.jsonSchema).toBeUndefined();
		});
	});

	describe("disableParsing", () => {
		it("skips validation — bad input passes through", () => {
			class Person extends TC.Entity({
				name: "Person",
				schema: arkSimple,
				disableParsing: true,
			}) {}
			// @ts-expect-error intentional bad input
			const p = new Person({ name: 123, age: "not a number" });
			// @ts-expect-error intentional bad output
			expect(p.name).toBe(123);
			// @ts-expect-error intentional bad output
			expect(p.age).toBe("not a number");
		});

		it("exposes disableParsing as static", () => {
			class Person extends TC.Entity({
				name: "Person",
				schema: arkSimple,
				disableParsing: true,
			}) {}
			expect(Person.disableParsing).toBe(true);
		});
	});
});
