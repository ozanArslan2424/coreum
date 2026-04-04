import type { Context } from "@/Core/Context/Context";
import { Method } from "@/Core/CRequest/Method";
import { RouteVariant } from "@/Core/Route/RouteVariant";
import { RouteAbstract } from "@/Core/Route/RouteAbstract";
import type { DynamicRouteCallback } from "@/Core/Route/DynamicRouteCallback";
import type { DynamicRouteDefinition } from "@/Core/Route/DynamicRouteDefinition";
import { $registry } from "@/index";
import { joinPathSegments } from "@/Utils/joinPathSegments";
import type { Func } from "@/Utils/Func";
import type { MaybePromise } from "@/Utils/MaybePromise";

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
			typeof this.definition === "string"
				? this.definition
				: this.definition.path,
		);
	}

	get method(): Method {
		return typeof this.definition === "string"
			? Method.GET
			: this.definition.method;
	}

	get handler(): Func<[Context<B, S, P, R>], MaybePromise<R>> {
		return this.callback;
	}
}
