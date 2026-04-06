import { readFileSync, writeFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import { hoistFunctionBody } from "./hoistFunctionBody";
import { logFatal } from "./logFatal";

export function replaceListenCall(
	distGeneratorFile: string,
	mainPath: string,
	packagePath: string,
	tempPath: string,
	cliOverrides: {
		[k: string]: string | boolean | undefined;
	},
) {
	const lines: string[] = [`import { $registry } from "${packagePath}";`];
	const __dirname = dirname(fileURLToPath(import.meta.url));
	const generatorPath = join(__dirname, distGeneratorFile);
	lines.push(`import { Generator } from "${generatorPath}";`);
	console.log(`📄 Reading main file: ${mainPath}`);
	const mainFileContents = readFileSync(mainPath, "utf-8");
	const REPLACE_TARGET = /^(void|await)?\s*\w+\.listen\(.*?\);.*$/m;

	const processedContents = hoistFunctionBody(mainFileContents);

	if (!REPLACE_TARGET.test(processedContents)) {
		logFatal(
			`⚠️  Could not find a .listen() call in: ${mainPath}.\n   Make sure your entry file calls .listen() either at the top level or inside a function.`,
		);
	}

	const replacement = [
		`const generator = new Generator($registry.docs, ${JSON.stringify(cliOverrides)});`,
		`generator.readConfig();`,
		`await generator.generate();`,
	].join("\n");

	const patched = processedContents.replace(REPLACE_TARGET, replacement);
	lines.push(patched);
	writeFileSync(tempPath, lines.join("\n"), "utf-8");
	console.log(`🔧 Patched file written: ${tempPath}`);
}
