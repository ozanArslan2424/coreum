import type { StandardSchemaV1 } from "@/Core/Model/StandardSchema";

export type SchemaValidator<T = unknown> = StandardSchemaV1.Props<
	unknown,
	T
>["validate"];
