import { mkdirSync, writeFileSync } from "node:fs";
import path from "path";
import { compile } from "json-schema-to-typescript";
import type { Schema } from "../utils/Schema";
import { toJsonSchema } from "@standard-community/standard-json";
import type { Config, PartialConfig } from "../Config";
import { getFileConfig } from "../getFileConfig";
import { getDefaultConfig } from "../getDefaultConfig";

type DocEntry = { id: string; endpoint: string; method: string; model?: any };
type MapEntry = {
	model: string | null;
	modelKey: string;
	func: string;
	funcKey: string;
};

export class ApiClientGenerator {
	constructor(
		private readonly docs: Record<string, DocEntry>,
		private readonly cliOverrides: Omit<
			PartialConfig["apiClientGenerator"],
			"jsonSchemaOptions"
		>,
	) {}

	get config(): Config["apiClientGenerator"] {
		return {
			...getFileConfig().apiClientGenerator,
			...getDefaultConfig().apiClientGenerator,
			...this.cliOverrides,
		};
	}

	public async generate() {
		const outputPath = this.config.output.split("/");
		const dirName = outputPath.slice(0, -1);
		const fileName = outputPath[outputPath.length - 1] ?? "generated.ts";
		const dir = path.resolve(process.cwd(), ...dirName);
		const file = path.join(dir, fileName);
		mkdirSync(dir, { recursive: true });
		writeFileSync(
			file,
			await this.generateFileContent(Object.values(this.docs)),
		);
	}

	private async generateFileContent(routes: DocEntry[]) {
		const map = new Map<string, MapEntry>();
		const lines: string[] = [];

		for (const route of routes) {
			const key = this.toCamelCaseKey(route.endpoint, route.method);
			const params = this.extractParams(route.endpoint);
			const modelKey = `${this.capitalize(key)}Model`;
			const model = await this.buildModel(modelKey, route, params);
			if (model) lines.push(model);
			const funcKey = `make${this.capitalize(key)}Request`;
			const func = this.buildFunc(route, params, funcKey, model, modelKey);
			lines.push(func);
			map.set(key, { model, modelKey, func, funcKey });
		}

		if (this.config.exportClientAs !== false) {
			lines.push("");
			lines.push(await this.buildClientClass(map));
		}

		lines.push(this.buildExports(map));

		const body = lines.join("\n");
		const header = this.buildInitialContent(body);
		return [header, body].join("\n");
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

	private toCamelCaseKey(path: string, method: string): string {
		const parts = path.split("/").filter((part) => part.length > 0);
		const processedParts = parts.map((part, index) => {
			let cleanPart = part.startsWith(":") ? part.substring(1) : part;

			// First handle hyphens: convert to camelCase
			cleanPart = cleanPart.replace(/-([a-zA-Z0-9])/g, (_, char) => {
				return char.toUpperCase();
			});

			// Then replace any other non-alphanumeric chars (except underscore) with underscore
			cleanPart = cleanPart.replace(/[^a-zA-Z0-9_]/g, "_");

			if (index === 0) return cleanPart;
			return cleanPart.charAt(0).toUpperCase() + cleanPart.slice(1);
		});
		let result = processedParts.join("");
		if (/^\d/.test(result)) result = "_" + result;

		return (
			result + method.slice(0, 1).toUpperCase() + method.slice(1).toLowerCase()
		);
	}

	private buildFunc(
		route: DocEntry,
		params: string[],
		functionKey: string,
		model: string | null,
		modelKey: string,
	) {
		const lines: string[] = [];
		lines.push(
			`const ${functionKey}=(${model ? `args:ExtractArgs<${modelKey}>` : ""})=>({`,
			`endpoint:${this.buildEndpoint(route, params)}`,
			`,`,
			`method:${this.buildMethod(route)}`,
			...(route.model?.body ? [`,`, `body:args.body`] : []),
			`,`,
			`search:args.search`,
			`})`,
		);
		return lines.join("").trim();
	}

	private buildMethod(route: DocEntry) {
		return `"${route.method}"`;
	}

	private buildEndpoint(route: DocEntry, params: string[]) {
		if (params.length === 0) {
			return `"${route.endpoint}"`;
		} else {
			return `\`${route.endpoint
				.split(/:([a-zA-Z_][a-zA-Z0-9_]*)/)
				.map((part, i) => {
					if (i % 2 === 1) return `\${String(args.params.${part})}`;
					return part.replace("*", `\${String(args.params["*"])}`);
				})
				.join("")}\``;
		}
	}

	private async buildModel(
		modelKey: string,
		route: DocEntry,
		params: string[],
	) {
		const lines: string[] = [];
		lines.push(`interface ${modelKey}{`);

		if (route.model?.body) {
			lines.push(`body:${await this.buildSchemaType(route.model.body)}`);
		}

		if (route.model?.search) {
			lines.push(`search:${await this.buildSchemaType(route.model.search)}`);
		} else {
			lines.push(`search?:Record<string, unknown>;`);
		}

		if (route.model?.params) {
			lines.push(`params:${await this.buildSchemaType(route.model.params)}`);
		} else if (params.length > 0) {
			lines.push(
				`params:{${params
					.map((p) => `${p === "*" ? '"*"' : p}:Primitive`)
					.join(";")}};`,
			);
		}

		if (route.model?.response) {
			lines.push(
				`response:${await this.buildSchemaType(route.model.response)}`,
			);
		} else {
			lines.push(`response:unknown;`);
		}

		lines.push(`};`);

		return lines.length > 2 ? lines.join("").trim() : null;
	}

	private async buildSchemaType(schema: Schema): Promise<string> {
		try {
			let schemaType = await compile(
				toJsonSchema(schema, this.config.jsonSchemaOptions),
				"DoesnTMatterWillBeDeleted",
				{
					bannerComment: "",
					format: false,
					ignoreMinAndMaxItems: true,
					additionalProperties: false,
				},
			);
			schemaType = schemaType
				.replace("export interface DoesnTMatterWillBeDeleted", "")
				.replace("export type DoesnTMatterWillBeDeleted =", "")
				.replace(/([^{])\n/g, "$1;") // newline → semicolon only when not preceded by {
				.replace(/;+/g, ";") // collapse consecutive semicolons
				.replace(/\s+/g, "") // collapse whitespace
				.replace(/; }/g, "}") // clean "; }" → " }"
				.trim();
			return schemaType;
		} catch (err) {
			console.log(JSON.stringify(schema));
			console.log(err);
			process.exit(1);
		}
	}

	private readonly defaultFetchFnBody = [
		`const url = new URL(args.endpoint, this.baseUrl);`,
		`const headers = new Headers(args.headers);`,
		`const method: RequestInit["method"] = args.method;`,
		`let body: RequestInit["body"];`,
		`if (args.search) {`,
		`for (const [key, val] of Object.entries(args.search)) {`,
		`if (val != null) url.searchParams.append(key, String(val));`,
		`}`,
		`}`,
		`if (args.body) {`,
		`if (!headers.has("Content-Type") || !headers.has("content-type")) {`,
		`headers.set("Content-Type", "application/json");`,
		`}`,
		`body = JSON.stringify(args.body);`,
		`}`,
		`const res = await fetch(url, { method, headers, body, ...args.init });`,
		`return C.Parser.parseBody(res);`,
	];

	private async buildClientClass(map: Map<string, MapEntry>) {
		const lines: string[] = [];
		lines.push(
			`class ${this.config.exportClientAs} {`,
			`constructor(public readonly baseUrl: string) {}`,
			`public fetchFn: <R = unknown>(descriptor: RequestDescriptor) => Promise<R> =`,
			`async (args) => {`,
			...this.defaultFetchFnBody,
			`};`,
			`public setFetchFn(cb: <R = unknown>(descriptor: RequestDescriptor) => Promise<R>) {`,
			`this.fetchFn = cb;`,
			`};`,
		);

		for (const [key, entry] of map.entries()) {
			lines.push(
				`${key}=(${entry.model ? `args: ExtractArgs<${entry.modelKey}>` : ``}) => this.fetchFn<${entry.modelKey}["response"]>(${entry.funcKey}(${entry.model ? `args` : ``}));`,
			);
		}

		lines.push(`}`);
		return lines.join("\n");
	}

	private buildExports(map: Map<string, MapEntry>) {
		const lines: string[] = [];
		const consts = Array.from(map.values().map((v) => v.funcKey));
		const types = Array.from(map.values().map((v) => v.modelKey));

		if (this.config.exportClientAs !== false) {
			types.push("RequestDescriptor");
			lines.push(`export {${this.config.exportClientAs}};`);
		}

		lines.push("export type {", types.join(", "), "};");

		if (this.config.exportRoutesAs === "individual") {
			lines.push(`export {${consts.join(",")}};`);
		} else if (this.config.exportRoutesAs === "default") {
			lines.push(`export default {${consts.join(",")}};`);
		} else {
			lines.push(
				`export const ${this.config.exportRoutesAs}={${consts.join(",")}};`,
			);
		}
		return lines.join("");
	}

	private buildInitialContent(body: string) {
		const lines: string[] = [];
		if (this.config.exportClientAs !== false) {
			lines.push(`import { C } from "@ozanarslan/corpus";`);
		}

		if (body.includes("Primitive")) {
			lines.push("type Primitive = string | number | boolean;");
		}
		lines.push(
			`type ExtractArgs<T> = `,
			`(Omit<T, "response"> extends infer U ? { [K in keyof U as U[K] extends undefined ? never : K]: U[K] } : never)`,
			` & {`,
			`headers?: HeadersInit;`,
			`init?: RequestInit`,
			`};`,

			`interface RequestDescriptor {`,
			`endpoint: string;`,
			`method: string;`,
			`body?: unknown;`,
			`search?: Record<string, unknown>;`,
			`headers?: HeadersInit;`,
			`init?: RequestInit`,
			`}`,
		);
		return lines.join("\n");
	}
}
