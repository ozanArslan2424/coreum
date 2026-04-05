import { readFileSync, writeFileSync } from "fs";
import { logFatal, type Log } from "@/Utils/log";

export function replaceListenCall(
	log: Log,
	mainPath: string,
	packagePath: string,
	tempPath: string,
	cliOverrides: {
		[k: string]: string | boolean | undefined;
	},
) {
	log.log(`📄 Reading main file: ${mainPath}`);
	const original = readFileSync(mainPath, "utf-8");

	const REPLACE_TARGET = /^\s*(void|await)?\s*\w+\.listen\(.*?\);.*$/m;
	if (!REPLACE_TARGET.test(original)) {
		logFatal(
			`Could not find a .listen() call in: ${mainPath}.\nThis CLI replaces the listen call in order to run the generator, please make sure to invoke listen at the end of your main entry function/file.`,
		);
	}

	const patched = original.replace(
		REPLACE_TARGET,
		`
import { Generator } from "@/CLI/Generator";
import { $registry } from "${packagePath}";
const generator = new Generator($registry.docs, ${JSON.stringify(cliOverrides)});
generator.readConfig();
await generator.generate();
`,
	);
	writeFileSync(tempPath, patched, "utf-8");
	log.log(`🔧 Patched file written: ${tempPath}`);
}
