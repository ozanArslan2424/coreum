import type { HttpResponseInterface } from "@/modules/HttpResponse/HttpResponseInterface";
import { RouteAbstract } from "@/modules/Route/RouteAbstract";
import type { StaticRouteInterface } from "@/modules/StaticRoute/StaticRouteInterface";

export abstract class StaticRouteAbstract<Path extends string = string>
	extends RouteAbstract<Path, HttpResponseInterface<string>>
	implements StaticRouteInterface<Path> {}
