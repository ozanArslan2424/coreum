import type { CssValue } from "@/modules/StaticRoute/types/CssValue";

export interface NestedCssProperties {
	[key: string]: CssValue | NestedCssProperties;
}
