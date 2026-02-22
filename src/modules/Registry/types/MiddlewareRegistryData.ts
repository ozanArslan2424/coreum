import type { MiddlewareHandler } from "@/modules/Middleware/types/MiddlewareHandler";
import type { RouteId } from "@/modules/Route/types/RouteId";

export type MiddlewareRegistryData = {
	handler: MiddlewareHandler;
	order: number;
	routeId: RouteId | "*";
};
