import { RouterAbstract } from "@/modules/Router/RouterAbstract";
import type { RouterInterface } from "@/modules/Router/RouterInterface";
import type { AnyRoute } from "@/modules/Route/types/AnyRoute";
import type { RouteId } from "@/modules/Route/types/RouteId";

export class RouterUsingObject
	extends RouterAbstract
	implements RouterInterface
{
	private object: Record<RouteId, AnyRoute> = {};

	add(route: AnyRoute): void {
		this.object[route.id] = route;
	}

	listRoutes(): Array<AnyRoute> {
		return Object.values(this.object).flat();
	}

	update(route: AnyRoute): void {
		this.object[route.id] = route;
	}
}
