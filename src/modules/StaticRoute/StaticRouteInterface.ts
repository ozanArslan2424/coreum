import type { HttpResponseInterface } from "@/modules/HttpResponse/HttpResponseInterface";
import type { RouteInterface } from "@/modules/Route/RouteInterface";
import type { StaticRouteHandler } from "@/modules/StaticRoute/types/StaticRouteHandler";

export interface StaticRouteInterface<
	Path extends string = string,
> extends RouteInterface<Path, HttpResponseInterface<string>> {
	handler: StaticRouteHandler;
}
