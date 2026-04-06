import type { MiddlewareVariant } from "@/Middleware/MiddlewareVariant";
import type { MiddlewareHandler } from "@/Middleware/MiddlewareHandler";
import type { MiddlewareUseOn } from "@/Middleware/MiddlewareUseOn";

export interface MiddlewareInterface {
	useOn: MiddlewareUseOn;
	variant: MiddlewareVariant;
	handler: MiddlewareHandler;
	register(): void;
}
