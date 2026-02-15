import { RouterAbstract } from "@/modules/Router/RouterAbstract";
import type { RouterInterface } from "@/modules/Router/RouterInterface";
import type { AnyRoute } from "@/modules/Route/types/AnyRoute";

export class RouterUsingArray
	extends RouterAbstract
	implements RouterInterface
{
	private array: Array<AnyRoute> = [];

	add(route: AnyRoute): void {
		this.array.push(route);
	}

	listRoutes(): Array<AnyRoute> {
		return this.array;
	}

	update(route: AnyRoute): void {
		this.array.map((r) => (r.id === route.id ? route : r));
	}
}
