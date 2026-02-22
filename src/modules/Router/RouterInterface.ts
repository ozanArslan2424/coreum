import type { HttpRequestInterface } from "@/modules/HttpRequest/HttpRequestInterface";
import type { HttpResponseInterface } from "@/modules/HttpResponse/HttpResponseInterface";
import type { MiddlewareHandler } from "@/modules/Middleware/types/MiddlewareHandler";
import type { MiddlewareOptions } from "@/modules/Middleware/types/MiddlewareOptions";
import type { AnyRouteModel } from "@/modules/Parser/types/AnyRouteModel";
import type { MiddlewareRegistry } from "@/modules/Registry/MiddlewareRegistry";
import type { ModelRegistry } from "@/modules/Registry/ModelRegistry";
import type { RouteRegistry } from "@/modules/Registry/RouteRegistry";
import type { ModelRegistryData } from "@/modules/Registry/types/ModelRegistryData";
import type { RouteRegistryData } from "@/modules/Registry/types/RouteRegistryData";
import type { AnyRoute } from "@/modules/Route/types/AnyRoute";
import type { RouteId } from "@/modules/Route/types/RouteId";

export interface RouterInterface {
	globalPrefix: string;
	setGlobalPrefix(value: string): void;
	getRouteHandler(
		req: HttpRequestInterface,
	): () => Promise<HttpResponseInterface>;

	// TODO: Caching for  routes
	routeRegistryInstance: RouteRegistry | undefined;
	get routeRegistry(): RouteRegistry;
	getRouteList(): string;
	addRoute(r: AnyRoute): void;
	findRoute(req: HttpRequestInterface): RouteRegistryData;

	middlewareRegistryInstance: MiddlewareRegistry | undefined;
	get middlewareRegistry(): MiddlewareRegistry;
	addMiddleware(opts: MiddlewareOptions): void;
	findMiddleware(routeId: RouteId): MiddlewareHandler;

	modelRegistryInstance: ModelRegistry | undefined;
	get modelRegistry(): ModelRegistry;
	addModel(routeId: RouteId, model?: AnyRouteModel): void;
	findModel(routeId: RouteId): ModelRegistryData | undefined;
}
