export function logFatal(msg: string): never {
	if (process.env.NODE_ENV === "test") {
		throw new Error(msg);
	} else {
		console.error(msg);
		process.exit(1);
	}
}
