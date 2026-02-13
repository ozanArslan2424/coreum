import type { MiddlewareHandler } from "@/modules/Middleware/types/MiddlewareHandler";

export type ControllerOptions<Prefix extends string = string> = {
	prefix?: Prefix;
	beforeEach?: MiddlewareHandler;
};
