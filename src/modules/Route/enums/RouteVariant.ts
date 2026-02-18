import type { ValueOf } from "@/utils/ValueOf";

export const RouteVariant = {
	static: "static",
	dynamic: "dynamic",
} as const;

export type RouteVariant = ValueOf<typeof RouteVariant>;
