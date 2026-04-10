import { type } from "arktype";

export function getArkSchemas() {
	const Role = type("'admin' | 'editor' | 'viewer'");
	const Status = type("'active' | 'inactive' | 'banned'");
	const Pagination = type({
		page: type("string").pipe(Number),
		limit: type("string").pipe(Number),
	});
	const Timestamp = type({ createdAt: "string", updatedAt: "string" });
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

	return {
		Role,
		Status,
		Pagination,
		Timestamp,
		UserParams,
		UserBody,
		UserSearch,
		UserResponse,
		PostBody,
		PostResponse,
		OrgParams,
		OrgBody,
		OrgMemberParams,
		OrgMemberBody,
	};
}
