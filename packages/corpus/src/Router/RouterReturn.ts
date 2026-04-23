import type { RouterData } from "@/Router/RouterData";

export type RouterReturn = {
	route: RouterData;
	params: Record<string, string>;
};
