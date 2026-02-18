import type { StaticHtmlProps } from "@/modules/StaticRoute/types/StaticHtmlProps";
import type { StaticScriptProps } from "@/modules/StaticRoute/types/StaticScriptProps";
import type { StaticStyleProps } from "@/modules/StaticRoute/types/StaticStyleProps";

export type StaticRouteOptions<Path extends string = string> =
	| { extension: "html"; props: StaticHtmlProps<Path> }
	| { extension: "js"; props: StaticScriptProps<Path> }
	| { extension: "css"; props: StaticStyleProps<Path> };
