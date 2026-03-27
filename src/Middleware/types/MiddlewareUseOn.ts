import type { Controller } from "@/Controller/Controller";
import type { RouteInterface } from "@/index";

export type MiddlewareUseOn =
	| Array<RouteInterface<string, any, any, any, any> | Controller>
	| RouteInterface<string, any, any, any, any>
	| Controller
	| "*";
