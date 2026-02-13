import type { Schema, InferSchema } from "@/modules/Parser/types/Schema";

export type InferModel<T extends Record<string, any>> = {
	[K in keyof T]: T[K] extends {
		body?: any;
		response?: any;
		params?: any;
		query?: any;
	}
		? {
				body: T[K]["body"] extends Schema ? InferSchema<T[K]["body"]> : never;
				response: T[K]["response"] extends Schema
					? InferSchema<T[K]["response"]>
					: never;
				params: T[K]["params"] extends Schema
					? InferSchema<T[K]["params"]>
					: never;
				query: T[K]["query"] extends Schema
					? InferSchema<T[K]["query"]>
					: never;
			}
		: T[K] extends Schema
			? InferSchema<T[K]>
			: never;
};
