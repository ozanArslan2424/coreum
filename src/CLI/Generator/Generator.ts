import { defaultGeneratorConfig } from "./defaultGeneratorConfig";
import type { GeneratorConfig } from "./GeneratorConfig";
import { existsSync, mkdirSync, writeFileSync } from "node:fs";
import path from "path";

export class Generator {
	constructor(readonly docs: any) {}

	config: Required<GeneratorConfig> = defaultGeneratorConfig;

	public readConfig() {
		const extensions = [".ts", ".js", ".json"];
		const base = path.resolve(process.cwd(), "corpus.config");

		const configPath = extensions.map((ext) => base + ext).find(existsSync);
		const userConfigFile = configPath
			? (require(configPath).default ?? require(configPath))
			: {};

		this.config = { ...this.config, ...userConfigFile };
	}

	public generate() {
		const outputPath = this.config.out.split("/");
		const dir = path.resolve(process.cwd(), ...outputPath);
		const path1 = path.join(dir, "docs.json");
		const path2 = path.join(dir, "routes.ts");

		mkdirSync(dir, { recursive: true });

		const docsStr = JSON.stringify(this.docs, null, 2);
		const routes = Object.keys(this.docs).map((key) => ({
			path: key,
			method: this.docs[key]?.method,
		})) as {
			method: string;
			path: string;
		}[];

		writeFileSync(path1, docsStr);
		writeFileSync(path2, this.generateRoutesFileContent(routes));
	}

	private generateRoutesFileContent(
		routes: { method: string; path: string }[],
	) {
		const lines: string[] = [];
		const typeExports: string[] = [];
		const pathExports: string[] = [];
		const methodExports: string[] = [];
		this.appendInitialContent(lines);

		for (const route of routes) {
			const key = this.toCamelCaseKey(route.path);
			const params = this.extractParams(route.path);

			if (params.length === 0) {
				this.appendNoParamRoute(lines, key, route.path, route.method);
			} else {
				this.appendParamRoute(lines, key, route.path, route.method, params);
			}

			pathExports.push(key);

			if (this.config.generatePathTypes) {
				typeExports.push(this.capitalize(key));
			}

			if (!this.config.useStringObjects) {
				methodExports.push(`${key}Method`);
			}

			lines.push("");
		}

		if (this.config.generatePathTypes) {
			lines.push("export type {", typeExports.join(", "), "};");
			lines.push("");
		}

		if (!this.config.useStringObjects) {
			lines.push("const methods = {", methodExports.join(", "), "};");
			lines.push("");
			pathExports.push("...methods");
		}

		if (this.config.exportAs === "individual") {
			lines.push("export {", pathExports.join(", "), "};");
		} else if (this.config.exportAs === "default") {
			lines.push(`export default {`, pathExports.join(", "), "};");
		} else {
			lines.push(
				`export const ${this.config.exportAs} = {`,
				pathExports.join(", "),
				"};",
			);
		}
		return lines.join("\n");
	}

	private extractParams(path: string): string[] {
		const named =
			path.match(/:([a-zA-Z_][a-zA-Z0-9_]*)/g)?.map((p) => p.substring(1)) ||
			[];
		if (path.includes("*")) named.push("*");
		return named;
	}

	private capitalize(s: string): string {
		return s.charAt(0).toUpperCase() + s.slice(1);
	}

	private toCamelCaseKey(path: string): string {
		const normalized = path.replace("*", "*");
		const parts = normalized.split("/").filter((part) => part.length > 0);
		const processedParts = parts.map((part, index) => {
			let cleanPart = part.startsWith(":") ? part.substring(1) : part;
			if (index === 0) return cleanPart;
			return cleanPart.charAt(0).toUpperCase() + cleanPart.slice(1);
		});
		let result = processedParts.join("");
		if (/^\d/.test(result)) result = "_" + result;
		result = result.replace(/[^a-zA-Z0-9_]/g, "_");
		return result;
	}

	private appendInitialContent(lines: string[]) {
		lines.push("type Primitive = string | number | boolean;", "");

		if (this.config.useStringObjects) {
			lines.push(
				"type StrObj<T extends string = string> = T & { method: string };",
				"",
				"function makeStrObj<T extends string = string>(path: T, method: string): StrObj<T> {",
				"const strObj = new String(path) as StrObj<T>;",
				"strObj.method = method;",
				"return strObj;",
				"}",
				"",
			);
		}
	}

	private appendNoParamRoute(
		lines: string[],
		key: string,
		path: string,
		method: string,
	) {
		if (this.config.generatePathTypes) {
			const typeName = this.capitalize(key);
			lines.push(`type ${typeName} = "${path}";`);
			if (this.config.useStringObjects) {
				lines.push(
					`const ${key} = makeStrObj<${typeName}>("${path}", "${method}");`,
				);
			} else {
				lines.push(
					`const ${key} = "${path}" as ${typeName};`,
					`const ${key}Method = "${method}";`,
				);
			}
		} else {
			if (this.config.useStringObjects) {
				lines.push(`const ${key} = makeStrObj("${path}", "${method}");`);
			} else {
				lines.push(
					`const ${key} = "${path}" as const;`,
					`const ${key}Method = "${method}";`,
				);
			}
		}
	}

	private appendParamRoute(
		lines: string[],
		key: string,
		path: string,
		method: string,
		params: string[],
	) {
		const templateType = path
			.replace(/:([a-zA-Z_][a-zA-Z0-9_]*)/g, "${string}")
			.replace("*", "${string}");
		const paramsType = params
			.map((p) => `${p === "*" ? '"*"' : p}: Primitive`)
			.join("; ");
		const parts = path.split(/:([a-zA-Z_][a-zA-Z0-9_]*)/);
		const funcBody = parts
			.map((part, i) => {
				if (i % 2 === 1) return `\${String(p.${part})}`;
				return part.replace("*", `\${String(p["*"])}`);
			})
			.join("");

		if (this.config.generatePathTypes) {
			const typeName = this.capitalize(key);
			lines.push(`type ${typeName} = \`${templateType}\`;`);

			if (this.config.useStringObjects) {
				lines.push(
					`const ${key} = (p: { ${paramsType} }) => makeStrObj<${typeName}>(\`${funcBody}\`, "${method}");`,
				);
			} else {
				lines.push(
					`const ${key} = (p: { ${paramsType} }) => \`${funcBody}\` as ${typeName};`,
					`const ${key}Method = "${method}";`,
				);
			}
		} else {
			if (this.config.useStringObjects) {
				lines.push(
					`const ${key} = (p: { ${paramsType} }) => makeStrObj(\`${funcBody}\`, "${method}");`,
				);
			} else {
				lines.push(
					`const ${key} = (p: { ${paramsType} }) => \`${funcBody}\` as const;`,
					`const ${key}Method = "${method}";`,
				);
			}
		}
	}
}
