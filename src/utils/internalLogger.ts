export const log = console;

export function logFatal(...args: any[]): never {
	console.error(...args);
	process.exit(1);
}
