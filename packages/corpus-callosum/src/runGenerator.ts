import { spawnSync } from "child_process";

export function runGenerator(tempPath: string) {
	console.log(`🚀 Running generator...`);
	const result = spawnSync("bun", ["run", tempPath], {
		stdio: "inherit",
		env: process.env,
	});

	if (result.status !== 0) {
		throw new Error(`bun exited with status ${result.status}`);
	}

	console.log(`Generator completed successfully`);
}
