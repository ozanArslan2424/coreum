import { convertSchema as yupToJsonSchema } from "@sodaru/yup-to-json-schema";
import type { Type } from "arktype";
import { compile } from "json-schema-to-typescript";
import z from "zod";

import type { Config } from "../Config/Config";
import type { Schema } from "../utils/Schema";
// TODO:
// import { toJsonSchema as valibotToJsonSchema } from "@valibot/to-json-schema";

export class SchemaManager {
	constructor(private readonly config: Config) {}

	get options(): Record<string, unknown> {
		return this.config.jsonSchemaOptions;
	}

	toJsonSchema(schema: Schema): Record<string, unknown> {
		const confLib = this.config.validationLibrary;
		const vendor = schema["~standard"].vendor;
		const lib = confLib !== vendor ? vendor : (confLib ?? vendor);
		switch (lib) {
			case "yup":
				return yupToJsonSchema(schema as any, this.options) as Record<string, unknown>;

			case "zod":
				return z.toJSONSchema(schema as any, {
					target: "draft-07",
					unrepresentable: "any",
					...this.options,
				});

			case "arktype":
			default:
				return (schema as Type).toJsonSchema({
					target: "draft-07",
					...this.options,
				}) as Record<string, unknown>;
		}
	}

	async toInterface(jsonSchema: Record<string, unknown>, name?: string) {
		const schemaType = await compile(jsonSchema, name ?? "DoesnTMatterWillBeDeleted", {
			bannerComment: "",
			format: false,
			ignoreMinAndMaxItems: true,
			additionalProperties: false,
		});

		if (!name) {
			// const clean = schemaType
			// 	.replace("export ", "")
			// 	.replace("type DoesnTMatterWillBeDeleted = ", "")
			// 	.replace("interface DoesnTMatterWillBeDeleted", "")
			// 	.trim();
			//
			// let bld = "";
			// for (let line of clean.split("\n")) {
			// 	if (!line.endsWith("{")) {
			// 		line += ";";
			// 	}
			// 	bld += line;
			// }
			// return bld;
			return schemaType
				.replace("export ", "")
				.replace("type DoesnTMatterWillBeDeleted = ", "")
				.replace("interface DoesnTMatterWillBeDeleted", "")
				.trim();
		}

		return schemaType;
	}
}
