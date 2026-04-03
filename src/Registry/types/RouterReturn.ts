import type { RouterData } from "@/Registry/types/RouterData";

export type RouterReturn = {
	route: RouterData;
	params: Record<string, string>;
	search: Record<string, string>;
};
