import type { RouterRouteData } from "@/Router/types/RouterRouteData";

export interface RouterAdapterInterface {
	add(method: string, path: string, store: RouterRouteData): void;
	find(
		method: string,
		path: string,
	): {
		store: RouterRouteData;
		params?: Record<string, unknown>;
	} | null;
	getRouteList(): Array<[string, string]>;
}
