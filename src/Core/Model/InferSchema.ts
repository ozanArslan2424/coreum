import type { Schema } from "@/Core/Model/Schema";
import type { StandardSchemaV1 } from "@standard-schema/spec";

export type InferSchema<T extends Schema> = StandardSchemaV1.InferOutput<T>;
