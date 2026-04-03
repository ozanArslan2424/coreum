import type { Method } from "@/Core/CRequest/Method";
import type { SchemaValidator } from "@/Core/Model/SchemaValidator";
import type { RouteVariant } from "@/Core/Route/RouteVariant";
import type { RouteHandler } from "@/Core/Route/RouteHandler";

export type RouterData = {
	variant: RouteVariant;
	id: string;
	method: Method;
	endpoint: string;
	handler: RouteHandler<any, any, any, any>;
	model?: {
		body?: SchemaValidator<any>;
		search?: SchemaValidator<any>;
		params?: SchemaValidator<any>;
	};
};
