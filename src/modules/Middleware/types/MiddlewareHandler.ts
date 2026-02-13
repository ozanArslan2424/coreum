import type { RouteContextInterface } from "@/modules/RouteContext/RouteContextInterface";
import type { MaybePromise } from "@/utils/MaybePromise";

export type MiddlewareHandler = (
	context: RouteContextInterface,
) => MaybePromise<RouteContextInterface | void>;
