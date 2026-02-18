import type { CssRule } from "@/modules/StaticRoute/types/CssRule";

export type StaticStyleProps<Path extends string = string> =
	| { variant: "file"; path: Path; filePath: string }
	| { variant: "raw"; path: Path; rules: CssRule[] };
