import type { HttpResponseInterface } from "@/modules/HttpResponse/HttpResponseInterface";
import type { RouteHandler } from "@/modules/Route/types/RouteHandler";

export type StaticRouteHandler = RouteHandler<HttpResponseInterface<string>>;
