import type { Controller } from "@/Core/Controller/Controller";
import type { RouteInterface } from "@/Core/Route/RouteInterface";

export type MiddlewareUseOn =
	| Array<RouteInterface<any, any, any, any, string> | Controller>
	| RouteInterface<any, any, any, any, string>
	| Controller
	| "*";
