import type { MiddlewareHandler } from "@/Middleware/types/MiddlewareHandler";

export type MiddlewareRegistryReturn = {
	inbound: MiddlewareHandler;
	outbound: MiddlewareHandler;
};
