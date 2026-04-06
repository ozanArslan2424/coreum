export function registerSilentConsole() {
	console.log = () => {};
	console.warn = () => {};
	console.info = () => {};
	console.debug = () => {};
}
