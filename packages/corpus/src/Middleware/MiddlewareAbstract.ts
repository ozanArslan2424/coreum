import { $registry } from "@/index";
import { MiddlewareVariant } from "@/Middleware/MiddlewareVariant";
import type { MiddlewareInterface } from "@/Middleware/MiddlwareInterface";
import type { MiddlewareHandler } from "@/Middleware/MiddlewareHandler";
import type { MiddlewareUseOn } from "@/Middleware/MiddlewareUseOn";

export abstract class MiddlewareAbstract implements MiddlewareInterface {
	variant: MiddlewareVariant = MiddlewareVariant.inbound;

	abstract useOn: MiddlewareUseOn;

	abstract handler: MiddlewareHandler;

	register(): void {
		$registry.middlewares.add(this);
	}
}
