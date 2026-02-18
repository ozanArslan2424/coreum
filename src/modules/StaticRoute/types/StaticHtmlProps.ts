import type { HtmlSkeleton } from "@/modules/StaticRoute/types/HtmlSkeleton";

export type StaticHtmlProps<Path extends string = string> =
	| { variant: "raw"; path: Path; skeleton: HtmlSkeleton }
	| { variant: "file"; path: Path; filePath: string };
