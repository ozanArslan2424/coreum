import type { AnyRoute } from "@/modules/Route/types/AnyRoute";

export type RegisteredRouteData = Pick<
	AnyRoute,
	"id" | "endpoint" | "method" | "pattern" | "handler"
>;
