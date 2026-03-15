import { Context } from "@/Context/Context";
import type { CRequest } from "@/CRequest/CRequest";
import { CResponse } from "@/CResponse/CResponse";
import type { AnyRoute } from "@/Route/types/AnyRoute";
import type { Func } from "@/utils/types/Func";
import type { RouterAdapterInterface } from "@/Router/adapters/RouterAdapterInterface";
import { CorpusAdapter } from "@/Router/adapters/CorpusAdapter";
import type { Middleware } from "@/Middleware/Middleware";
import { ModelRegistry } from "@/Router/registries/ModelRegistry";
import { MiddlewareRegistry } from "@/Router/registries/MiddlewareRegistry";
import type { RouteId } from "@/Route/types/RouteId";

export class Router {
	constructor(private adapter: RouterAdapterInterface = new CorpusAdapter()) {}

	private modelRegistry = new ModelRegistry();
	private middlewareRegistry = new MiddlewareRegistry();
	private cache = new WeakMap<CRequest, Func<[Context], Promise<CResponse>>>();

	addMiddleware(middleware: Middleware): void {
		this.middlewareRegistry.add(middleware);
	}

	findMiddleware(id: RouteId | "*"): Func<[Context]> {
		return this.middlewareRegistry.find(id);
	}

	addRoute(route: AnyRoute): void {
		this.adapter.add({
			id: route.id,
			endpoint: route.endpoint,
			method: route.method,
			handler: route.handler,
			pattern: route.pattern,
			variant: route.variant,
		});
		if (route.model) {
			this.modelRegistry.add(route.id, route.model);
		}
	}

	findRouteHandler(req: CRequest): Func<[Context], Promise<CResponse>> | null {
		const match = this.adapter.find(req);
		if (!match) return null;
		const model = this.modelRegistry.find(match.route.id);
		const middleware = this.middlewareRegistry.find(match.route.id);
		const handler: Func<[Context], Promise<CResponse>> = async (ctx) => {
			await middleware(ctx);
			await Context.appendParsedData(
				ctx,
				req,
				match.params,
				match.search,
				model,
			);
			const result = await match.route.handler(ctx);
			return result instanceof CResponse
				? result
				: new CResponse(result, ctx.res);
		};
		this.cache.set(req, handler);
		return handler;
	}

	getRouteList(): Array<[string, string]> {
		return this.adapter.list().map((v) => [v.method, v.endpoint]);
	}
}
