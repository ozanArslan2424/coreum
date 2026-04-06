import { registerSilentConsole } from "../utils/registerSilentConsole";
import { writeFileSync } from "fs";
import { resolve } from "path";
import { getCasingConverter } from "./utils/getCasingConverter";
import { getFilesToGenerate } from "./getFilesToGenerate";
import { PackageManager } from "./PackageManager";
import { ImportsManager } from "./ImportsManager";
import { ACCEPTED_PACKAGE_MANAGERS } from "./utils/ACCEPTED_PACKAGE_MANAGERS";
import { logFatal } from "corpus-utils/internalLog";
import { ACCEPTED_VALIDATION_LIBS } from "./utils/ACCEPTED_VALIDATION_LIBS";
import { parseArgs } from "util";

const exampleModuleName = "Example";
const fallbackDirName = "corpus";

export async function initialize() {
	const { values } = parseArgs({
		args: process.argv.slice(3),
		options: {
			casing: { type: "string", short: "c", default: "pascal" },
			silent: { type: "boolean", short: "s" },
			db: { type: "string" },
			pm: { type: "string", default: "bun" },
			validation: { type: "string" },
		},
	});

	if (values.pm && !ACCEPTED_PACKAGE_MANAGERS.includes(values.pm)) {
		logFatal(
			`"${values.pm}" is not a supported package manager. Supported options: ${ACCEPTED_PACKAGE_MANAGERS.join(", ")}`,
		);
	}

	if (
		values.validation &&
		!ACCEPTED_VALIDATION_LIBS.some((lib) => values.validation!.startsWith(lib))
	) {
		logFatal(
			`"${values.validation}" is not a supported validation library. Supported options: ${ACCEPTED_VALIDATION_LIBS.join(", ")}`,
		);
	}

	if (values.silent) {
		registerSilentConsole();
	}

	const dbFilePath = values.db ?? null;
	const validationLib = values.validation ?? null;

	const cwd = resolve(process.cwd());
	const convertCase = getCasingConverter(values.casing);
	const pm = new PackageManager(values.pm);
	const im = new ImportsManager(
		cwd,
		convertCase(exampleModuleName),
		convertCase(fallbackDirName),
	);

	if (values.silent) registerSilentConsole();

	const pkgName = await pm.resolvePackageName(cwd, validationLib);

	const files = getFilesToGenerate(
		cwd,
		im,
		exampleModuleName,
		dbFilePath,
		validationLib,
		convertCase,
	);

	for (const file of Object.values(files)) {
		writeFileSync(file.filePath, file.content, "utf-8");
	}

	console.log(`✅ Corpus initialized in ${im.targetDir}`);
	console.log(`   App: ${pkgName}`);
}
