import type { MiddlewareHandler } from "@/Middleware/types/MiddlewareHandler";
import type { MiddlewareUseOn } from "@/Middleware/types/MiddlewareUseOn";

export abstract class MiddlewareAbstract {
	abstract useOn: MiddlewareUseOn;
	abstract handler: MiddlewareHandler;
}
