import { $routerStore } from "@/index";
import { MiddlewareAbstract } from "@/Middleware/MiddlewareAbstract";
import type { MiddlewareHandler } from "@/Middleware/types/MiddlewareHandler";
import type { MiddlewareOptions } from "@/Middleware/types/MiddlewareOptions";
import type { MiddlewareUseOn } from "@/Middleware/types/MiddlewareUseOn";

/**
 * Simple middleware that runs before the Route "callback" parameters.
 * Manipulates context.
 * */

export class Middleware extends MiddlewareAbstract {
	constructor(opts: MiddlewareOptions) {
		super();
		this.useOn = opts.useOn;
		this.handler = opts.handler;
		$routerStore.get().addMiddleware(this);
	}

	useOn: MiddlewareUseOn;
	handler: MiddlewareHandler;
}
