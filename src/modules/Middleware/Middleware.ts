import { MiddlewareAbstract } from "@/modules/Middleware/MiddlewareAbstract";
import type { MiddlewareInterface } from "@/modules/Middleware/MiddlewareInterface";

/**
 * Simple middleware that runs before the Route "callback" parameters.
 * Manipulates context.
 * */

export class Middleware
	extends MiddlewareAbstract
	implements MiddlewareInterface {}
