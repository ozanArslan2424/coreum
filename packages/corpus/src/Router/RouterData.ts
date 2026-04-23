import type { BaseRouteHandler } from "@/BaseRoute/BaseRouteHandler";
import type { RouteVariant } from "@/BaseRoute/RouteVariant";
import type { Method } from "@/Method/Method";
import type { RouterDataModel } from "@/Router/RouterDataModel";

export type RouterData = {
	variant: RouteVariant;
	id: string;
	method: Method;
	endpoint: string;
	handler: BaseRouteHandler<any, any, any, any>;
	model?: RouterDataModel;
};
