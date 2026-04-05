import { C, X } from "../../dist";
import { convertMD } from "./convert-md";

async function main() {
	const server = new C.Server();

	const fileCache = new X.CacheMap(async (path) => {
		const file = new X.File(path);
		return await file.text();
	});

	const pageCache = new X.CacheMap(async (page) => {
		const md = new X.File(addr("markdown", `${page}.md`));
		if (await md.exists()) {
			const markdown = await md.text();
			return await convertMD(markdown);
		} else {
			const html = new X.File(addr("html", `${page}.html`));
			return await html.text();
		}
	});

	function addr(...path: string[]) {
		if (X.Config.nodeEnv === "development") {
			return X.Config.resolvePath(X.Config.cwd(), "src", "Docs", ...path);
		}
		return X.Config.resolvePath(X.Config.cwd(), "docs", ...path);
	}

	function insert(target: string, entries: Record<string, string>) {
		let result = target;
		for (const [key, content] of Object.entries(entries)) {
			const regex = new RegExp(`<!--\\s*INSERT\\s*==\\s*${key}\\s*-->`);
			result = result.replace(regex, content);
		}
		return result;
	}

	function addTime(result: string, time: number) {
		return (
			result + `<script>console.log("took ${time.toFixed(2)}ms");</script>`
		);
	}

	const topbar = await fileCache.get(addr("html", "header.html"));
	const sidebar = await fileCache.get(addr("html", "sidebar.html"));
	const index = await fileCache.get(addr("html", "index.html"));

	new C.Route<unknown, unknown, { file: string }>(
		"/styles/:file",
		async (c) => {
			const content = await fileCache.get(addr("css", c.params.file));
			c.res.headers.set(C.CommonHeaders.ContentType, "text/css");
			c.res.headers.set(C.CommonHeaders.ContentLength, content.length);
			return content;
		},
	);

	new C.StaticRoute("/", addr("html", "layout.html"), (_, layout) => {
		const start = performance.now();

		const result = insert(layout, { topbar, sidebar, content: index });

		const end = performance.now();
		const time = end - start;

		return addTime(result, time);
	});

	new C.StaticRoute<unknown, unknown, { page: string }>(
		"/docs/:page",
		addr("html", "layout.html"),
		async (c, layout) => {
			const start = performance.now();

			const result = insert(layout, {
				topbar,
				sidebar,
				content: await pageCache.get(c.params.page),
			});

			const end = performance.now();
			const time = end - start;

			return addTime(result, time);
		},
	);

	server.setOnBeforeListen(() => {
		console.log(server.routes.map((r) => r.id).join("\n"));
	});

	await server.listen(3000);
}

await main();
