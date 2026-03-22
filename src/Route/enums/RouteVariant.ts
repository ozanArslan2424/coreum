import type { ValueOf } from "@/utils/types/ValueOf";

export const RouteVariant = {
	static: "static",
	dynamic: "dynamic",
	websocket: "websocket",
} as const;

export type RouteVariant = ValueOf<typeof RouteVariant>;
