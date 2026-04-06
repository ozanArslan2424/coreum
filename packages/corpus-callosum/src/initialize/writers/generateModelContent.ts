export function generateModelContent(
	name: string,
	validationLib: string | null,
): string {
	switch (validationLib) {
		case "arktype":
			return `import { type } from "arktype";
import { X } from "@ozanarslan/corpus";

export type ${name}Type = X.InferModel<typeof ${name}Model>;

export class ${name}Model {
	static entity = type({ id: "string", name: "string" });
	static get = { params: type({ id: "string" }), response: this.entity };
	static list = { search: type({ "page?": type("string").pipe(Number), "limit?": type("string").pipe(Number), }), response: this.entity.array() };
	static create = { body: type({ name: "string > 3" }), response: this.entity };
	static update = { params: this.get.params, body: this.create.body.partial(), response: this.entity };
	static delete = { params: this.get.params, response: type("undefined") };
}`;

		case "zod":
			return `import { z } from "zod";
import { X } from "@ozanarslan/corpus";

export type ${name}Type = X.InferModel<typeof ${name}Model>;

export class ${name}Model {
	static entity = z.object({ id: z.string(), name: z.string() });
	static get = { params: z.object({ id: z.string() }), response: this.entity };
	static list = { search: z.object({ page: z.string().transform(Number).optional(), limit: z.string().transform(Number).optional() }), response: this.entity.array() };
	static create = { body: z.object({ name: z.string().min(3) }), response: this.entity };
	static update = { params: this.get.params, body: this.create.body.partial(), response: this.entity };
	static delete = { params: this.get.params, response: z.undefined() };
}`;

		case "valibot":
			return `import * as v from "valibot";
import { X } from "@ozanarslan/corpus";

export type ${name}Type = X.InferModel<typeof ${name}Model>;

export class ${name}Model {
	static entity = v.object({ id: v.string(), name: v.string() }); 
	static get = { params: v.object({ id: v.string() }), response: this.entity }; 
	static list = { search: v.object({ page: v.optional(v.pipe(v.string(), v.transform(Number))), limit: v.optional(v.pipe(v.string(), v.transform(Number))), }), response: v.array(this.entity) }; 
	static create = { body: v.object({ name: v.string() }), response: this.entity }; 
	static update = { params: this.get.params, body: v.partial(this.create.body), response: this.entity, }; 
	static delete = { params: this.get.params, response: v.undefined() };
}`;

		case "yup":
			return `import * as yup from "yup";
import { X } from "@ozanarslan/corpus";

export type ${name}Type = X.InferModel<typeof ${name}Model>;

export class ${name}Model {
	static entity = yup.object({ id: yup.string().required(), name: yup.string().required() });
	static get = { params: yup.object({ id: yup.string().required() }), response: this.entity };
	static list = { search: yup.object({ page: yup.number(), limit: yup.number() }), response: yup.array().of(this.entity) };
	static create = { body: yup.object({ name: yup.string().min(3).required() }), response: this.entity };
	static update = { params: this.get.params, body: yup.object({ name: yup.string() }), response: this.entity };
	static delete = { params: this.get.params, response: yup.object() };
}`;

		default:
			return `export interface ${name}Type {
	// No validation library detected.
	 entity: { id: string, name: string };
	 get: { params: { id: string }, response: ${name}Type["entity"] };
	 list: { search: { page?: string, limit?: string }, response: [${name}Type["entity"]] };
	 create: { body: { name: string }, response: ${name}Type["entity"] };
	 update: { params: ${name}Type["get"]["params"], body: { name: string }, response: ${name}Type["entity"] };
	 delete: { params: ${name}Type["get"]["params"], response: undefined };
}`;
	}
}
