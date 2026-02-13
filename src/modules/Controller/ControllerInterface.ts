import type { RouteInterface } from "@/modules/Route/RouteInterface";
import type { RouteHandler } from "@/modules/Route/types/RouteHandler";
import type { RouteDefinition } from "@/modules/Route/types/RouteDefinition";
import type { RouteSchemas } from "@/modules/Parser/types/RouteSchemas";

export interface ControllerInterface {
	get id(): string;
	get prefix(): string | undefined;
	route<
		Path extends string = string,
		R = unknown,
		B = unknown,
		S = unknown,
		P = unknown,
	>(
		definition: RouteDefinition<Path>,
		callback: RouteHandler<R, B, S, P>,
		schemas?: RouteSchemas<R, B, S, P>,
	): RouteInterface<Path, R, B, S, P>;
}
