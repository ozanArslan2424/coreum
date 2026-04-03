import type { StandardSchemaV1 } from "@/Core/Model/StandardSchema";

export interface Schema<T = unknown> extends StandardSchemaV1<unknown, T> {}
