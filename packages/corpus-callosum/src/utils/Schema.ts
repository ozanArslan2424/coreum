import type { StandardSchemaV1 } from "@standard-schema/spec";

export interface Schema<T = unknown> extends StandardSchemaV1<unknown, T> {}
