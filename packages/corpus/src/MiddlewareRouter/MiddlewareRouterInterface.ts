import type { MiddlewareInterface } from "@/Middleware/MiddlewareInterface";
import type { MiddlewareStoreReturn } from "@/MiddlewareRouter/MiddlewareRouterReturn";

export interface MiddlewareRouterInterface {
	add(middleware: MiddlewareInterface): void;
	find(routeId: string): MiddlewareStoreReturn;
}
