import path from "node:path";
import { ImportsManager } from "../ImportsManager/ImportsManager";
import type { Config } from "../Config/Config";
import { Module } from "../Module/Module";
import { Importable } from "../Importable/Importable";
import { writeControllerFile } from "./writeControllerFile";
import { writeDatabaseFile } from "./writeDatabaseFile";
import { writeMainFile } from "./writeMainFile";
import { writeModelFile } from "./writeModelFile";
import { writeRepositoryFile } from "./writeRepositoryFile";
import { writeServiceFile } from "./writeServiceFile";
import { writesTypesFile } from "./writeTypesFile";
import { PackageManager } from "../PackageManager/PackageManager";
import { Package } from "../Package/Package";

const exampleModuleName = "example";

export async function initialize(config: Config) {
	const cwd = path.resolve(process.cwd());
	const pm = new PackageManager(config, cwd);
	const im = new ImportsManager(config, cwd);

	const selfPm = new PackageManager(config);
	const corpus = new Package(selfPm, config.pkgPath);
	const bunTypes = new Package(selfPm, "@types/bun", true);
	const typescript = new Package(selfPm, "typescript", true);

	if (!pm.exists) {
		pm.create();
	}
	await pm.add(corpus, bunTypes, typescript);

	const database = new Importable(im, "DatabaseClient", "Database");

	const mod = new Module(im, exampleModuleName);

	writeModelFile(config, mod);
	writeRepositoryFile(config, mod);
	writeServiceFile(config, mod);
	writeControllerFile(config, mod);
	writeDatabaseFile(mod, database);
	writesTypesFile(config, im.typesFilePath, database);
	writeMainFile(config, im.mainFilePath, database, [mod]);

	console.log(`✅ Corpus initialized in ${im.targetDir}`);
}
