import type { ImportableInterface } from "../Importable/ImportableInterface";
import type { ModuleInterface } from "../Module/ModuleInterface";
import { Writer } from "../Writer/Writer";

export function writeDatabaseFile(
	m: ModuleInterface,
	database: ImportableInterface,
) {
	const w = new Writer(database.filePath);

	w.$import({
		isType: true,
		keys: [m.modelTypeName],
		from: m.model.import(database.filePath),
	});

	w.$class({
		isExported: true,
		name: database.name,
		body: (w) => {
			w.$member({
				name: "examples",
				type: `Map<string, ${m.modelTypeName}["entity"]>`,
				value: "new Map()",
			});
		},
	});

	return w.read();
}
