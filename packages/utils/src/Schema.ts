import type { StandardSchemaV1 } from "@standard-schema/spec";

export interface Schema<T = unknown> extends StandardSchemaV1<unknown, T> {}

export type InferSchemaIn<T extends Schema> = StandardSchemaV1.InferInput<T>;
export type InferSchemaOut<T extends Schema> = StandardSchemaV1.InferOutput<T>;

export type SchemaValidator<T = unknown> = StandardSchemaV1.Props<
	unknown,
	T
>["validate"];

export type ValidationIssues = readonly StandardSchemaV1.Issue[];
