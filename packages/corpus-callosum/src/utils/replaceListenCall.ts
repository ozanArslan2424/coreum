import { logFatal } from "corpus-utils/internalLog";
import { readFileSync, writeFileSync } from "fs";

export function replaceListenCall(mainPath: string, replacement: string) {
	console.log(`📄 Reading main file: ${mainPath}`);

	const mainFileContents = readFileSync(mainPath, "utf-8");

	const REPLACE_TARGET = /^(void|await)?\s*\w+\.listen\(.*?\);.*$/m;
	if (!REPLACE_TARGET.test(mainFileContents)) {
		logFatal(
			`⚠️  Could not find a .listen() call in: ${mainPath}.\n   Make sure your entry file calls .listen() either at the top level or inside a function.`,
		);
	}

	const patched = mainFileContents.replace(REPLACE_TARGET, replacement);

	writeFileSync(mainPath, patched, "utf-8");

	console.log(`🔧 Patched file written: ${mainPath}`);
}
