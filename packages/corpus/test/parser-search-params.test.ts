import { describe, it, expect } from "bun:test";

import { SearchParamsParser } from "@/Parser/SearchParamsParser";

describe("SearchParamsParser", () => {
	const parser = new SearchParamsParser();

	describe("parseKey", () => {
		it("handles flat key", () => {
			// @ts-expect-error protected
			expect(parser.parseKey("title")).toEqual(["title"]);
		});
		it("handles bracket index", () => {
			// @ts-expect-error protected
			expect(parser.parseKey("items[0]")).toEqual(["items", 0]);
		});
		it("handles bracket index with dot field", () => {
			// @ts-expect-error protected
			expect(parser.parseKey("items[0].name")).toEqual(["items", 0, "name"]);
		});
		it("handles bracket index with bracket field", () => {
			// @ts-expect-error protected
			expect(parser.parseKey("items[0][name]")).toEqual(["items", 0, "name"]);
		});
		it("handles deep dot notation", () => {
			// @ts-expect-error protected
			expect(parser.parseKey("a.b.c")).toEqual(["a", "b", "c"]);
		});
		it("handles mixed deep notation", () => {
			// @ts-expect-error protected
			expect(parser.parseKey("a[0].b[1][c]")).toEqual(["a", 0, "b", 1, "c"]);
		});
	});

	describe("formDataToObject", () => {
		it("handles flat fields", () => {
			const fd = new URLSearchParams();
			fd.set("title", "hello");
			fd.set("count", "5");
			expect(parser.toObject(fd)).toEqual({ title: "hello", count: 5 });
		});

		it("handles flat array via repeated keys", () => {
			const fd = new URLSearchParams();
			fd.append("ids", "1");
			fd.append("ids", "2");
			fd.append("ids", "3");
			expect(parser.toObject(fd)).toEqual({ ids: [1, 2, 3] });
		});

		it("handles indexed array", () => {
			const fd = new URLSearchParams();
			fd.append("ids[0]", "1");
			fd.append("ids[1]", "2");
			expect(parser.toObject(fd)).toEqual({ ids: [1, 2] });
		});

		it("handles array of objects via dot notation", () => {
			const fd = new URLSearchParams();
			fd.append("items[0].name", "foo");
			fd.append("items[0].qty", "2");
			fd.append("items[1].name", "bar");
			fd.append("items[1].qty", "3");
			expect(parser.toObject(fd)).toEqual({
				items: [
					{ name: "foo", qty: 2 },
					{ name: "bar", qty: 3 },
				],
			});
		});

		it("handles array of objects via bracket notation", () => {
			const fd = new URLSearchParams();
			fd.append("items[0][name]", "foo");
			fd.append("items[0][qty]", "2");
			expect(parser.toObject(fd)).toEqual({
				items: [{ name: "foo", qty: 2 }],
			});
		});

		it("handles json string value", () => {
			const fd = new URLSearchParams();
			fd.set("data", JSON.stringify({ materialId: 3, quantity: 1 }));
			expect(parser.toObject(fd)).toEqual({
				data: { materialId: 3, quantity: 1 },
			});
		});

		it("handles indexed array of json objects", () => {
			const fd = new URLSearchParams();
			fd.append("items[0]", JSON.stringify({ materialId: 3, quantity: 1 }));
			fd.append("items[1]", JSON.stringify({ materialId: 5, quantity: 2 }));
			expect(parser.toObject(fd)).toEqual({
				items: [
					{ materialId: 3, quantity: 1 },
					{ materialId: 5, quantity: 2 },
				],
			});
		});

		it("handles nested dot notation", () => {
			const fd = new URLSearchParams();
			fd.set("a.b.c", "deep");
			expect(parser.toObject(fd)).toEqual({ a: { b: { c: "deep" } } });
		});

		it("handles mixed flat and nested fields", () => {
			const fd = new URLSearchParams();
			fd.set("title", "recipe");
			fd.set("isPublic", "true");
			fd.append("deletedIds[0]", "1");
			fd.append("deletedIds[1]", "2");
			fd.append("newItems[0].materialId", "3");
			fd.append("newItems[0].quantity", "1.5");
			expect(parser.toObject(fd)).toEqual({
				title: "recipe",
				isPublic: true,
				deletedIds: [1, 2],
				newItems: [{ materialId: 3, quantity: 1.5 }],
			});
		});
	});
});
