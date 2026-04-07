import { log, logFatal } from "corpus-utils/internalLog";
import type { Config, PartialConfig } from "./Config";
import { parseArgs } from "util";
import { ACCEPTED_PACKAGE_MANAGERS } from "./utils/ACCEPTED_PACKAGE_MANAGERS";
import { ACCEPTED_VALIDATION_LIBS } from "./utils/ACCEPTED_VALIDATION_LIBS";
import { ACTIONS, type Action } from "./utils/ACTIONS";

export function getFlagConfig(): {
	action: Action;
	config: PartialConfig;
} {
	const args = process.argv;
	const action = args[2] as Action;

	if (!action || !ACTIONS.includes(action)) {
		log.bold("No action provided. Available actions:");
		log.info(
			"  api   — generate types and API client from your server entry file",
		);
		log.info(
			"          example: corpus api -m ./src/main.ts -o ./src/corpus.gen.ts",
		);
		log.info("  init  — scaffold an empty Corpus project");
		log.info("          example: corpus init");
		logFatal("Please provide an action and try again.");
	}

	const { values: flagC } = parseArgs({
		args: args.slice(3),
		options: {
			main: { type: "string", short: "m" },
			package: { type: "string", short: "p" },
			out: { type: "string", short: "o" },
			exportRoutesAs: { type: "string" },
			exportClientAs: { type: "string" },
			silent: { type: "boolean", short: "s" },
			casing: { type: "string", short: "c" },
			db: { type: "string" },
			pm: { type: "string" },
			validation: { type: "string" },
		},
	});

	if (flagC.pm && !ACCEPTED_PACKAGE_MANAGERS.includes(flagC.pm)) {
		logFatal(
			`"${flagC.pm}" is not a supported package manager. Supported options: ${ACCEPTED_PACKAGE_MANAGERS.join(", ")}`,
		);
	}

	if (
		flagC.validation &&
		!ACCEPTED_VALIDATION_LIBS.some((lib) => flagC.validation!.startsWith(lib))
	) {
		logFatal(
			`"${flagC.validation}" is not a supported validation library. Supported options: ${ACCEPTED_VALIDATION_LIBS.join(", ")}`,
		);
	}

	return {
		action,
		config: {
			casing: flagC.casing as Config["casing"],
			dbFilePath: flagC.db,
			main: flagC.main,
			packageManager: flagC.pm as Config["packageManager"],
			pkgPath: flagC.package,
			silent: flagC.silent,
			validationLibrary: flagC.validation,
			apiClientGenerator: {
				exportClientAs: flagC.exportClientAs,
				exportRoutesAs: flagC.exportRoutesAs,
				output: flagC.out,
			},
		},
	};
}
