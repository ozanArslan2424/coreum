import type { Method } from "@/CRequest/enums/Method";

export type DynamicRouteDefinition<Path extends string = string> =
	| { method: Method; path: Path }
	| Path;
