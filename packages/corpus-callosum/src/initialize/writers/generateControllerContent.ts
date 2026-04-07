export function generateControllerContent(
	name: string,
	modelImportPath: string,
	serviceImportPath: string,
) {
	return `import { C } from "@ozanarslan/corpus";
import { ${name}Model } from "${modelImportPath}";
import type { ${name}Service } from "${serviceImportPath}";

export class ${name}Controller extends C.Controller {
	constructor(private readonly service: ${name}Service) {
		super();
	}

	prefix = "/example";

	get = this.route("/:id", (c) => this.service.get(c.params), ${name}Model.get);

	list = this.route("/", (c) => this.service.list(c.search), ${name}Model.list);

	create = this.route(
		{ method: "POST", path: "/" },
		(c) => this.service.create(c.body),
		${name}Model.create,
	);

	update = this.route(
		{ method: "PUT", path: "/:id" },
		(c) => this.service.update(c.params, c.body),
		${name}Model.update,
	);

	delete = this.route(
		{ method: "DELETE", path: "/:id" },
		(c) => this.service.delete(c.params),
		${name}Model.delete,
	);
}`;
}
