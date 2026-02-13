import type { RouteHandler } from "@/modules/Route/types/RouteHandler";
import type { RouteId } from "@/modules/Route/types/RouteId";
import type { RouteSchemas } from "@/modules/Parser/types/RouteSchemas";
import type { Method } from "@/modules/HttpRequest/enums/Method";

export interface RouteInterface<
	Path extends string = string,
	R = unknown,
	B = unknown,
	S = unknown,
	P = unknown,
> {
	handler: RouteHandler<R, B, S, P>;
	readonly schemas?: RouteSchemas<R, B, S, P>;
	controllerId?: string;
	get path(): Path;
	get method(): Method;
	get pattern(): RegExp;
	get id(): RouteId;
}
