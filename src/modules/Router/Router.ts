import type { AnyRoute } from "@/modules/Route/types/AnyRoute";
import type { HttpRequestInterface } from "@/modules/HttpRequest/HttpRequestInterface";
import type { MiddlewareOptions } from "@/modules/Middleware/types/MiddlewareOptions";
import type { RouteId } from "@/modules/Route/types/RouteId";
import type { AnyRouteModel } from "@/modules/Parser/types/AnyRouteModel";
import type { RouterInterface } from "@/modules/Router/RouterInterface";
import { RouteRegistry } from "@/modules/Registry/RouteRegistry";
import { MiddlewareRegistry } from "@/modules/Registry/MiddlewareRegistry";
import { ModelRegistry } from "@/modules/Registry/ModelRegistry";
import type { RouteRegistryData } from "@/modules/Registry/types/RouteRegistryData";
import type { ModelRegistryData } from "@/modules/Registry/types/ModelRegistryData";
import type { MiddlewareHandler } from "@/modules/Middleware/types/MiddlewareHandler";
import { Context } from "@/modules/Context/Context";
import { HttpResponse } from "@/modules/HttpResponse/HttpResponse";
import type { HttpResponseInterface } from "@/modules/HttpResponse/HttpResponseInterface";

export class Router implements RouterInterface {
	private cache = new WeakMap<
		HttpRequestInterface,
		() => Promise<HttpResponseInterface>
	>();

	getRouteHandler(
		req: HttpRequestInterface,
	): () => Promise<HttpResponseInterface> {
		const cached = this.cache.get(req);
		if (cached) {
			return cached;
		}

		const route = this.findRoute(req);
		const ctx = Context.makeFromRequest(req);
		const middleware = this.findMiddleware(route.id);
		const model = this.findModel(route.id);

		const handler = async () => {
			await middleware(ctx);
			await Context.appendParsedData(ctx, req, route.endpoint, model);
			const result = await route.handler(ctx);
			return result instanceof HttpResponse
				? result
				: new HttpResponse(result, { ...ctx.res });
		};

		this.cache.set(req, handler);
		return handler;
	}

	globalPrefix: string = "";

	setGlobalPrefix(value: string) {
		this.globalPrefix = value;
	}

	routeRegistryInstance: RouteRegistry | undefined;
	get routeRegistry(): RouteRegistry {
		if (!this.routeRegistryInstance) {
			this.routeRegistryInstance = new RouteRegistry();
		}
		return this.routeRegistryInstance;
	}
	getRouteList(): string {
		return this.routeRegistry.list();
	}
	addRoute(r: AnyRoute): void {
		return this.routeRegistry.add(r);
	}
	findRoute(req: HttpRequestInterface): RouteRegistryData {
		return this.routeRegistry.find(req);
	}

	middlewareRegistryInstance: MiddlewareRegistry | undefined;
	get middlewareRegistry(): MiddlewareRegistry {
		if (!this.middlewareRegistryInstance) {
			this.middlewareRegistryInstance = new MiddlewareRegistry();
		}
		return this.middlewareRegistryInstance;
	}
	addMiddleware(opts: MiddlewareOptions): void {
		return this.middlewareRegistry.add(opts);
	}
	findMiddleware(routeId: RouteId): MiddlewareHandler {
		if (!this.middlewareRegistryInstance) {
			return () => {};
		}
		return this.middlewareRegistry.find(routeId);
	}

	modelRegistryInstance: ModelRegistry | undefined;
	get modelRegistry(): ModelRegistry {
		if (!this.modelRegistryInstance) {
			this.modelRegistryInstance = new ModelRegistry();
		}
		return this.modelRegistryInstance;
	}
	addModel(routeId: RouteId, model: AnyRouteModel): void {
		return this.modelRegistry.add(routeId, model);
	}
	findModel(routeId: RouteId): ModelRegistryData | undefined {
		if (!this.modelRegistryInstance) {
			return undefined;
		}
		return this.modelRegistry.find(routeId);
	}
}
