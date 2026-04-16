import type { MiddlewareHandler } from "@/Middleware/MiddlewareHandler";
import type { MiddlewareUseOn } from "@/Middleware/MiddlewareUseOn";
import type { MiddlewareVariant } from "@/Middleware/MiddlewareVariant";

export type MiddlewareOptions = {
	variant?: MiddlewareVariant;
	useOn?: MiddlewareUseOn;
	handler: MiddlewareHandler;
};
