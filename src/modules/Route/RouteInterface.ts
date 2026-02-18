import type { RouteHandler } from "@/modules/Route/types/RouteHandler";
import type { RouteId } from "@/modules/Route/types/RouteId";
import type { RouteModel } from "@/modules/Parser/types/RouteSchemas";
import type { Method } from "@/modules/HttpRequest/enums/Method";
import type { RouteVariant } from "@/modules/Route/enums/RouteVariant";

export interface RouteInterface<
	Path extends string = string,
	R = unknown,
	B = unknown,
	S = unknown,
	P = unknown,
> {
	id: RouteId;
	variant: RouteVariant;
	method: Method;
	endpoint: Path;
	pattern: RegExp;
	model?: RouteModel<R, B, S, P>;
	handler: RouteHandler<R, B, S, P>;
}
