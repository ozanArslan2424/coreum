import type { ControllerInterface } from "@/modules/Controller/ControllerInterface";
import type { MiddlewareInterface } from "@/modules/Middleware/MiddlewareInterface";
import { Route } from "@/modules/Route/Route";
import { ControllerAbstract } from "@/modules/Controller/ControllerAbstract";
import type { MiddlewareHandler } from "@/modules/Middleware/types/MiddlewareHandler";
import type { AnyRoute } from "@/modules/Route/types/AnyRoute";
import { getServerInstance } from "@/modules/Server/ServerInstance";

export abstract class MiddlewareAbstract implements MiddlewareInterface {
	constructor(private readonly callback: MiddlewareHandler) {}

	use(): void;
	use(controller: ControllerInterface): ControllerInterface;
	use(route: AnyRoute): AnyRoute;
	use(
		input?: ControllerInterface | AnyRoute,
	): ControllerInterface | AnyRoute | void {
		if (input instanceof ControllerAbstract) {
			return this.useOnController(input);
		}
		if (input instanceof Route) {
			return this.useOnRoute(input);
		}
		return this.useGlobally();
	}

	useGlobally(): void {
		getServerInstance()
			.router.getRoutes()
			.forEach((route) => {
				this.useOnRoute(route);
			});
	}

	useOnController(controller: ControllerInterface): ControllerInterface {
		const controllerRoutes = getServerInstance().router.getControllerRoutes(
			controller.id,
		);
		for (const route of controllerRoutes) {
			this.useOnRoute(route);
		}
		return controller;
	}

	useOnRoute(route: AnyRoute): AnyRoute {
		const originalHandler = route.handler;
		route.handler = async (ctx) => {
			await this.callback(ctx);
			return await originalHandler(ctx);
		};
		getServerInstance().router.updateRoute(route);
		return route;
	}
}
