import type { BaseRouteInterface } from "@/BaseRoute/BaseRouteInterface";
import type { Req } from "@/Req/Req";
import type { RouterData } from "@/Router/RouterData";
import type { RouterReturn } from "@/Router/RouterReturn";

export interface RouterInterface {
	add(route: BaseRouteInterface<any, any, any, any>): void;
	find(req: Req): RouterReturn | null;
	list(): Array<RouterData>;
}
