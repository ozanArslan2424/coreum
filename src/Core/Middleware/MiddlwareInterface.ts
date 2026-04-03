import type { MiddlewareVariant } from "@/Core/Middleware/MiddlewareVariant";
import type { MiddlewareHandler } from "@/Core/Middleware/MiddlewareHandler";
import type { MiddlewareUseOn } from "@/Core/Middleware/MiddlewareUseOn";

export interface MiddlewareInterface {
	useOn: MiddlewareUseOn;
	variant: MiddlewareVariant;
	handler: MiddlewareHandler;
	register(): void;
}
