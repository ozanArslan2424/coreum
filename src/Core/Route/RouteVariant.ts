import type { ValueOf } from "@/Utils/types/ValueOf";

export const RouteVariant = {
	static: "static",
	dynamic: "dynamic",
	websocket: "websocket",
} as const;

export type RouteVariant = ValueOf<typeof RouteVariant>;
