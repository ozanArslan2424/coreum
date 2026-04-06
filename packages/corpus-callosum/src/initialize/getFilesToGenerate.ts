import { join } from "path";
import { generateControllerContent } from "./writers/generateControllerContent";
import { generateDatabaseContent } from "./writers/generateDatabaseContent";
import { generateMainContent } from "./writers/generateMainContent";
import { generateModelContent } from "./writers/generateModelContent";
import { generateRepositoryContent } from "./writers/generateRepositoryContent";
import { generateServiceContent } from "./writers/generateServiceContent";
import { generateTypesContent } from "./writers/generateTypesContent";
import { mkdirSync } from "fs";
import type { ImportsManager } from "./ImportsManager";

export function getFilesToGenerate(
	cwd: string,
	im: ImportsManager,
	moduleName: string,
	dbFilePath: string | null,
	validationLib: string | null,
	convertCase: (s: string) => string,
): Record<string, { importPath: string; filePath: string; content: string }> {
	const typesFilePath = join(cwd, "corpus.d.ts");

	const mainFilePath = join(im.targetDir, "main.ts");

	const modelFilePath = join(
		im.moduleDir,
		`${convertCase(`${moduleName}Model`)}.ts`,
	);

	const repoFilePath = join(
		im.moduleDir,
		`${convertCase(`${moduleName}Repository`)}.ts`,
	);

	const serviceFilePath = join(
		im.moduleDir,
		`${convertCase(`${moduleName}Service`)}.ts`,
	);

	const controllerFilePath = join(
		im.moduleDir,
		`${convertCase(`${moduleName}Controller`)}.ts`,
	);

	let databaseFilePath = "";
	if (dbFilePath) {
		databaseFilePath = dbFilePath;
	} else {
		const databaseDir = join(im.targetDir, convertCase("Database"));
		mkdirSync(databaseDir, { recursive: true });
		databaseFilePath = join(databaseDir, `${convertCase("DatabaseClient")}.ts`);
	}

	return {
		model: {
			importPath: im.makeImportPath(mainFilePath, modelFilePath),
			filePath: modelFilePath,
			content: generateModelContent(moduleName, validationLib),
		},
		repository: {
			importPath: im.makeImportPath(mainFilePath, repoFilePath),
			filePath: repoFilePath,
			content: generateRepositoryContent(
				moduleName,
				im.makeImportPath(repoFilePath, modelFilePath),
			),
		},
		service: {
			importPath: im.makeImportPath(mainFilePath, serviceFilePath),
			filePath: serviceFilePath,
			content: generateServiceContent(
				moduleName,
				im.makeImportPath(serviceFilePath, modelFilePath),
				im.makeImportPath(serviceFilePath, repoFilePath),
			),
		},
		controller: {
			importPath: im.makeImportPath(mainFilePath, controllerFilePath),
			filePath: controllerFilePath,
			content: generateControllerContent(
				moduleName,
				im.makeImportPath(controllerFilePath, modelFilePath),
				im.makeImportPath(controllerFilePath, serviceFilePath),
			),
		},
		database: {
			importPath: im.makeImportPath(mainFilePath, databaseFilePath),
			filePath: databaseFilePath,
			content: generateDatabaseContent(
				moduleName,
				im.makeImportPath(databaseFilePath, modelFilePath),
			),
		},
		types: {
			importPath: "",
			filePath: typesFilePath,
			content: generateTypesContent(
				im.makeImportPath(typesFilePath, databaseFilePath),
			),
		},
		main: {
			importPath: "",
			filePath: mainFilePath,
			content: generateMainContent(
				[moduleName],
				im.makeImportPath(mainFilePath, databaseFilePath),
				im.makeImportPath(mainFilePath, im.moduleDir),
			),
		},
	};
}
