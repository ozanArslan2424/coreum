import type { Config } from "../config";
import { TypescriptWriter } from "../TypescriptWriter/TypescriptWriter";

export function writesTypesFile(config: Config, typesFilePath: string) {
	const w = new TypescriptWriter(typesFilePath);

	w.line(
		`import "${config.pkgPath}";`,
		``,
		`declare module "${config.pkgPath}" {`,
		`	interface Env {`,
		`		PORT: string;`,
		`		CLIENT_URL: string;`,
		`	}`,
		``,
		`	interface ContextDataInterface {}`,
		`}`,
		``,
		`export {};`,
	);

	return w.read();
}
