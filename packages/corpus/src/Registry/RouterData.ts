import type { SchemaValidator } from "corpus-utils/Schema";

import type { BaseRouteHandler } from "@/BaseRoute/BaseRouteHandler";
import type { RouteVariant } from "@/BaseRoute/RouteVariant";
import type { Method } from "@/Method/Method";

export type RouterData = {
	variant: RouteVariant;
	id: string;
	method: Method;
	endpoint: string;
	handler: BaseRouteHandler<any, any, any, any>;
	model?: {
		body?: SchemaValidator<any>;
		search?: SchemaValidator<any>;
		params?: SchemaValidator<any>;
	};
};
