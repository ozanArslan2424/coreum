import { C } from "@ozanarslan/corpus";
type _Prim = string | number | boolean;
type ExtractArgs<T> = (Omit<T, "response"> extends infer U
	? { [K in keyof U as U[K] extends undefined ? never : K]: U[K] }
	: never) & { headers?: HeadersInit; init?: RequestInit };
interface ReqArgs {
	endpoint: string;
	method: string;
	body?: unknown;
	search?: Record<string, unknown>;
	headers?: HeadersInit;
	init?: RequestInit;
}
interface Param1Param2GetModel {
	search?: Record<string, unknown>;
	params: { param1: _Prim; param2: _Prim };
	response: unknown;
}
const makeParam1Param2GetRequest = (
	args: ExtractArgs<Param1Param2GetModel>,
) => {
	return {
		endpoint: `/${String(args.params.param1)}/${String(args.params.param2)}`,
		method: "GET",
		search: args.search,
	};
};
interface HelloParam1Param2GetModel {
	search?: Record<string, unknown>;
	params: { param1: _Prim; param2: _Prim };
	response: unknown;
}
const makeHelloParam1Param2GetRequest = (
	args: ExtractArgs<HelloParam1Param2GetModel>,
) => {
	return {
		endpoint: `/hello/${String(args.params.param1)}/${String(args.params.param2)}`,
		method: "GET",
		search: args.search,
	};
};
interface WorldParam1Param2GetModel {
	search?: Record<string, unknown>;
	params: { param1: _Prim; param2: _Prim };
	response: unknown;
}
const makeWorldParam1Param2GetRequest = (
	args: ExtractArgs<WorldParam1Param2GetModel>,
) => {
	return {
		endpoint: `/world/${String(args.params.param1)}/${String(args.params.param2)}`,
		method: "GET",
		search: args.search,
	};
};
interface LalalaParam1Param2GetModel {
	search?: Record<string, unknown>;
	params: { param1: _Prim; param2: _Prim };
	response: unknown;
}
const makeLalalaParam1Param2GetRequest = (
	args: ExtractArgs<LalalaParam1Param2GetModel>,
) => {
	return {
		endpoint: `/lalala/${String(args.params.param1)}/${String(args.params.param2)}`,
		method: "GET",
		search: args.search,
	};
};
interface YesyesParam2GetModel {
	search?: Record<string, unknown>;
	params: { param2: _Prim };
	response: unknown;
}
const makeYesyesParam2GetRequest = (
	args: ExtractArgs<YesyesParam2GetModel>,
) => {
	return {
		endpoint: `/yesyes/${String(args.params.param2)}`,
		method: "GET",
		search: args.search,
	};
};
interface OkayParam1LetsgoGetModel {
	search?: Record<string, unknown>;
	params: { param1: _Prim };
	response: unknown;
}
const makeOkayParam1LetsgoGetRequest = (
	args: ExtractArgs<OkayParam1LetsgoGetModel>,
) => {
	return {
		endpoint: `/okay/${String(args.params.param1)}/letsgo`,
		method: "GET",
		search: args.search,
	};
};
interface DenemeParam1Param2GetModel {
	search?: Record<string, unknown>;
	params: { param1: _Prim; param2: _Prim };
	response: unknown;
}
const makeDenemeParam1Param2GetRequest = (
	args: ExtractArgs<DenemeParam1Param2GetModel>,
) => {
	return {
		endpoint: `/deneme/${String(args.params.param1)}/${String(args.params.param2)}`,
		method: "GET",
		search: args.search,
	};
};
interface WeGotThisGetModel {
	search?: Record<string, unknown>;
	response: unknown;
}
const makeWeGotThisGetRequest = (args: ExtractArgs<WeGotThisGetModel>) => {
	return {
		endpoint: "/we/got/this",
		method: "GET",
		search: args.search,
	};
};
interface OhmyohmyGetModel {
	search?: Record<string, unknown>;
	response: unknown;
}
const makeOhmyohmyGetRequest = (args: ExtractArgs<OhmyohmyGetModel>) => {
	return {
		endpoint: "/ohmyohmy",
		method: "GET",
		search: args.search,
	};
};
interface _2brosGetModel {
	search?: Record<string, unknown>;
	response: unknown;
}
const make_2brosGetRequest = (args: ExtractArgs<_2brosGetModel>) => {
	return {
		endpoint: "/2bros",
		method: "GET",
		search: args.search,
	};
};
interface ChillinInAHottubGetModel {
	search?: Record<string, unknown>;
	response: unknown;
}
const makeChillinInAHottubGetRequest = (
	args: ExtractArgs<ChillinInAHottubGetModel>,
) => {
	return {
		endpoint: "/chillin/in/a/hottub",
		method: "GET",
		search: args.search,
	};
};
interface _5FeetApartCuzTheyreNotGayGetModel {
	search?: Record<string, unknown>;
	response: unknown;
}
const make_5FeetApartCuzTheyreNotGayGetRequest = (
	args: ExtractArgs<_5FeetApartCuzTheyreNotGayGetModel>,
) => {
	return {
		endpoint: "/5/feet/apart/cuz/theyre/not/gay",
		method: "GET",
		search: args.search,
	};
};
interface Verywild_GetModel {
	search?: Record<string, unknown>;
	params: { "*": _Prim };
	response: unknown;
}
const makeVerywild_GetRequest = (args: ExtractArgs<Verywild_GetModel>) => {
	return {
		endpoint: `/verywild/${String(args.params["*"])}`,
		method: "GET",
		search: args.search,
	};
};
interface Craaaazy_GetModel {
	search?: Record<string, unknown>;
	params: { "*": _Prim };
	response: unknown;
}
const makeCraaaazy_GetRequest = (args: ExtractArgs<Craaaazy_GetModel>) => {
	return {
		endpoint: `/craaaazy/${String(args.params["*"])}`,
		method: "GET",
		search: args.search,
	};
};
interface UsersPostModel {
	body: {
		address: { city: string; country: string; zip?: string };
		age: number;
		name: string;
		role: "admin" | "editor" | "viewer";
		tags: string[];
	};
	search?: Record<string, unknown>;
	response: {
		age: number;
		createdAt: string;
		id: string;
		name: string;
		role: "admin" | "editor" | "viewer";
		status: "active" | "banned" | "inactive";
		tags: string[];
		updatedAt: string;
	};
}
const makeUsersPostRequest = (args: ExtractArgs<UsersPostModel>) => {
	return {
		endpoint: "/users",
		method: "POST",
		search: args.search,
		body: args.body,
	};
};
interface UsersGetModel {
	search: {
		limit: unknown;
		page: unknown;
		role?: "admin" | "editor" | "viewer";
		status?: "active" | "banned" | "inactive";
	};
	response: unknown;
}
const makeUsersGetRequest = (args: ExtractArgs<UsersGetModel>) => {
	return {
		endpoint: "/users",
		method: "GET",
		search: args.search,
	};
};
interface UsersIdGetModel {
	search?: Record<string, unknown>;
	params: { id: string };
	response: {
		age: number;
		createdAt: string;
		id: string;
		name: string;
		role: "admin" | "editor" | "viewer";
		status: "active" | "banned" | "inactive";
		tags: string[];
		updatedAt: string;
	};
}
const makeUsersIdGetRequest = (args: ExtractArgs<UsersIdGetModel>) => {
	return {
		endpoint: `/users/${String(args.params.id)}`,
		method: "GET",
		search: args.search,
	};
};
interface UsersIdPutModel {
	body: {
		address: { city: string; country: string; zip?: string };
		age: number;
		name: string;
		role: "admin" | "editor" | "viewer";
		tags: string[];
	};
	search?: Record<string, unknown>;
	params: { id: string };
	response: {
		age: number;
		createdAt: string;
		id: string;
		name: string;
		role: "admin" | "editor" | "viewer";
		status: "active" | "banned" | "inactive";
		tags: string[];
		updatedAt: string;
	};
}
const makeUsersIdPutRequest = (args: ExtractArgs<UsersIdPutModel>) => {
	return {
		endpoint: `/users/${String(args.params.id)}`,
		method: "PUT",
		search: args.search,
		body: args.body,
	};
};
interface UsersIdDeleteModel {
	search?: Record<string, unknown>;
	params: { id: string };
	response: unknown;
}
const makeUsersIdDeleteRequest = (args: ExtractArgs<UsersIdDeleteModel>) => {
	return {
		endpoint: `/users/${String(args.params.id)}`,
		method: "DELETE",
		search: args.search,
	};
};
interface UsersIdPostsPostModel {
	body: {
		content: string;
		metadata: {
			category: "life" | "other" | "tech";
			likes: number;
			views: number;
		};
		published: boolean;
		title: string;
	};
	search?: Record<string, unknown>;
	params: { id: string };
	response: {
		authorId: string;
		content: string;
		createdAt: string;
		id: string;
		metadata: {
			category: "life" | "other" | "tech";
			likes: number;
			views: number;
		};
		published: boolean;
		title: string;
		updatedAt: string;
	};
}
const makeUsersIdPostsPostRequest = (
	args: ExtractArgs<UsersIdPostsPostModel>,
) => {
	return {
		endpoint: `/users/${String(args.params.id)}/posts`,
		method: "POST",
		search: args.search,
		body: args.body,
	};
};
interface OrgsPostModel {
	body: {
		name: string;
		owner: { role: "admin" | "editor" | "viewer"; userId: string };
		plan: "enterprise" | "free" | "pro";
		seats: number;
	};
	search?: Record<string, unknown>;
	response: unknown;
}
const makeOrgsPostRequest = (args: ExtractArgs<OrgsPostModel>) => {
	return {
		endpoint: "/orgs",
		method: "POST",
		search: args.search,
		body: args.body,
	};
};
interface OrgsOrgIdMembersGetModel {
	search: { limit: unknown; page: unknown };
	params: { orgId: string };
	response: unknown;
}
const makeOrgsOrgIdMembersGetRequest = (
	args: ExtractArgs<OrgsOrgIdMembersGetModel>,
) => {
	return {
		endpoint: `/orgs/${String(args.params.orgId)}/members`,
		method: "GET",
		search: args.search,
	};
};
interface OrgsOrgIdMembersMemberIdPutModel {
	body: {
		role: "admin" | "editor" | "viewer";
		status: "active" | "banned" | "inactive";
	};
	search?: Record<string, unknown>;
	params: { memberId: string; orgId: string };
	response: unknown;
}
const makeOrgsOrgIdMembersMemberIdPutRequest = (
	args: ExtractArgs<OrgsOrgIdMembersMemberIdPutModel>,
) => {
	return {
		endpoint: `/orgs/${String(args.params.orgId)}/members/${String(args.params.memberId)}`,
		method: "PUT",
		search: args.search,
		body: args.body,
	};
};
interface OrgsOrgIdMembersMemberIdDeleteModel {
	search?: Record<string, unknown>;
	params: { memberId: string; orgId: string };
	response: unknown;
}
const makeOrgsOrgIdMembersMemberIdDeleteRequest = (
	args: ExtractArgs<OrgsOrgIdMembersMemberIdDeleteModel>,
) => {
	return {
		endpoint: `/orgs/${String(args.params.orgId)}/members/${String(args.params.memberId)}`,
		method: "DELETE",
		search: args.search,
	};
};
class CorpusApi {
	constructor(public readonly baseUrl: string) {}
	public fetchFn: <R = unknown>(args: ReqArgs) => Promise<R> = async (args) => {
		const url = new URL(args.endpoint, this.baseUrl);
		const headers = new Headers(args.headers);
		const method: RequestInit["method"] = args.method;
		let body: RequestInit["body"];

		if (args.search) {
			for (const [key, val] of Object.entries(args.search)) {
				if (val == null) {
					continue;
				}
				url.searchParams.append(key, String(val));
			}
		}

		if (args.body) {
			if (!headers.has("Content-Type") || !headers.has("content-type")) {
				headers.set("Content-Type", "application/json");
			}
			body = JSON.stringify(args.body);
		}
		const res = await fetch(url, { method, headers, body, ...args.init });
		return await C.Parser.parseBody(res);
	};
	public setFetchFn(cb: <R = unknown>(args: ReqArgs) => Promise<R>) {
		return (this.fetchFn = cb);
	}
	public readonly endpoints = {
		param1Param2Get: (p: ExtractArgs<Param1Param2GetModel>["params"]) =>
			`/${String(p.param1)}/${String(p.param2)}`,
		helloParam1Param2Get: (
			p: ExtractArgs<HelloParam1Param2GetModel>["params"],
		) => `/hello/${String(p.param1)}/${String(p.param2)}`,
		worldParam1Param2Get: (
			p: ExtractArgs<WorldParam1Param2GetModel>["params"],
		) => `/world/${String(p.param1)}/${String(p.param2)}`,
		lalalaParam1Param2Get: (
			p: ExtractArgs<LalalaParam1Param2GetModel>["params"],
		) => `/lalala/${String(p.param1)}/${String(p.param2)}`,
		yesyesParam2Get: (p: ExtractArgs<YesyesParam2GetModel>["params"]) =>
			`/yesyes/${String(p.param2)}`,
		okayParam1LetsgoGet: (p: ExtractArgs<OkayParam1LetsgoGetModel>["params"]) =>
			`/okay/${String(p.param1)}/letsgo`,
		denemeParam1Param2Get: (
			p: ExtractArgs<DenemeParam1Param2GetModel>["params"],
		) => `/deneme/${String(p.param1)}/${String(p.param2)}`,
		weGotThisGet: "/we/got/this",
		ohmyohmyGet: "/ohmyohmy",
		_2brosGet: "/2bros",
		chillinInAHottubGet: "/chillin/in/a/hottub",
		_5FeetApartCuzTheyreNotGayGet: "/5/feet/apart/cuz/theyre/not/gay",
		verywild_Get: (p: ExtractArgs<Verywild_GetModel>["params"]) =>
			`/verywild/${String(p["*"])}`,
		craaaazy_Get: (p: ExtractArgs<Craaaazy_GetModel>["params"]) =>
			`/craaaazy/${String(p["*"])}`,
		usersPost: "/users",
		usersGet: "/users",
		usersIdGet: (p: ExtractArgs<UsersIdGetModel>["params"]) =>
			`/users/${String(p.id)}`,
		usersIdPut: (p: ExtractArgs<UsersIdPutModel>["params"]) =>
			`/users/${String(p.id)}`,
		usersIdDelete: (p: ExtractArgs<UsersIdDeleteModel>["params"]) =>
			`/users/${String(p.id)}`,
		usersIdPostsPost: (p: ExtractArgs<UsersIdPostsPostModel>["params"]) =>
			`/users/${String(p.id)}/posts`,
		orgsPost: "/orgs",
		orgsOrgIdMembersGet: (p: ExtractArgs<OrgsOrgIdMembersGetModel>["params"]) =>
			`/orgs/${String(p.orgId)}/members`,
		orgsOrgIdMembersMemberIdPut: (
			p: ExtractArgs<OrgsOrgIdMembersMemberIdPutModel>["params"],
		) => `/orgs/${String(p.orgId)}/members/${String(p.memberId)}`,
		orgsOrgIdMembersMemberIdDelete: (
			p: ExtractArgs<OrgsOrgIdMembersMemberIdDeleteModel>["params"],
		) => `/orgs/${String(p.orgId)}/members/${String(p.memberId)}`,
	};
	public param1Param2Get = (args: ExtractArgs<Param1Param2GetModel>) => {
		return this.fetchFn<Param1Param2GetModel["response"]>(
			makeParam1Param2GetRequest(args),
		);
	};
	public helloParam1Param2Get = (
		args: ExtractArgs<HelloParam1Param2GetModel>,
	) => {
		return this.fetchFn<HelloParam1Param2GetModel["response"]>(
			makeHelloParam1Param2GetRequest(args),
		);
	};
	public worldParam1Param2Get = (
		args: ExtractArgs<WorldParam1Param2GetModel>,
	) => {
		return this.fetchFn<WorldParam1Param2GetModel["response"]>(
			makeWorldParam1Param2GetRequest(args),
		);
	};
	public lalalaParam1Param2Get = (
		args: ExtractArgs<LalalaParam1Param2GetModel>,
	) => {
		return this.fetchFn<LalalaParam1Param2GetModel["response"]>(
			makeLalalaParam1Param2GetRequest(args),
		);
	};
	public yesyesParam2Get = (args: ExtractArgs<YesyesParam2GetModel>) => {
		return this.fetchFn<YesyesParam2GetModel["response"]>(
			makeYesyesParam2GetRequest(args),
		);
	};
	public okayParam1LetsgoGet = (
		args: ExtractArgs<OkayParam1LetsgoGetModel>,
	) => {
		return this.fetchFn<OkayParam1LetsgoGetModel["response"]>(
			makeOkayParam1LetsgoGetRequest(args),
		);
	};
	public denemeParam1Param2Get = (
		args: ExtractArgs<DenemeParam1Param2GetModel>,
	) => {
		return this.fetchFn<DenemeParam1Param2GetModel["response"]>(
			makeDenemeParam1Param2GetRequest(args),
		);
	};
	public weGotThisGet = (args: ExtractArgs<WeGotThisGetModel>) => {
		return this.fetchFn<WeGotThisGetModel["response"]>(
			makeWeGotThisGetRequest(args),
		);
	};
	public ohmyohmyGet = (args: ExtractArgs<OhmyohmyGetModel>) => {
		return this.fetchFn<OhmyohmyGetModel["response"]>(
			makeOhmyohmyGetRequest(args),
		);
	};
	public _2brosGet = (args: ExtractArgs<_2brosGetModel>) => {
		return this.fetchFn<_2brosGetModel["response"]>(make_2brosGetRequest(args));
	};
	public chillinInAHottubGet = (
		args: ExtractArgs<ChillinInAHottubGetModel>,
	) => {
		return this.fetchFn<ChillinInAHottubGetModel["response"]>(
			makeChillinInAHottubGetRequest(args),
		);
	};
	public _5FeetApartCuzTheyreNotGayGet = (
		args: ExtractArgs<_5FeetApartCuzTheyreNotGayGetModel>,
	) => {
		return this.fetchFn<_5FeetApartCuzTheyreNotGayGetModel["response"]>(
			make_5FeetApartCuzTheyreNotGayGetRequest(args),
		);
	};
	public verywild_Get = (args: ExtractArgs<Verywild_GetModel>) => {
		return this.fetchFn<Verywild_GetModel["response"]>(
			makeVerywild_GetRequest(args),
		);
	};
	public craaaazy_Get = (args: ExtractArgs<Craaaazy_GetModel>) => {
		return this.fetchFn<Craaaazy_GetModel["response"]>(
			makeCraaaazy_GetRequest(args),
		);
	};
	public usersPost = (args: ExtractArgs<UsersPostModel>) => {
		return this.fetchFn<UsersPostModel["response"]>(makeUsersPostRequest(args));
	};
	public usersGet = (args: ExtractArgs<UsersGetModel>) => {
		return this.fetchFn<UsersGetModel["response"]>(makeUsersGetRequest(args));
	};
	public usersIdGet = (args: ExtractArgs<UsersIdGetModel>) => {
		return this.fetchFn<UsersIdGetModel["response"]>(
			makeUsersIdGetRequest(args),
		);
	};
	public usersIdPut = (args: ExtractArgs<UsersIdPutModel>) => {
		return this.fetchFn<UsersIdPutModel["response"]>(
			makeUsersIdPutRequest(args),
		);
	};
	public usersIdDelete = (args: ExtractArgs<UsersIdDeleteModel>) => {
		return this.fetchFn<UsersIdDeleteModel["response"]>(
			makeUsersIdDeleteRequest(args),
		);
	};
	public usersIdPostsPost = (args: ExtractArgs<UsersIdPostsPostModel>) => {
		return this.fetchFn<UsersIdPostsPostModel["response"]>(
			makeUsersIdPostsPostRequest(args),
		);
	};
	public orgsPost = (args: ExtractArgs<OrgsPostModel>) => {
		return this.fetchFn<OrgsPostModel["response"]>(makeOrgsPostRequest(args));
	};
	public orgsOrgIdMembersGet = (
		args: ExtractArgs<OrgsOrgIdMembersGetModel>,
	) => {
		return this.fetchFn<OrgsOrgIdMembersGetModel["response"]>(
			makeOrgsOrgIdMembersGetRequest(args),
		);
	};
	public orgsOrgIdMembersMemberIdPut = (
		args: ExtractArgs<OrgsOrgIdMembersMemberIdPutModel>,
	) => {
		return this.fetchFn<OrgsOrgIdMembersMemberIdPutModel["response"]>(
			makeOrgsOrgIdMembersMemberIdPutRequest(args),
		);
	};
	public orgsOrgIdMembersMemberIdDelete = (
		args: ExtractArgs<OrgsOrgIdMembersMemberIdDeleteModel>,
	) => {
		return this.fetchFn<OrgsOrgIdMembersMemberIdDeleteModel["response"]>(
			makeOrgsOrgIdMembersMemberIdDeleteRequest(args),
		);
	};
}
export type {
	ReqArgs,
	Param1Param2GetModel,
	HelloParam1Param2GetModel,
	WorldParam1Param2GetModel,
	LalalaParam1Param2GetModel,
	YesyesParam2GetModel,
	OkayParam1LetsgoGetModel,
	DenemeParam1Param2GetModel,
	WeGotThisGetModel,
	OhmyohmyGetModel,
	_2brosGetModel,
	ChillinInAHottubGetModel,
	_5FeetApartCuzTheyreNotGayGetModel,
	Verywild_GetModel,
	Craaaazy_GetModel,
	UsersPostModel,
	UsersGetModel,
	UsersIdGetModel,
	UsersIdPutModel,
	UsersIdDeleteModel,
	UsersIdPostsPostModel,
	OrgsPostModel,
	OrgsOrgIdMembersGetModel,
	OrgsOrgIdMembersMemberIdPutModel,
	OrgsOrgIdMembersMemberIdDeleteModel,
};
export {
	makeParam1Param2GetRequest,
	makeHelloParam1Param2GetRequest,
	makeWorldParam1Param2GetRequest,
	makeLalalaParam1Param2GetRequest,
	makeYesyesParam2GetRequest,
	makeOkayParam1LetsgoGetRequest,
	makeDenemeParam1Param2GetRequest,
	makeWeGotThisGetRequest,
	makeOhmyohmyGetRequest,
	make_2brosGetRequest,
	makeChillinInAHottubGetRequest,
	make_5FeetApartCuzTheyreNotGayGetRequest,
	makeVerywild_GetRequest,
	makeCraaaazy_GetRequest,
	makeUsersPostRequest,
	makeUsersGetRequest,
	makeUsersIdGetRequest,
	makeUsersIdPutRequest,
	makeUsersIdDeleteRequest,
	makeUsersIdPostsPostRequest,
	makeOrgsPostRequest,
	makeOrgsOrgIdMembersGetRequest,
	makeOrgsOrgIdMembersMemberIdPutRequest,
	makeOrgsOrgIdMembersMemberIdDeleteRequest,
	CorpusApi,
};
