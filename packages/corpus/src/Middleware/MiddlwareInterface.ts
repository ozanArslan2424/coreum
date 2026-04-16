import type { MiddlewareHandler } from "@/Middleware/MiddlewareHandler";
import type { MiddlewareUseOn } from "@/Middleware/MiddlewareUseOn";
import type { MiddlewareVariant } from "@/Middleware/MiddlewareVariant";

export interface MiddlewareInterface {
	useOn: MiddlewareUseOn;
	variant: MiddlewareVariant;
	handler: MiddlewareHandler;
	register(): void;
}
