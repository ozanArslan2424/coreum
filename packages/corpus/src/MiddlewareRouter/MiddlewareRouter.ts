import { compile } from "corpus-utils/compile";

import { BaseRouteAbstract } from "@/BaseRoute/BaseRouteAbstract";
import { Controller } from "@/Controller/Controller";
import type { MiddlewareHandler } from "@/Middleware/MiddlewareHandler";
import type { MiddlewareInterface } from "@/Middleware/MiddlewareInterface";
import type { MiddlewareUseOn } from "@/Middleware/MiddlewareUseOn";
import { MiddlewareVariant } from "@/Middleware/MiddlewareVariant";
import type { MiddlewareRouterInterface } from "@/MiddlewareRouter/MiddlewareRouterInterface";
import type { MiddlewareStoreReturn } from "@/MiddlewareRouter/MiddlewareRouterReturn";

export class MiddlewareRouter implements MiddlewareRouterInterface {
	private readonly maps = {
		[MiddlewareVariant.inbound]: new Map<string, MiddlewareHandler[]>(),
		[MiddlewareVariant.outbound]: new Map<string, MiddlewareHandler[]>(),
	};

	add(middleware: MiddlewareInterface): void {
		const map = this.maps[middleware.variant];
		for (const routeId of MiddlewareRouter.resolveRouteIds(middleware.useOn)) {
			let handlers = map.get(routeId);
			if (!handlers) {
				handlers = [];
				map.set(routeId, handlers);
			}
			handlers.push(middleware.handler);
		}
	}

	find(routeId: string): MiddlewareStoreReturn {
		return {
			inbound: compile(this.maps[MiddlewareVariant.inbound].get(routeId) ?? []),
			outbound: compile(this.maps[MiddlewareVariant.outbound].get(routeId) ?? []),
		};
	}

	// STATIC
	static resolveRouteIds(useOn: MiddlewareUseOn): string[] {
		if (useOn === "*") return ["*"];
		const targets = Array.isArray(useOn) ? useOn : [useOn];
		const routeIds: string[] = [];
		for (const target of targets) {
			if (target instanceof BaseRouteAbstract) routeIds.push(target.id);
			else if (target instanceof Controller) routeIds.push(...target.routeIds);
			else routeIds.push(target);
		}
		return routeIds;
	}
}
