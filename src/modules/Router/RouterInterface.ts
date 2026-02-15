import type { AnyRoute } from "@/modules/Route/types/AnyRoute";

export interface RouterInterface {
	globalPrefix: string;
	add(route: AnyRoute): void;
	find(url: string, method: string): AnyRoute;
	listRoutes(): Array<AnyRoute>;
	update(route: AnyRoute): void;
}
