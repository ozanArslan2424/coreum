export type StaticScriptProps<Path extends string = string> =
	| { variant: "js"; path: Path; filePath: string }
	| { variant: "ts"; path: Path; filePath: string };
