import type { RouterData } from "@/Registry/RouterData";

export type RouterReturn = {
	route: RouterData;
	params: Record<string, string>;
};
