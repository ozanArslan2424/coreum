import type { StandardJSONSchemaV1 } from "@standard-schema/spec";

export type Config = {
	/**
	 * Suppress console logs.
	 *
	 * @default false
	 */
	silent: boolean;

	/**
	 * The server entrypoint file path.
	 *
	 * @default "./src/main.ts"
	 */
	main: string;

	/**
	 * The corpus package path.
	 *
	 * @default "@ozanarslan/corpus"
	 */
	pkgPath: string;

	/**
	 * Casing for file and directory names,
	 *
	 * @default "pascal"
	 */
	casing: "pascal" | "camel" | "kebab";

	/**
	 * Database client file path.
	 *
	 * @default null
	 */
	dbFilePath: string | null;

	/**
	 * Validation Library to generate models using.
	 * Append version number with @ if you need a specific version.
	 *
	 * Default versions:
	 * arktype: "2.2.0"
	 * valibot: "1.3.1"
	 * yup: "1.7.1"
	 * zod: "4.3.6"
	 *
	 * @default null
	 */
	validationLibrary:
		| "arktype"
		| "zod"
		| "valibot"
		| "yup"
		| (string & {})
		| null;

	/**
	 * Package manager to install any missing dependencies with.
	 * Also picks up from package.json
	 * Default is bun since corpus uses bun runtime.
	 *
	 * @default "bun"
	 */
	packageManager: "bun" | "pnpm" | "npm" | null;

	apiClientGenerator: {
		/**
		 * The file path where the generated output will be written.
		 *
		 * @default "./src/corpus.gen.ts"
		 */
		output: string;

		/**
		 * Controls how the paths object is exported.
		 *
		 * @default "individual"
		 *
		 * @example
		 * // pathsExport: "individual"
		 * export { path1, path2 };
		 *
		 * @example
		 * // pathsExport: "default"
		 * export default { path1, path2 };
		 *
		 * @example
		 * // pathsExport: "API" // or any other string for the object name
		 * export const API = { path1, path2 };
		 */
		exportRoutesAs: "individual" | "default" | (string & {});

		/**
		 * Controls how the API Client is exported.
		 * Set to false if you don't want the api client.
		 *
		 * @default "CorpusApi"
		 */
		exportClientAs: string | false;

		/**
		 * Options passed to "@standard-community/standard-json".toJsonSchema for each route model.
		 * Use this to configure how your schema library handles types that don't have
		 * JSON Schema equivalents (e.g. Date, morph, predicate).
		 *
		 * @example
		 * // arktype — "just make it work"
		 * { jsonSchemaOptions: { fallback: ctx => ctx.base } }
		 */
		jsonSchemaOptions: StandardJSONSchemaV1.Options["libraryOptions"];
	};
};

export type PartialConfig = Omit<Partial<Config>, "apiClientGenerator"> & {
	apiClientGenerator?: Partial<Config["apiClientGenerator"]>;
};
