import type { MiddlewareHandler } from "@/Middleware/MiddlewareHandler";

export type MiddlewareRegistryReturn = {
	inbound: MiddlewareHandler;
	outbound: MiddlewareHandler;
};
