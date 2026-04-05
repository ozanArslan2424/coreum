import { logFatal } from "@/Utils/log";
import { parseArgs } from "util";
import { resolve } from "path";

export function getVariables() {
	const { values } = parseArgs({
		args: process.argv.slice(2),
		options: {
			main: { type: "string", short: "m" },
			package: { type: "string", short: "p" },
			output: { type: "string", short: "o" },
			exportRoutesAs: { type: "string" },
			exportClientAs: { type: "string" },
			generateClient: { type: "boolean" },
			silent: { type: "boolean", short: "s" },
		},
	});

	if (!values.main) {
		logFatal("Error: --main / -m is required");
	}
	const mainPath = resolve(values.main);

	if (!values.package) {
		values.package = "@ozanarslan/corpus";
	}
	const packagePath = values.package;

	const cliOverrides = Object.fromEntries(
		Object.entries({
			output: values.output,
			exportRoutesAs: values.exportRoutesAs,
			exportClientAs: values.exportClientAs,
			generateClient: values.generateClient,
		}).filter(([, v]) => v !== undefined),
	);

	const tempPath = mainPath.replace(/\.ts$/, ".gen.ts");

	return {
		silent: values.silent,
		mainPath,
		packagePath,
		cliOverrides,
		tempPath,
	};
}
