export type GeneratorConfig = Partial<{
	/**
	 * Whether to attach the HTTP method to the path string via a string object.
	 *
	 * @default false
	 *
	 * @example
	 * // useStringObjectsForMethods: false
	 * const path = "/path" as const;
	 * const pathMethod = "GET";
	 * (p: { id: Primitive }): `/path/${string}` => `/path/${p.id}` as const
	 *
	 * @example
	 * // useStringObjectsForMethods: true
	 * const path = makeStrObj("/path", "GET");
	 * // path        → "/path"
	 * // path.method → "GET"
	 * (p: { id: Primitive }) => makeStrObj(`/path/${p.id}`, "GET")
	 */
	useStringObjects: boolean;

	/**
	 * Whether to generate string literal types for paths.
	 *
	 * @default false
	 *
	 * @example
	 * // generatePathTypes: true
	 * type Path = "/path";
	 */
	generatePathTypes: boolean;

	/**
	 * The file path where the generated output will be written.
	 *
	 * @default "/cli/generated.ts"
	 */
	out: string;

	/**
	 * Controls how the paths object is exported.
	 *
	 * @default "API"
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
	exportAs: "individual" | "default" | (string & {});
}>;
