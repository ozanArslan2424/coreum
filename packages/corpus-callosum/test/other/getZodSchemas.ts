import { z } from "zod";

export function getZodSchemas() {
	const Role = z.enum(["admin", "editor", "viewer"]);
	const Status = z.enum(["active", "inactive", "banned"]);
	const Pagination = z.object({
		page: z.string().transform(Number),
		limit: z.string().transform(Number),
	});
	const Timestamp = z.object({ createdAt: z.string(), updatedAt: z.string() });
	const UserParams = z.object({ id: z.string() });
	const UserBody = z.object({
		name: z.string(),
		age: z.number(),
		role: Role,
		tags: z.array(z.string()),
		address: z.object({
			city: z.string(),
			country: z.string(),
			zip: z.string().optional(),
		}),
	});
	const UserSearch = Pagination.and(z.object({ role: Role.optional(), status: Status.optional() }));
	const UserResponse = z
		.object({
			id: z.string(),
			name: z.string(),
			age: z.number(),
			role: Role,
			status: Status,
			tags: z.array(z.string()),
		})
		.and(Timestamp);
	const PostBody = z.object({
		title: z.string(),
		content: z.string(),
		published: z.boolean(),
		metadata: z.object({
			views: z.number(),
			likes: z.number(),
			category: z.enum(["tech", "life", "other"]),
		}),
	});
	const PostResponse = z
		.object({
			id: z.string(),
			title: z.string(),
			content: z.string(),
			published: z.boolean(),
			authorId: z.string(),
			metadata: z.object({
				views: z.number(),
				likes: z.number(),
				category: z.enum(["tech", "life", "other"]),
			}),
		})
		.and(Timestamp);
	const OrgParams = z.object({ orgId: z.string() });
	const OrgBody = z.object({
		name: z.string(),
		plan: z.enum(["free", "pro", "enterprise"]),
		seats: z.number(),
		owner: z.object({
			userId: z.string(),
			role: Role,
		}),
	});
	const OrgMemberParams = z.object({ orgId: z.string(), memberId: z.string() });
	const OrgMemberBody = z.object({ role: Role, status: Status });
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
