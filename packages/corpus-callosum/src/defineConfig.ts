import type { Config, PartialConfig } from "./Config";
import { getDefaultConfig } from "./getDefaultConfig";

export function defineConfig(config: PartialConfig): Config {
	const defaultConfig = getDefaultConfig();
	return {
		...defaultConfig,
		...config,
		apiClientGenerator: {
			...defaultConfig.apiClientGenerator,
			...config.apiClientGenerator,
		},
	};
}
