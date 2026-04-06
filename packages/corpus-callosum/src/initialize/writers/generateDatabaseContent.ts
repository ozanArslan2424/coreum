export function generateDatabaseContent(name: string, modelImportPath: string) {
	return `import type { ${name}Type } from "${modelImportPath}";

export class DatabaseClient {
	examples: Map<string, ${name}Type["entity"]> = new Map();
}`;
}
