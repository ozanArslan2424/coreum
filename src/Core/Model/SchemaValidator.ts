import type { StandardSchemaV1 } from "@standard-schema/spec";

export type SchemaValidator<T = unknown> = StandardSchemaV1.Props<
	unknown,
	T
>["validate"];
