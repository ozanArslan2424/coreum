import { Method } from "@/CRequest/enums/Method";
import { RouteAbstract } from "@/Route/RouteAbstract";
import type { DynamicRouteDefinition } from "@/DynamicRoute/types/DynamicRouteDefinition";
import { joinPathSegments } from "@/utils/joinPathSegments";
import { $prefixStore } from "@/index";
import { RouteVariant } from "@/Route/enums/RouteVariant";

export abstract class DynamicRouteAbstract<
	Path extends string = string,
	B = unknown,
	S = unknown,
	P = unknown,
	R = unknown,
> extends RouteAbstract<Path, B, S, P, R> {
	variant: RouteVariant = RouteVariant.dynamic;

	protected resolveEndpoint(definition: DynamicRouteDefinition<Path>): Path {
		return joinPathSegments(
			$prefixStore.get(),
			typeof definition === "string" ? definition : definition.path,
		);
	}

	protected resolveMethod(definition: DynamicRouteDefinition<Path>): Method {
		return typeof definition === "string" ? Method.GET : definition.method;
	}
}
