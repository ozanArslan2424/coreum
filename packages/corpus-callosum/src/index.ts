import { unlinkSync } from "fs";
import { getVariables } from "./getVariables";
import { replaceListenCall } from "./replaceListenCall";
import { runGenerator } from "./runGenerator";

const distGeneratorFile = "Generator.mjs";

const { mainPath, packagePath, tempPath, cliOverrides, silent } =
	getVariables();

if (silent) {
	console.log = () => {};
	console.error = () => {};
	console.warn = () => {};
}

try {
	replaceListenCall(
		distGeneratorFile,
		mainPath,
		packagePath,
		tempPath,
		cliOverrides,
	);
	runGenerator(tempPath);
} catch (err) {
	console.error((err as Error).message);
	process.exit(1);
} finally {
	unlinkSync(tempPath);
	console.log(`🧹 Temp file cleaned up: ${tempPath}`);
}
