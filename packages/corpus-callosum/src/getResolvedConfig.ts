import type { Config } from "./Config";
import { getDefaultConfig } from "./getDefaultConfig";
import { getFileConfig } from "./getFileConfig";
import { getFlagConfig } from "./getFlagConfig";
import type { Action } from "./utils/ACTIONS";
import { registerSilentConsole } from "./utils/registerSilentConsole";

export function getResolvedConfig(): { action: Action; config: Config } {
	const { action, config: flagC } = getFlagConfig();
	const fileC = getFileConfig();
	const defC = getDefaultConfig();

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
		apiClientGenerator: {
			exportClientAs: use(
				flagC.apiClientGenerator?.exportClientAs,
				fileC.apiClientGenerator?.exportClientAs,
				defC.apiClientGenerator.exportClientAs,
			),
			exportRoutesAs: use(
				flagC.apiClientGenerator?.exportRoutesAs,
				fileC.apiClientGenerator?.exportRoutesAs,
				defC.apiClientGenerator.exportRoutesAs,
			),
			output: use(
				flagC.apiClientGenerator?.output,
				fileC.apiClientGenerator?.output,
				defC.apiClientGenerator.output,
			),
			jsonSchemaOptions: use(
				null,
				fileC.apiClientGenerator?.jsonSchemaOptions,
				defC.apiClientGenerator.jsonSchemaOptions,
			),
		},
	};

	if (config.silent) {
		registerSilentConsole();
	}

	return { action, config };
}
