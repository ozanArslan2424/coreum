import type { CssRule } from "@/modules/StaticRoute/types/CssRule";
import type { HtmlSkeleton } from "@/modules/StaticRoute/types/HtmlSkeleton";
import type { OrString } from "@/utils/OrString";

type BaseFileProps = { filePath: string };

export type StaticStyleProps =
	| ({ variant: "file" } & BaseFileProps)
	| { variant: "raw"; rules: CssRule[] };

export type StaticHtmlProps =
	| ({ variant: "file" } & BaseFileProps)
	| { variant: "raw"; skeleton: HtmlSkeleton };

export type StaticScriptProps =
	| { variant: "js"; filePath: string }
	| { variant: "ts"; filePath: string };

export type StaticRouteProps =
	| { extension: OrString<"html">; props: StaticHtmlProps }
	| { extension: "js"; props: StaticScriptProps }
	| { extension: "css"; props: StaticStyleProps };
