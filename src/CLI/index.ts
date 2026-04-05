import { unlinkSync } from "fs";
import { log as _log, logFatal } from "@/Utils/log";
import { getVariables } from "@/CLI/getVariables";
import { replaceListenCall } from "@/CLI/replaceListenCall";
import { runGenerator } from "@/CLI/runGenerator";

const { mainPath, packagePath, tempPath, cliOverrides, silent } =
	getVariables();
const log = silent ? _log.noop : _log;

try {
	replaceListenCall(log, mainPath, packagePath, tempPath, cliOverrides);
	runGenerator(log, tempPath);
} catch (err) {
	logFatal((err as Error).message);
} finally {
	unlinkSync(tempPath);
	log.log(`🧹 Temp file cleaned up: ${tempPath}`);
}
