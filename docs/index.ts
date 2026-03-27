import { C, X } from "@/index";

const server = new C.Server();

function addr(...path: string[]) {
	return C.Config.resolvePath(C.Config.cwd(), "docs", ...path);
}

function insert(target: string, entries: Record<string, string>) {
	let result = target;
	for (const [key, content] of Object.entries(entries)) {
		const regex = new RegExp(`<!--\\s*INSERT\\s*==\\s*${key}\\s*-->`);
		result = result.replace(regex, content);
	}
	return result;
}

new C.StaticRoute("/styles.css", addr("styles", "styles.css"));
new C.StaticRoute("/main.css", addr("styles", "main.css"));
new C.StaticRoute("/header.css", addr("styles", "header.css"));
new C.StaticRoute("/sidebar.css", addr("styles", "sidebar.css"));
new C.StaticRoute("/landing.css", addr("styles", "landing.css"));

new C.StaticRoute("/", addr("components", "layout.html"), async (_, layout) => {
	const header = new X.File(addr("components", "header.html"));
	const sidebar = new X.File(addr("components", "sidebar.html"));
	const content = new X.File(addr("pages", "index.html"));

	return insert(layout, {
		topbar: await header.text(),
		sidebar: await sidebar.text(),
		content: await content.text(),
	});
});

new C.StaticRoute<"/docs/:page", unknown, unknown, { page: string }>(
	"/docs/:page",
	addr("components", "layout.html"),
	async (c, layout) => {
		const header = new X.File(addr("components", "header.html"));
		const sidebar = new X.File(addr("components", "sidebar.html"));
		const content = new X.File(addr("pages", `${c.params.page}.html`));
		return insert(layout, {
			topbar: await header.text(),
			sidebar: await sidebar.text(),
			content: await content.text(),
		});
	},
);

await server.listen(3000);
