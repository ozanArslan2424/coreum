import type { RouteContextInterface } from "@/modules/RouteContext/RouteContextInterface";
import type { MaybePromise } from "@/utils/MaybePromise";

export type RouteHandler<R = unknown, B = unknown, S = unknown, P = unknown> = (
	context: RouteContextInterface<R, B, S, P>,
) => MaybePromise<R>;
