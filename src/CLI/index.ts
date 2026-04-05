import { parseArgs } from "util";
import { readFileSync, writeFileSync, unlinkSync } from "fs";
import { resolve } from "path";
import { spawnSync } from "child_process";
import { log, logFatal } from "@/Utils/log";

const { values } = parseArgs({
	args: process.argv.slice(2),
	options: {
		main: { type: "string", short: "m" },
		package: { type: "string", short: "p" },
	},
});

if (!values.main) {
	logFatal("Error: --main / -m is required");
}

if (!values.package) {
	values.package = "@ozanarslan/corpus";
}

const REPLACE_TARGET = /^\s*(void|await)?\s*\w+\.listen\(.*?\);.*$/m;
const REPLACEMENT = (packagePath: string) =>
	`
import { X, $registry } from "${packagePath}";
const generator = new X.Generator($registry.docs);
generator.readConfig();
generator.generate();
`.trim();

const resolved = resolve(values.main);
log.log(`📄 Reading main file: ${resolved}`);
const original = readFileSync(resolved, "utf-8");

if (!REPLACE_TARGET.test(original)) {
	logFatal(
		`Could not find a .listen() call in: ${resolved}.\nThis CLI replaces the listen call in order to run the generator, please make sure to invoke listen at the end of your main entry function/file.`,
	);
}

const patched = original.replace(REPLACE_TARGET, REPLACEMENT(values.package));
const tempPath = resolved.replace(/\.ts$/, ".gen.ts");
writeFileSync(tempPath, patched, "utf-8");
log.log(`🔧 Patched file written: ${tempPath}`);

try {
	log.log(`🚀 Running generator...`);
	const result = spawnSync("bun", ["run", tempPath], {
		stdio: "inherit",
		env: process.env,
	});

	if (result.status !== 0) {
		logFatal(`bun exited with status ${result.status}`);
	}

	log.success(`Generator completed successfully`);
} finally {
	unlinkSync(tempPath);
	log.log(`🧹 Temp file cleaned up: ${tempPath}`);
}
