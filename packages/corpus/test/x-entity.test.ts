// import { type } from "arktype";
// import type { XEntityJsonSchema } from "../dist";
// import { $registryTesting, TX } from "./_modules";
// import { beforeEach, describe, expect, it } from "bun:test";
//
// beforeEach(() => $registryTesting.reset());
//
// class TestEntity extends TX.Entity {
// 	name = "Person";
// 	shape = type({
// 		name: "string",
// 		surname: "string",
// 		age: "number",
// 	});
// }
//
// class TestEntityWithJsonSchema extends TX.Entity {
// 	constructor() {
// 		super();
// 		this.defineJsonSchema({
// 			type: "object",
// 			properties: {
// 				name: { type: "string" },
// 				surname: { type: "string" },
// 				age: { type: "integer", minimum: 18 },
// 			},
// 			required: ["name", "surname", "age"],
// 		});
// 	}
//
// 	name = "Person";
// 	shape = type({
// 		name: "string",
// 		surname: "string",
// 		age: "number > 18",
// 	});
// }
//
// const entity = new TestEntity();
// const entityWithJsonSchema = new TestEntityWithJsonSchema();
//
// describe("X.Entity", () => {
// 	it("NAME", () => {
// 		expect(entity.name).toBe("Person");
// 		expect(entityWithJsonSchema.name).toBe("Person");
// 	});
// });
