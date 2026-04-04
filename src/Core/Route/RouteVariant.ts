import type { ValueOf } from "@/Utils/ValueOf";

export const RouteVariant = {
	static: "static",
	dynamic: "dynamic",
	websocket: "websocket",
} as const;

export type RouteVariant = ValueOf<typeof RouteVariant>;
