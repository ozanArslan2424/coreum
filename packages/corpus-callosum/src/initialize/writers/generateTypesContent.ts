export function generateTypesContent(databaseImportPath: string) {
	const lines: string[] = [];

	lines.push(
		`import "@ozanarslan/corpus";`,
		`import type { DatabaseClient } from "${databaseImportPath}";`,
		``,
		`declare module "@ozanarslan/corpus" {`,
		`	interface DatabaseClientInterface extends DatabaseClient {}`,
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

	return lines.join("\n");
}
