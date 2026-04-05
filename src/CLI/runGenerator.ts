import { spawnSync } from "child_process";
import type { Log } from "@/Utils/log";

export function runGenerator(log: Log, tempPath: string) {
	log.log(`🚀 Running generator...`);
	const result = spawnSync("bun", ["run", tempPath], {
		stdio: "inherit",
		env: process.env,
	});

	if (result.status !== 0) {
		throw new Error(`bun exited with status ${result.status}`);
	}

	log.success(`Generator completed successfully`);
}
