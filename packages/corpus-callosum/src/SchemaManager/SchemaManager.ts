import type { Config } from "../Config/Config";
import type { JsonSchema, Schema } from "../utils/Schema";
import { compile } from "json-schema-to-typescript";

import { convertSchema as yupToJsonSchema } from "@sodaru/yup-to-json-schema";
import z from "zod";
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
				return yupToJsonSchema(schema as any, this.options) as Record<
					string,
					unknown
				>;

			case "zod":
				return z.toJSONSchema(schema as any, {
					target: "draft-07",
					unrepresentable: "any",
					...this.options,
				});

			case "arktype":
			default:
				return (schema as unknown as JsonSchema)["~standard"].jsonSchema.output(
					{
						target: "draft-07",
						...this.options,
					},
				);
		}
	}

	async toInterface(jsonSchema: Record<string, unknown>, name?: string) {
		const schemaType = await compile(
			jsonSchema,
			name ?? "DoesnTMatterWillBeDeleted",
			{
				bannerComment: "",
				format: false,
				ignoreMinAndMaxItems: true,
				additionalProperties: false,
			},
		);

		if (!name) {
			const match = schemaType.match(/\{[\s\S]*\}/);
			if (!match) return schemaType.trim();
			return match[0]
				.replace(/([^{])\n/g, "$1;")
				.replace(/;+/g, ";")
				.replace(/\s+/g, "")
				.replace(/;}/g, "}");
		}

		return schemaType;
	}
}
