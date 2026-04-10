import * as v from "valibot";

export function getValiSchemas() {
	const Role = v.picklist(["admin", "editor", "viewer"]);
	const Status = v.picklist(["active", "inactive", "banned"]);
	const Pagination = v.object({
		page: v.pipe(v.string(), v.transform(Number)),
		limit: v.pipe(v.string(), v.transform(Number)),
	});
	const Timestamp = v.object({ createdAt: v.string(), updatedAt: v.string() });
	const UserParams = v.object({ id: v.string() });
	const UserBody = v.object({
		name: v.string(),
		age: v.number(),
		role: Role,
		tags: v.array(v.string()),
		address: v.object({
			city: v.string(),
			country: v.string(),
			zip: v.optional(v.string()),
		}),
	});
	const UserSearch = v.intersect([
		Pagination,
		v.object({ role: v.optional(Role), status: v.optional(Status) }),
	]);
	const UserResponse = v.intersect([
		v.object({
			id: v.string(),
			name: v.string(),
			age: v.number(),
			role: Role,
			status: Status,
			tags: v.array(v.string()),
		}),
		Timestamp,
	]);
	const PostBody = v.object({
		title: v.string(),
		content: v.string(),
		published: v.boolean(),
		metadata: v.object({
			views: v.number(),
			likes: v.number(),
			category: v.picklist(["tech", "life", "other"]),
		}),
	});
	const PostResponse = v.intersect([
		v.object({
			id: v.string(),
			title: v.string(),
			content: v.string(),
			published: v.boolean(),
			authorId: v.string(),
			metadata: v.object({
				views: v.number(),
				likes: v.number(),
				category: v.picklist(["tech", "life", "other"]),
			}),
		}),
		Timestamp,
	]);
	const OrgParams = v.object({ orgId: v.string() });
	const OrgBody = v.object({
		name: v.string(),
		plan: v.picklist(["free", "pro", "enterprise"]),
		seats: v.number(),
		owner: v.object({
			userId: v.string(),
			role: Role,
		}),
	});
	const OrgMemberParams = v.object({ orgId: v.string(), memberId: v.string() });
	const OrgMemberBody = v.object({ role: Role, status: Status });
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
