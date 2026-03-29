import { log } from "@/utils/internalLogger";
import type { BuildConfig } from "bun";
import dts from "bun-plugin-dts";

async function build() {
	try {
		await Bun.$`rm -rf ./dist`.quiet();
		log.log("🧹 Cleaned ./dist folder");
	} catch {
		log.warn("⚠️  Could not clean ./dist folder (might not exist yet)");
	}

	const defaultBuildConfig: BuildConfig = {
		entrypoints: ["./src/index.ts"],
		outdir: "./dist",
		target: "bun",
	};

	const [esm, cjs] = await Promise.all([
		Bun.build({
			...defaultBuildConfig,
			plugins: [
				dts({
					compilationOptions: {
						preferredConfigPath: "./tsconfig.build.json",
					},
				}),
			],
			format: "esm",
			naming: "[dir]/[name].js",
		}),
		Bun.build({
			...defaultBuildConfig,
			format: "cjs",
			naming: "[dir]/[name].cjs",
		}),
	]);

	if (!esm.success) esm.logs.forEach((l) => console.error(l));
	if (!cjs.success) cjs.logs.forEach((l) => console.error(l));
	if (!esm.success || !cjs.success) process.exit(1);
}

const start = performance.now();

await build();

const end = performance.now();
const startup = end - start;
log.log(`🚀 build function took ${startup.toFixed(2)}ms`);
