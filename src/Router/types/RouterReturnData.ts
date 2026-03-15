import type { RouterRouteData } from "@/Router/types/RouterRouteData";

export type RouterReturnData = {
	route: RouterRouteData;
	params: Record<string, string>;
	search: Record<string, string>;
};
