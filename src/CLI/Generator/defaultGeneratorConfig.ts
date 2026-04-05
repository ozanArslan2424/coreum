import type { GeneratorConfig } from "./GeneratorConfig";

export const defaultGeneratorConfig = {
	useStringObjects: false,
	generatePathTypes: false,
	out: "/cli/out", // TODO:
	exportAs: "API",
} satisfies Required<GeneratorConfig>;
