import type { Config } from "../Config/Config";
import type { ImportableInterface } from "../Importable/ImportableInterface";
import { Writer } from "../Writer/Writer";

export function writesTypesFile(
	config: Config,
	typesFilePath: string,
	database: ImportableInterface,
) {
	const w = new Writer(typesFilePath);

	w.line(
		`import "${config.pkgPath}";`,
		`import type { ${database.name} } from "${database.import(typesFilePath)}";`,
		``,
		`declare module "${config.pkgPath}" {`,
		`	interface DatabaseClientInterface extends ${database.name} {}`,
		``,
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
