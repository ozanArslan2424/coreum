export type ImportableInterface = {
	name: string;
	camelName: string;
	import(inFile: string): string;
	fileName: string;
	filePath: string;
};
