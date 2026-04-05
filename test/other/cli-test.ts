import { CorpusApi } from "./generated";
import { log as _log } from "@/Utils/log";
import { TestHelper } from "../utils/TestHelper";
import { TC } from "../_modules";
import { type } from "arktype";

const PORT = 9876;
const BASE_URL = `http://localhost:${PORT}`;
const SILENT = process.argv[2] === "-s";
const log = SILENT ? _log.noop : _log;
const T = new TestHelper(log);
const server = new TC.Server();

// ── Parameterised routes (existing) ──────────────────────────────────────────

const r1 = new TC.Route("/:param1/:param2", () => "ok");
const r2 = new TC.Route("hello/:param1/:param2", () => "ok");
new TC.Route("/world/:param1/:param2", () => "ok");
new TC.Route("/lalala/:param1/:param2", () => "ok");
new TC.Route("/yesyes/:param2", () => "ok");
new TC.Route("/okay/:param1/letsgo", () => "ok");
new TC.Route("/deneme/:param1/:param2", () => "ok");
new TC.Route("/we/got/this", () => "ok");
new TC.Route("/ohmyohmy", () => "ok");
new TC.Route("/2bros", () => "ok");
new TC.Route("/chillin/in/a/hottub", () => "ok");
new TC.Route("/5/feet/apart/cuz/theyre/not/gay", () => "ok");
new TC.Route("/verywild/*", () => "ok");
new TC.Route("/craaaazy/*", () => "ok");

// ── Shared primitives ─────────────────────────────────────────────────────────

const Role = type("'admin' | 'editor' | 'viewer'");
const Status = type("'active' | 'inactive' | 'banned'");
const Pagination = type({
	page: type("string").pipe(Number),
	limit: type("string").pipe(Number),
});
const Timestamp = type({ createdAt: "string", updatedAt: "string" });

// ── User schemas ──────────────────────────────────────────────────────────────

const UserParams = type({ id: "string" });

const UserBody = type({
	name: "string",
	age: "number",
	role: Role,
	tags: "string[]",
	address: type({
		city: "string",
		country: "string",
		"zip?": "string",
	}),
});

const UserSearch = Pagination.and(type({ "role?": Role, "status?": Status }));

const UserResponse = type({
	id: "string",
	name: "string",
	age: "number",
	role: Role,
	status: Status,
	tags: "string[]",
}).and(Timestamp);

// ── Post schemas ──────────────────────────────────────────────────────────────

const PostBody = type({
	title: "string",
	content: "string",
	published: "boolean",
	metadata: type({
		views: "number",
		likes: "number",
		category: "'tech' | 'life' | 'other'",
	}),
});

const PostResponse = type({
	id: "string",
	title: "string",
	content: "string",
	published: "boolean",
	authorId: "string",
	metadata: type({
		views: "number",
		likes: "number",
		category: "'tech' | 'life' | 'other'",
	}),
}).and(Timestamp);

// ── Org schemas ───────────────────────────────────────────────────────────────

const OrgParams = type({ orgId: "string" });

const OrgBody = type({
	name: "string",
	plan: "'free' | 'pro' | 'enterprise'",
	seats: "number",
	owner: type({
		userId: "string",
		role: Role,
	}),
});

const OrgMemberParams = type({ orgId: "string", memberId: "string" });

const OrgMemberBody = type({
	role: Role,
	status: Status,
});

// ── Routes with models ────────────────────────────────────────────────────────

// POST /users — create user
new TC.Route(
	{ method: "POST", path: "/users" },
	(c) => ({
		id: "1",
		...c.body,
		status: "active" as const,
		createdAt: "",
		updatedAt: "",
	}),
	{ body: UserBody, response: UserResponse },
);

// GET /users — list users with filters
new TC.Route("/users", () => [], { search: UserSearch });

// GET /users/:id
new TC.Route(
	"/users/:id",
	(c) => ({
		id: c.params.id,
		name: "ozan",
		age: 25,
		role: "admin" as const,
		status: "active" as const,
		tags: [],
		createdAt: "",
		updatedAt: "",
	}),
	{ params: UserParams, response: UserResponse },
);

// PUT /users/:id
new TC.Route(
	{ method: "PUT", path: "/users/:id" },
	(c) => ({
		id: c.params.id,
		...c.body,
		status: "active" as const,
		createdAt: "",
		updatedAt: "",
	}),
	{ params: UserParams, body: UserBody, response: UserResponse },
);

// DELETE /users/:id
new TC.Route(
	{ method: "DELETE", path: "/users/:id" },
	(c) => ({ deleted: c.params.id }),
	{ params: UserParams },
);

// POST /users/:id/posts — create post for user
new TC.Route(
	{ method: "POST", path: "/users/:id/posts" },
	(c) => ({
		id: "1",
		authorId: c.params.id,
		...c.body,
		createdAt: "",
		updatedAt: "",
	}),
	{ params: UserParams, body: PostBody, response: PostResponse },
);

// POST /orgs — create org
new TC.Route(
	{ method: "POST", path: "/orgs" },
	(c) => ({ id: "1", ...c.body, createdAt: "", updatedAt: "" }),
	{ body: OrgBody },
);

// GET /orgs/:orgId/members
new TC.Route("/orgs/:orgId/members", () => [], {
	params: OrgParams,
	search: Pagination,
});

// PUT /orgs/:orgId/members/:memberId — update member role/status
new TC.Route(
	{ method: "PUT", path: "/orgs/:orgId/members/:memberId" },
	(c) => ({ orgId: c.params.orgId, memberId: c.params.memberId, ...c.body }),
	{ params: OrgMemberParams, body: OrgMemberBody },
);

// DELETE /orgs/:orgId/members/:memberId
new TC.Route(
	{ method: "DELETE", path: "/orgs/:orgId/members/:memberId" },
	(c) => ({ removed: c.params.memberId }),
	{ params: OrgMemberParams },
);

// ── Middleware ────────────────────────────────────────────────────────────────

new TC.Middleware({
	useOn: [r1, r2],
	handler: (c) => {
		c.data = {};
	},
});

// ─────────────────────────────────────────────────────────────────────────────
//  START & RUN
// ─────────────────────────────────────────────────────────────────────────────

await server.listen(PORT);
_log.info(`Server up on ${BASE_URL}\n`);

const api = new CorpusApi(async (args) => {
	const url = new URL(`${BASE_URL}${args.endpoint}`);
	if (args.search) {
		for (const [key, val] of Object.entries(args.search)) {
			if (val !== undefined && val !== null) {
				// oxlint-disable-next-line typescript/no-base-to-string
				url.searchParams.append(key, String(val));
			}
		}
	}
	const res = await fetch(url, {
		method: args.method,
		headers: args.body ? { "Content-Type": "application/json" } : {},
		...(args.body ? { body: JSON.stringify(args.body) } : {}),
	});
	return TC.Parser.parseBody(res);
});

// ── Parameterised routes ──────────────────────────────────────────────────────

{
	const res = await api.param1Param2Get({
		params: { param1: "foo", param2: "bar" },
	});
	T.expect("param1Param2Get returns ok", res).toBe("ok");
}

{
	const res = await api.helloParam1Param2Get({
		params: { param1: "foo", param2: "bar" },
	});
	T.expect("helloParam1Param2Get returns ok", res).toBe("ok");
}

{
	const res = await api.worldParam1Param2Get({
		params: { param1: "foo", param2: "bar" },
	});
	T.expect("worldParam1Param2Get returns ok", res).toBe("ok");
}

{
	const res = await api.lalalaParam1Param2Get({
		params: { param1: "a", param2: "b" },
	});
	T.expect("lalalaParam1Param2Get returns ok", res).toBe("ok");
}

{
	const res = await api.yesyesParam2Get({ params: { param2: "yes" } });
	T.expect("yesyesParam2Get returns ok", res).toBe("ok");
}

{
	const res = await api.okayParam1LetsgoGet({ params: { param1: "go" } });
	T.expect("okayParam1LetsgoGet returns ok", res).toBe("ok");
}

{
	const res = await api.denemeParam1Param2Get({
		params: { param1: "x", param2: "y" },
	});
	T.expect("denemeParam1Param2Get returns ok", res).toBe("ok");
}

{
	const res = await api.weGotThisGet({});
	T.expect("weGotThisGet returns ok", res).toBe("ok");
}

{
	const res = await api.ohmyohmyGet({});
	T.expect("ohmyohmyGet returns ok", res).toBe("ok");
}

{
	const res = await api._2brosGet({});
	T.expect("_2brosGet returns ok", res).toBe("ok");
}

{
	const res = await api.chillinInAHottubGet({});
	T.expect("chillinInAHottubGet returns ok", res).toBe("ok");
}

{
	const res = await api._5FeetApartCuzTheyreNotGayGet({});
	T.expect("_5FeetApartCuzTheyreNotGayGet returns ok", res).toBe("ok");
}

{
	const res = await api.verywild_Get({ params: { "*": "anything" } });
	T.expect("verywild_Get returns ok", res).toBe("ok");
}

{
	const res = await api.craaaazy_Get({ params: { "*": "wowzers" } });
	T.expect("craaaazy_Get returns ok", res).toBe("ok");
}

// ── User routes ───────────────────────────────────────────────────────────────

{
	const res = await api.usersPost({
		body: {
			name: "ozan",
			age: 25,
			role: "admin",
			tags: ["ts", "bun"],
			address: { city: "ankara", country: "turkey", zip: "06000" },
		},
	});
	T.expect("usersPost has id", res).toHaveProperty("id");
	T.expect("usersPost has name", res).toHaveProperty("name", "ozan");
	T.expect("usersPost has role", res).toHaveProperty("role", "admin");
	T.expect("usersPost has status", res).toHaveProperty("status");
}

{
	const res = await api.usersGet({ search: { page: "1", limit: "10" } });
	T.expect("usersGet returns array", Array.isArray(res)).toBe(true);
}

{
	const res = await api.usersGet({
		search: { page: "1", limit: "5", role: "editor" },
	});
	T.expect("usersGet with role filter returns array", Array.isArray(res)).toBe(
		true,
	);
}

{
	const res = await api.usersIdGet({ params: { id: "1" } });
	T.expect("usersIdGet has id", res).toHaveProperty("id");
	T.expect("usersIdGet has role", res).toHaveProperty("role");
	T.expect("usersIdGet has status", res).toHaveProperty("status");
	T.expect("usersIdGet has tags", res).toHaveProperty("tags");
}

{
	const res = await api.usersIdPut({
		params: { id: "1" },
		body: {
			name: "ozan updated",
			age: 26,
			role: "editor",
			tags: ["ts"],
			address: { city: "istanbul", country: "turkey", zip: undefined },
		},
	});
	T.expect("usersIdPut has id", res).toHaveProperty("id", "1");
	T.expect("usersIdPut has updated name", res).toHaveProperty(
		"name",
		"ozan updated",
	);
	T.expect("usersIdPut has updated role", res).toHaveProperty("role", "editor");
}

{
	const res = await api.usersIdDelete({ params: { id: "1" } });
	T.expect("usersIdDelete has deleted", res).toHaveProperty("deleted", "1");
}

{
	const res = await api.usersIdPostsPost({
		params: { id: "42" },
		body: {
			title: "Hello World",
			content: "my first post",
			published: true,
			metadata: { category: "tech", likes: 0, views: 0 },
		},
	});
	T.expect("usersIdPostsPost has id", res).toHaveProperty("id");
	T.expect("usersIdPostsPost has authorId", res).toHaveProperty(
		"authorId",
		"42",
	);
	T.expect("usersIdPostsPost has title", res).toHaveProperty(
		"title",
		"Hello World",
	);
	T.expect("usersIdPostsPost has metadata", res).toHaveProperty("metadata");
}

{
	const res = await api.usersIdPostsPost({
		params: { id: "99" },
		body: {
			title: "Draft",
			content: "not published yet",
			published: false,
			metadata: { category: "life", likes: 5, views: 100 },
		},
	});
	T.expect(
		"usersIdPostsPost unpublished has published=false",
		res,
	).toHaveProperty("published", false);
	T.expect(
		"usersIdPostsPost unpublished has category=life",
		(res as any)?.metadata?.category,
	).toBe("life");
}

// ── Org routes ────────────────────────────────────────────────────────────────

{
	const res = await api.orgsPost({
		body: {
			name: "Acme Corp",
			plan: "pro",
			seats: 10,
			owner: { userId: "u1", role: "admin" },
		},
	});
	T.expect("orgsPost has id", res).toHaveProperty("id");
	T.expect("orgsPost has name", res).toHaveProperty("name", "Acme Corp");
}

{
	const res = await api.orgsPost({
		body: {
			name: "Tiny Ltd",
			plan: "free",
			seats: 1,
			owner: { userId: "u2", role: "viewer" },
		},
	});
	T.expect("orgsPost free plan has id", res).toHaveProperty("id");
}

{
	const res = await api.orgsOrgIdMembersGet({
		params: { orgId: "org1" },
		search: { page: "1", limit: "20" },
	});
	T.expect("orgsOrgIdMembersGet returns array", Array.isArray(res)).toBe(true);
}

{
	const res = await api.orgsOrgIdMembersMemberIdPut({
		params: { orgId: "org1", memberId: "m1" },
		body: { role: "editor", status: "active" },
	});
	T.expect("orgsOrgIdMembersMemberIdPut has orgId", res).toHaveProperty(
		"orgId",
		"org1",
	);
	T.expect("orgsOrgIdMembersMemberIdPut has memberId", res).toHaveProperty(
		"memberId",
		"m1",
	);
	T.expect("orgsOrgIdMembersMemberIdPut has role", res).toHaveProperty(
		"role",
		"editor",
	);
}

{
	const res = await api.orgsOrgIdMembersMemberIdPut({
		params: { orgId: "org1", memberId: "m2" },
		body: { role: "viewer", status: "inactive" },
	});
	T.expect(
		"orgsOrgIdMembersMemberIdPut inactive has status",
		res,
	).toHaveProperty("status", "inactive");
}

{
	const res = await api.orgsOrgIdMembersMemberIdDelete({
		params: { orgId: "org1", memberId: "m1" },
	});
	T.expect("orgsOrgIdMembersMemberIdDelete has removed", res).toHaveProperty(
		"removed",
		"m1",
	);
}

// ─────────────────────────────────────────────────────────────────────────────

T.logResults("CLI GENERATED CLIENT TESTS");

process.exit(T.failed > 0 ? 1 : 0);
