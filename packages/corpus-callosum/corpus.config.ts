import { defineConfig } from "./src/defineConfig";

export default defineConfig({
	main: "./src/main.ts",
	pkgPath: "@ozanarslan/corpus",
	silent: false,
	validationLibrary: null,
	packageManager: "bun",
	casing: "pascal",
	dbFilePath: null,

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
});
