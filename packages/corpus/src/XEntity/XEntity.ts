import type { XEntityJsonSchema } from "@/XEntity/XEntityJsonSchema";
import type { InferSchemaIn, Schema } from "corpus-utils/Schema";

export function XEntity<T extends Schema>(shape: T) {
	type Instance = InferSchemaIn<T>;

	abstract class BaseEntity {
		static readonly shape = shape;
		static jsonSchema?: XEntityJsonSchema;

		constructor(values: Instance) {
			Object.assign(this, values);
		}
	}

	return BaseEntity as unknown as abstract new (
		values: Instance,
	) => BaseEntity & Instance;
}

// example area below
//
// import { type } from "arktype";
//
// class Person extends XEntity(
// 	type({
// 		name: "string",
// 		surname: type("string").pipe((s) => s.charAt(0).toUpperCase() + s.slice(1)),
// 		age: type("string").pipe(Number),
// 	}),
// ) {
// 	toSomething() {
// 		return "something";
// 	}
// }
//
// const p = new Person({ name: "ozan", surname: "arslan", age: 25 });
// p.toSomething();
