import type { RouterData } from "@/Core/Registry/RouterData";

export type RouterReturn = {
	route: RouterData;
	params: Record<string, string>;
	search: Record<string, string>;
};
