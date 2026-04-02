import type { Method } from "@/CRequest/enums/Method";
import type { SchemaValidator } from "@/Model/types/SchemaValidator";
import type { RouteVariant } from "@/Route/enums/RouteVariant";
import type { RouteHandler } from "@/Route/types/RouteHandler";

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
