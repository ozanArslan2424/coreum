export function generateServiceContent(
	name: string,
	modelImportPath: string,
	repoImportPath: string,
) {
	return `import { C } from "@ozanarslan/corpus";
import type { ${name}Type } from "${modelImportPath}";
import type { ${name}Repository } from "${repoImportPath}";

export class ${name}Service {
	constructor(private readonly repo: ${name}Repository) {}

	async get(
		params: ${name}Type["get"]["params"],
	): Promise<${name}Type["get"]["response"]> {
		const entity = this.repo.findById(params.id);
		if (!entity) {
			throw new C.Error("not found", C.Status.NOT_FOUND);
		}
		return entity;
	}

	async list(
		search: ${name}Type["list"]["search"],
	): Promise<${name}Type["list"]["response"]> {
		return this.repo.findMany({ page: search.page, limit: search.limit });
	}

	async create(
		body: ${name}Type["create"]["body"],
	): Promise<${name}Type["create"]["response"]> {
		return this.repo.create({ name: body.name });
	}

	async update(
		params: ${name}Type["update"]["params"],
		body: ${name}Type["update"]["body"],
	): Promise<${name}Type["update"]["response"]> {
		const entity = this.repo.update(params.id, { name: body.name });
		if (!entity) {
			throw new C.Error("not found", C.Status.NOT_FOUND);
		}
		return entity;
	}

	async delete(
		params: ${name}Type["delete"]["params"],
	): Promise<${name}Type["delete"]["response"]> {
		const deleted = this.repo.delete(params.id);
		if (!deleted) {
			throw new C.Error("internal error", C.Status.INTERNAL_SERVER_ERROR);
		}
	}
}
`;
}
