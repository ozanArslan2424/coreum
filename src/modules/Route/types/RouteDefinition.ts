import type { Method } from "@/modules/HttpRequest/enums/Method";

export type RouteDefinition<Path extends string = string> =
	| { method: Method; path: Path }
	| Path;
