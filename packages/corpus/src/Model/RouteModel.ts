import type { Schema } from "@/Model/Schema";

export type RouteModel<B = unknown, S = unknown, P = unknown, R = unknown> = {
	response?: Schema<R>;
	body?: Schema<B>;
	search?: Schema<S>;
	params?: Schema<P>;
};
