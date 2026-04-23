import type { MiddlewareInterface } from "@/Middleware/MiddlewareInterface";
import type { RequestHandler } from "@/Server/RequestHandler";

export interface XCorsInterface extends MiddlewareInterface {
	/** Preflight handler for OPTIONS requests. */
	getPreflightHandler(): RequestHandler;
}
