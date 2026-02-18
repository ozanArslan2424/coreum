import type { HtmlSkeleton } from "@/modules/StaticRoute/types/HtmlSkeleton";

export class HTML {
	// prettier-ignore
	static build(props: HtmlSkeleton): string {
		const lines: string[] = [];

		const add = (tag: string, attr: { [key: string]: string | number }) =>
			lines.push(
				`<${tag} ${Object.entries(attr).map(([key, value]) => `${key}="${value}"`)}>`,
			);

		add("meta", { charset: props.charset ?? "UTF-8" });
		add("meta", { name: "viewport", content: props.viewport ?? "width=device-width, initial-scale=1.0" });
		if (props.description) add("meta", { name: "description", content: props.description });
		if (props.keywords?.length) add("meta", { name: "keywords", content: props.keywords.join(", ") });
		if (props.author) add("meta", { name: "author", content: props.author });
		if (props.robots) add("meta", { name: "robots", content: props.robots });
		if (props.canonical) add("link", { rel: "canonical", href: props.canonical })
		if (props.metas) {
			for (const m of props.metas) {
				if (m.name) {
					add("meta", { name: m.name, content: m.content });
				} else if (m.property) {
					add("meta", { property: m.property, content: m.content });
				} else if (m.httpEquiv) {
					add("meta", { "http-equiv": m.httpEquiv, content: m.content });
				}
			}
		}
		if (props.og) {
			if (props.og.title) add("meta", { property: "og:title", content: props.og.title });
			if (props.og.description) add("meta", { property: "og:description", content: props.og.description });
			if (props.og.image) add("meta", { property: "og:image", content: props.og.image });
			if (props.og.url) add("meta", { property: "og:url", content: props.og.url });
			if (props.og.type) add("meta", { property: "og:type", content: props.og.type });
			if (props.og.siteName) add("meta", { property: "og:site_name", content: props.og.siteName });
			if (props.og.locale) add("meta", { property: "og:locale", content: props.og.locale });
		}
		if (props.twitter) {
			if (props.twitter.card) add("meta", { property: "twitter:card", content: props.twitter.card });
			if (props.twitter.site) add("meta", { property: "twitter:site", content: props.twitter.site });
			if (props.twitter.creator) add("meta", { property: "twitter:creator", content: props.twitter.creator });
			if (props.twitter.title) add("meta", { property: "twitter:title", content: props.twitter.title });
			if (props.twitter.description) add("meta", { property: "twitter:description", content: props.twitter.description });
			if (props.twitter.image) add("meta", { property: "twitter:image", content: props.twitter.image });
			if (props.twitter.imageAlt) add("meta", { property: "twitter:image:alt", content: props.twitter.imageAlt });
			if (props.twitter.player) {
				add("meta", { property: "twitter:player", content: props.twitter.player });
				if (props.twitter.playerWidth) add("meta", { property: "twitter:player:width", content: props.twitter.playerWidth });
				if (props.twitter.playerHeight) add("meta", { property: "twitter:player:height", content: props.twitter.playerHeight });
			}
			if (props.twitter.appId) {
				if (props.twitter.appId.iphone)  add("meta", { property: "twitter:app:id:iphone", content: props.twitter.appId.iphone });
				if (props.twitter.appId.ipad)  add("meta", { property: "twitter:app:id:ipad", content: props.twitter.appId.ipad });
				if (props.twitter.appId.googleplay)  add("meta", { property: "twitter:app:id:googleplay", content: props.twitter.appId.googleplay });
			}
		}
		if (props.base) {
			if (props.base.target) {
				add("base", { href: props.base.href, target: props.base.target })
			} else {
				add("base", { href: props.base.href })
			}
		}
		if (props.favicons) {
			for (const f of props.favicons) {
				const attr: Record<string, string> = { rel: f.rel, href: f.href }
				if (f.sizes) attr.sizes = f.sizes
				if (f.type) attr.type = f.type
				if (f.color) attr.color = f.color
				add("link", attr)
			}
		}
		if (props.links) {
			for (const l of props.links) {
				const attr: Record<string, string> = { rel: l.rel, href: l.href }
				if (l.type) attr.type = l.type
				if (l.sizes) attr.sizes = l.sizes
				if (l.media) attr.media = l.media
				if (l.integrity) attr.integrity = l.integrity
				if (l.crossorigin) attr.crossorigin = l.crossorigin
				if (l.referrerpolicy) attr.referrerpolicy = l.referrerpolicy
				if (l.as) attr.as = l.as
				if (l.hreflang) attr.hreflang = l.hreflang
				if (l.title) attr.title = l.title
				add("link", attr)
			}
		}
		if (props.jsonLd) {
			for (const [i, j] of props.jsonLd.entries()) {
				lines.push(`<script type="application/ld+json" id="structured-data-${i + 1}">${JSON.stringify(j, null)}</script>`)
			}
		}
		if (props.scripts) {
			for (const s of props.scripts) {
				const attrs: string[] = [];
				if (s.src) attrs.push(`src="${s.src}"`);
				if (s.type) attrs.push(`type="${s.type}"`);
				if (s.async) attrs.push("async");
				if (s.defer) attrs.push("defer");
				if (s.integrity) attrs.push(`integrity="${s.integrity}"`);
				if (s.crossorigin) attrs.push(`crossorigin="${s.crossorigin}"`);
				if (s.referrerpolicy) attrs.push(`referrerpolicy="${s.referrerpolicy}"`);
				if (s.nomodule) attrs.push("nomodule");
				if (s.content) {
					lines.push(`<script ${attrs.join(" ")}>${s.content}</script>`);
				} else {
					lines.push(`<script ${attrs.join(" ")}></script>`);
				}
			}
		}
		const html = [
			"<!DOCTYPE html>",
			`<html lang="${props.lang}">`,
			"<head>",
			`<title>${props.title}</title>`,
			...lines,
			"</head>",
			"<body>",
			props.contents,
			"</body>",
			"</html>",
		];
		return html.join("\n");
	}
}
