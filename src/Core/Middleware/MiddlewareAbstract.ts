import { $registry } from "@/index";
import { MiddlewareVariant } from "@/Core/Middleware/MiddlewareVariant";
import type { MiddlewareInterface } from "@/Core/Middleware/MiddlwareInterface";
import type { MiddlewareHandler } from "@/Core/Middleware/MiddlewareHandler";
import type { MiddlewareUseOn } from "@/Core/Middleware/MiddlewareUseOn";

export abstract class MiddlewareAbstract implements MiddlewareInterface {
	variant: MiddlewareVariant = MiddlewareVariant.inbound;

	abstract useOn: MiddlewareUseOn;

	abstract handler: MiddlewareHandler;

	register(): void {
		$registry.middlewares.add(this);
	}
}
