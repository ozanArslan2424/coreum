import type { MiddlewareHandler } from "@/Core/Middleware/MiddlewareHandler";

export type MiddlewareRegistryReturn = {
	inbound: MiddlewareHandler;
	outbound: MiddlewareHandler;
};
