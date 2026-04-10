import type { Config, PartialConfig } from "../Config/Config";
import { ACTIONS, type Action } from "../utils/ACTIONS";
import { logFatal, log } from "corpus-utils/internalLog";
import path from "node:path";
import fs from "node:fs";
import { parseArgs } from "util";
import { ACCEPTED_PACKAGE_MANAGERS } from "../utils/ACCEPTED_PACKAGE_MANAGERS";
import { ACCEPTED_VALIDATION_LIBS } from "../utils/ACCEPTED_VALIDATION_LIBS";
import { registerSilentConsole } from "../utils/registerSilentConsole";

export class ConfigManager {
	static getAction(): Action {
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
		return action;
	}

	static getDefaultConfig(): Config {
		return {
			silent: false,
			main: "./src/main.ts",
			pkgPath: "@ozanarslan/corpus",
			casing: "pascal",
			dbFilePath: null,
			validationLibrary: null,
			packageManager: "bun",

			output: "./src/corpus.gen.ts",
			exportRoutesAs: "individual",
			exportClientAs: "CorpusApi",
			// Default targets arktype. The `fallback: ctx => ctx.base` strategy silently
			// drops any unsupported constraint and keeps the rest of the schema intact,
			// which is the least-surprising behaviour for codegen purposes.
			jsonSchemaOptions: {
				fallback: (ctx: any) => ctx.base,
			},
		};
	}

	static getFileConfig(): PartialConfig {
		const extensions = [".ts", ".js"];
		const base = path.resolve(process.cwd(), "corpus.config");
		const configPath = extensions.map((ext) => base + ext).find(fs.existsSync);
		const fileC: PartialConfig = configPath ? require(configPath).default : {};
		return fileC;
	}

	static getFlagConfig(): PartialConfig {
		const args = process.argv;

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
			casing: flagC.casing as Config["casing"],
			dbFilePath: flagC.db,
			main: flagC.main,
			packageManager: flagC.pm as Config["packageManager"],
			pkgPath: flagC.package,
			silent: flagC.silent,
			validationLibrary: (flagC.validation ??
				null) as Config["validationLibrary"],
			exportClientAs: flagC.exportClientAs,
			exportRoutesAs: flagC.exportRoutesAs,
			output: flagC.out,
		};
	}

	static getResolvedConfig(): Config {
		const flagC = this.getFlagConfig();
		const fileC = this.getFileConfig();
		const defC = this.getDefaultConfig();

		function use<T>(
			flag: T | null | undefined,
			file: T | null | undefined,
			def: T,
		): T {
			if (flag) return flag;
			if (file) return file;
			return def;
		}

		const config: Config = {
			silent: use(flagC.silent, fileC.silent, defC.silent),
			casing: use(flagC.casing, fileC.casing, defC.casing),
			dbFilePath: use(flagC.dbFilePath, fileC.dbFilePath, defC.dbFilePath),
			main: use(flagC.main, fileC.main, defC.main),
			packageManager: use(
				flagC.packageManager,
				fileC.packageManager,
				defC.packageManager,
			),
			pkgPath: use(flagC.pkgPath, fileC.pkgPath, defC.pkgPath),
			validationLibrary: use(
				flagC.validationLibrary,
				fileC.validationLibrary,
				defC.validationLibrary,
			),
			exportClientAs: use(
				flagC.exportClientAs,
				fileC.exportClientAs,
				defC.exportClientAs,
			),
			exportRoutesAs: use(
				flagC.exportRoutesAs,
				fileC.exportRoutesAs,
				defC.exportRoutesAs,
			),
			output: use(flagC.output, fileC.output, defC.output),
			jsonSchemaOptions: use(
				null,
				fileC.jsonSchemaOptions,
				defC.jsonSchemaOptions,
			),
		};

		if (config.silent) {
			registerSilentConsole();
		}

		return config;
	}
}
