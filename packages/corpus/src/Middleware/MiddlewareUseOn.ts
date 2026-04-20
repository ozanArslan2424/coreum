import type { BaseRouteAbstract } from "@/BaseRoute/BaseRouteAbstract";
import type { Controller } from "@/Controller/Controller";

export type MiddlewareUseOn =
	| Array<BaseRouteAbstract<any, any, any, any, string> | Controller | string>
	| BaseRouteAbstract<any, any, any, any, string>
	| Controller
	| "*";
