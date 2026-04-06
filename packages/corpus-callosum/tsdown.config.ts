import { defineConfig } from "tsdown";

export default defineConfig({
	entry: ["src/**/*.ts"],
	outDir: "dist",
	format: ["esm"],
	dts: true,
	clean: true,
	minify: true,
	sourcemap: true,
	exports: true,
	deps: {
		alwaysBundle: ["corpus-utils"],
	},
});
