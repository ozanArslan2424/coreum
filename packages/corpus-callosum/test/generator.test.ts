import { describe, expect, it, beforeAll } from "bun:test";
import { Generator } from "../src/Generator";

const generator = new Generator({}, {});
beforeAll(() => generator.readConfig());

describe("toCamelCaseKey", () => {
	const key = (path: string, method: string) =>
		// @ts-expect-error private
		generator.toCamelCaseKey(path, method);

	it("simple path", () => expect(key("/users", "GET")).toBe("usersGet"));
	it("nested path", () =>
		expect(key("/users/posts", "GET")).toBe("usersPostsGet"));
	it("param path", () => expect(key("/users/:id", "GET")).toBe("usersIdGet"));
	it("method casing", () => expect(key("/users", "POST")).toBe("usersPost"));
	it("numeric start gets underscore", () =>
		expect(key("/2bros", "GET")).toBe("_2brosGet"));
	it("wildcard", () => expect(key("/files/*", "GET")).toBe("files_Get"));
	it("multiple params", () =>
		expect(key("/orgs/:orgId/members/:memberId", "PUT")).toBe(
			"orgsOrgIdMembersMemberIdPut",
		));
});

describe("extractParams", () => {
	const extract = (path: string) =>
		// @ts-expect-error private
		generator.extractParams(path);

	it("no params", () => expect(extract("/users")).toEqual([]));
	it("single param", () => expect(extract("/users/:id")).toEqual(["id"]));
	it("multiple params", () =>
		expect(extract("/orgs/:orgId/members/:memberId")).toEqual([
			"orgId",
			"memberId",
		]));
	it("wildcard", () => expect(extract("/files/*")).toEqual(["*"]));
	it("mixed", () => expect(extract("/users/:id/files/*")).toEqual(["id", "*"]));
});

describe("buildEndpoint", () => {
	const endpoint = (path: string, params: string[]) =>
		// @ts-expect-error private
		generator.buildEndpoint({ endpoint: path, method: "GET" }, params);

	it("static path", () => expect(endpoint("/users", [])).toBe(`"/users"`));
	it("with param", () =>
		expect(endpoint("/users/:id", ["id"])).toBe(
			"`/users/${String(args.params.id)}`",
		));
	it("with wildcard", () =>
		expect(endpoint("/files/*", ["*"])).toBe(
			'`/files/${String(args.params["*"])}`',
		));
});

describe("buildInitialContent", () => {
	const initial = (body: string) =>
		// @ts-expect-error private
		generator.buildInitialContent(body);

	it("includes Primitive when body uses it", () =>
		expect(initial("some Primitive type")).toContain("type Primitive"));
	it("excludes Primitive when body doesn't use it", () =>
		expect(initial("some other content")).not.toContain("type Primitive"));
	it("always includes ExtractArgs", () =>
		expect(initial("")).toContain("type ExtractArgs"));
});

describe("buildModel", () => {
	const model = (modelKey: string, route: any, params: string[]) =>
		// @ts-expect-error private
		generator.buildModel(modelKey, route, params);

	it("includes search when route has search model", async () => {
		const { type } = await import("arktype");
		const result = await model(
			"TestModel",
			{ model: { search: type({ page: "string" }) } },
			[],
		);
		expect(result).toContain("search");
	});

	it("includes params when route has params", async () => {
		const result = await model("TestModel", { model: undefined }, ["id"]);
		expect(result).toContain("params");
		expect(result).toContain("id");
	});

	it("includes wildcard param", async () => {
		const result = await model("TestModel", { model: undefined }, ["*"]);
		expect(result).toContain('"*"');
	});
});

describe("generateFileContent", () => {
	const generate = (routes: any[]) =>
		// @ts-expect-error private
		generator.generateFileContent(routes);

	it("generates ExtractArgs type", async () => {
		const result = await generate([]);
		expect(result).toContain("ExtractArgs");
	});

	it("generates exports for routes", async () => {
		const result = await generate([
			{ id: "1", endpoint: "/users", method: "GET", model: undefined },
		]);
		expect(result).toContain("usersGet");
		expect(result).toContain("export");
	});

	it("generates client class when generateClient is true", async () => {
		const result = await generate([
			{ id: "1", endpoint: "/users", method: "GET", model: undefined },
		]);
		expect(result).toContain("CorpusApi");
	});

	it("empty routes generates valid output", async () => {
		const result = await generate([]);
		expect(result).toBeTruthy();
		expect(result).toContain("ExtractArgs");
	});
});
