import type { MiddlewareHandler } from "@/Middleware/MiddlewareHandler";

export type MiddlewareStoreReturn = {
	inbound: MiddlewareHandler;
	outbound: MiddlewareHandler;
};
