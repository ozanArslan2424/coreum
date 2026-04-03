import type { Method } from "@/Core/CRequest/Method";

export type DynamicRouteDefinition<E extends string = string> =
	| E
	| { method: Method; path: E };
