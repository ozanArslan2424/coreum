import type { Config } from "./Config";

export function getDefaultConfig(): Config {
	return {
		silent: false,
		main: "./src/main.ts",
		pkgPath: "@ozanarslan/corpus",
		casing: "pascal",
		dbFilePath: null,
		validationLibrary: null,
		packageManager: "bun",

		apiClientGenerator: {
			output: "./src/corpus.gen.ts",
			exportRoutesAs: "individual",
			exportClientAs: "CorpusApi",
			// Default targets arktype. The `fallback: ctx => ctx.base` strategy silently
			// drops any unsupported constraint and keeps the rest of the schema intact,
			// which is the least-surprising behaviour for codegen purposes.
			jsonSchemaOptions: {
				fallback: (ctx: any) => ctx.base,
			},
		},
	};
}
