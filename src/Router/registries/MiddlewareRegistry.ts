import type { Context } from "@/Context/Context";
import { Controller } from "@/Controller/Controller";
import type { Middleware } from "@/Middleware/Middleware";
import { DynamicRoute } from "@/DynamicRoute/DynamicRoute";
import type { RouteId } from "@/Route/types/RouteId";
import type { RouterMiddlewareData } from "@/Router/types/RouterMiddlewareData";
import { LazyMap } from "@/Store/LazyMap";
import { compile } from "@/utils/compile";
import type { Func } from "@/utils/types/Func";

export class MiddlewareRegistry {
	// RouteId | "*" -> RouterMiddlewareData
	private middlewares = new LazyMap<string, RouterMiddlewareData>();

	add(middleware: Middleware): void {
		const resolved = MiddlewareRegistry.resolveRouteIds(middleware);

		if (resolved.isGlobal) {
			const existing = this.middlewares.get("*") ?? [];
			this.middlewares.set("*", [...existing, middleware.handler]);
			return;
		}

		for (const routeId of resolved.routeIds) {
			const existing = this.middlewares.get(routeId) ?? [];
			this.middlewares.set(routeId, [...existing, middleware.handler]);
		}
	}

	find(routeId: RouteId | "*"): Func<[Context]> {
		return compile(this.middlewares.get(routeId) ?? []);
	}

	// STATIC

	/** Returns a discriminated union — isGlobal true means useOn was "*" */
	static resolveRouteIds(
		m: Middleware,
	): { isGlobal: true } | { isGlobal: false; routeIds: RouteId[] } {
		if (m.useOn === "*") return { isGlobal: true };

		const targets = Array.isArray(m.useOn) ? m.useOn : [m.useOn];
		const routeIds: RouteId[] = [];

		for (const target of targets) {
			if (target instanceof DynamicRoute) {
				routeIds.push(target.id);
			} else if (target instanceof Controller) {
				routeIds.push(...target.routeIds);
			}
		}

		return { isGlobal: false, routeIds };
	}
}
