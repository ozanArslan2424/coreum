export function generateRepositoryContent(
	name: string,
	modelImportPath: string,
) {
	return `import { X } from "@ozanarslan/corpus";
import type { ${name}Type } from "${modelImportPath}";

export class ${name}Repository extends X.Repository {
	findById(id: ${name}Type["entity"]["id"]): ${name}Type["entity"] | null {
		return this.db.examples.get(id) ?? null;
	}

	findMany(filters: {
		page?: number;
		limit?: number;
	}): Array<${name}Type["entity"]> {
		const all = Array.from(this.db.examples.values());
		const page = filters.page ?? 1;
		const limit = filters.limit ?? 20;
		const start = (page - 1) * limit;
		return all.slice(start, start + limit);
	}

	create(data: Omit<${name}Type["entity"], "id">): ${name}Type["entity"] {
		const id = this.db.examples.size.toString();
		this.db.examples.set(id, {
			id,
			name: data.name,
		});
		return { id, name: data.name };
	}

	update(
		id: ${name}Type["entity"]["id"],
		data: Partial<${name}Type["entity"]>,
	): ${name}Type["entity"] | null {
		const exists = this.db.examples.get(id);
		if (!exists) return null;
		const newEntity = { ...exists, ...data };
		this.db.examples.set(id, newEntity);
		return newEntity;
	}

	delete(id: ${name}Type["entity"]["id"]): boolean {
		return this.db.examples.delete(id);
	}
}`;
}
