import type { ValueOf } from "@/Utils/ValueOf";

export const MiddlewareVariant = {
	inbound: "inbound",
	outbound: "outbound",
} as const;

export type MiddlewareVariant = ValueOf<typeof MiddlewareVariant>;
