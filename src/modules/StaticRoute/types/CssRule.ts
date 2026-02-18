import type { CssProperties } from "@/modules/StaticRoute/types/CssProperties";
import type { Keyframes } from "@/modules/StaticRoute/types/Keyframes";
import type { MediaQuery } from "@/modules/StaticRoute/types/MediaQuery";

export interface CssRule {
	selector: string;
	properties: CssProperties;
	mediaQueries?: MediaQuery[];
	pseudoClasses?: {
		hover?: CssProperties;
		active?: CssProperties;
		focus?: CssProperties;
		visited?: CssProperties;
		disabled?: CssProperties;
		checked?: CssProperties;
		[key: string]: CssProperties | undefined;
	};
	pseudoElements?: {
		before?: CssProperties;
		after?: CssProperties;
		placeholder?: CssProperties;
		selection?: CssProperties;
		[key: string]: CssProperties | undefined;
	};
	keyframes?: {
		[name: string]: Keyframes;
	};
}
