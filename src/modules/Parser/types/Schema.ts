import type { Type } from "arktype";

export type Schema<T = unknown> = Type<T>;

export type InferSchema<T extends Schema> = T["infer"];
