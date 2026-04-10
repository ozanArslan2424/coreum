import type {
	StandardSchemaV1,
	StandardJSONSchemaV1,
} from "@standard-schema/spec";

export interface Schema<T = unknown> extends StandardSchemaV1<unknown, T> {}
export interface JsonSchema<T = unknown> extends StandardJSONSchemaV1<
	unknown,
	T
> {}
