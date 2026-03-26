import type { Method } from "@/CRequest/enums/Method";

export type DynamicRouteDefinition<E extends string = string> =
	| E
	| { method: Method; path: E };
