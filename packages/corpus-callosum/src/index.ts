import { generateApiClient } from "./generateApiClient";
import { initialize } from "./initialize";
import { getResolvedConfig } from "./getResolvedConfig";

const { action, config } = getResolvedConfig();

if (action === "api") {
	await generateApiClient(config);
	process.exit(0);
}

if (action === "init") {
	await initialize(config);
	process.exit(0);
}
