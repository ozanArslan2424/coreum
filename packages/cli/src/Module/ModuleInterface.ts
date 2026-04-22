import type { ImportableInterface } from "../Importable/ImportableInterface";

export type ModuleInterface = {
	readonly name: string;
	readonly model: ImportableInterface;
	readonly modelTypeName: string;
	readonly controller: ImportableInterface;
	readonly service: ImportableInterface;
	readonly repository: ImportableInterface;
};
