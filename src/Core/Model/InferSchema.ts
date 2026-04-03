import type { Schema } from "@/Core/Model/Schema";
import type { StandardSchemaV1 } from "@/Core/Model/StandardSchema";

export type InferSchema<T extends Schema> = StandardSchemaV1.InferOutput<T>;
