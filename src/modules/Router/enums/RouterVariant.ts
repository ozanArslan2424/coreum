import type { ValueOf } from "@/utils/ValueOf";

export const RouterVariant = {
	array: "array",
	object: "object",
	map: "map",
} as const;

export type RouterVariant = ValueOf<typeof RouterVariant>;
