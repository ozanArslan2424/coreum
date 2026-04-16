import type { Func } from "corpus-utils/Func";
import { joinPathSegments } from "corpus-utils/joinPathSegments";
import type { MaybePromise } from "corpus-utils/MaybePromise";

import type { Context } from "@/Context/Context";
import { Method } from "@/CRequest/Method";
import type { DynamicRouteCallback } from "@/DynamicRoute/DynamicRouteCallback";
import type { DynamicRouteDefinition } from "@/DynamicRoute/DynamicRouteDefinition";
import { $registry } from "@/index";
import { RouteAbstract } from "@/Route/RouteAbstract";
import { RouteVariant } from "@/Route/RouteVariant";

export abstract class DynamicRouteAbstract<
	B = unknown,
	S = unknown,
	P = unknown,
	R = unknown,
	E extends string = string,
> extends RouteAbstract<B, S, P, R, E> {
	// FROM CONSTRUCTOR
	abstract readonly definition: DynamicRouteDefinition<E>;

	abstract callback: DynamicRouteCallback<B, S, P, R>;

	// BASE ROUTE PROPERTIES
	readonly variant: RouteVariant = RouteVariant.dynamic;

	get endpoint(): E {
		return joinPathSegments(
			$registry.prefix,
			typeof this.definition === "string" ? this.definition : this.definition.path,
		);
	}

	get method(): Method {
		return typeof this.definition === "string" ? Method.GET : this.definition.method;
	}

	get handler(): Func<[Context<B, S, P, R>], MaybePromise<R>> {
		return this.callback;
	}
}
