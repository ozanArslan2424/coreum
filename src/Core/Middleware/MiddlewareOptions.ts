import type { MiddlewareVariant } from "@/Core/Middleware/MiddlewareVariant";
import type { MiddlewareHandler } from "@/Core/Middleware/MiddlewareHandler";
import type { MiddlewareUseOn } from "@/Core/Middleware/MiddlewareUseOn";

export type MiddlewareOptions = {
	variant?: MiddlewareVariant;
	useOn?: MiddlewareUseOn;
	handler?: MiddlewareHandler;
};
