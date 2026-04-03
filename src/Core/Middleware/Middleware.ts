import { MiddlewareVariant } from "@/Core/Middleware/MiddlewareVariant";
import { MiddlewareAbstract } from "@/Core/Middleware/MiddlewareAbstract";
import type { MiddlewareOptions } from "@/Core/Middleware/MiddlewareOptions";

/**
 * Simple Middleware registration class.
 * variant = "inbound" runs before route handlers
 * variant = "outbound" runs after route handlers
 * Both variants manipulate the context and can return CResponse or void.
 */

export class Middleware extends MiddlewareAbstract {
	constructor(opts: MiddlewareOptions) {
		super();
		this.variant = opts.variant ?? MiddlewareVariant.inbound;
		if (opts.useOn) {
			this.useOn = opts.useOn;
		}
		if (opts.handler) {
			this.handler = opts.handler;
		}
		this.register();
	}

	readonly useOn: Required<MiddlewareOptions>["useOn"] = "*";
	readonly handler: Required<MiddlewareOptions>["handler"] = () => {};
}
