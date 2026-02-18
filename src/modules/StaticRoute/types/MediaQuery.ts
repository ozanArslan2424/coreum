import type { CssProperties } from "@/modules/StaticRoute/types/CssProperties";

export interface MediaQuery {
	condition: string;
	rules: CssProperties;
}
