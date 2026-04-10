import type { Config } from "../Config/Config";
import type { ModuleInterface } from "../Module/ModuleInterface";
import { Writer } from "../Writer/Writer";

export function writeServiceFile(c: Config, m: ModuleInterface) {
	const w = new Writer(m.service.filePath);
	w.$import({ keys: ["C"], from: c.pkgPath });
	w.$import({
		isType: true,
		keys: [m.modelTypeName],
		from: m.model.import(m.service.filePath),
	});
	w.$import({
		keys: [m.repository.name],
		from: m.repository.import(m.service.filePath),
	});

	w.$class({
		isExported: true,
		name: m.service.name,
		constr: {
			args: [
				{ keyword: "private readonly", key: "repo", type: m.repository.name },
			],
		},
		body: (w) => {
			w.$function({
				variant: "method",
				isAsync: true,
				name: "get",
				args: [`params: ${m.modelTypeName}["get"]["params"]`],
				type: `Promise<${m.modelTypeName}["get"]["response"]>`,
				body: (w) => {
					w.$const({ name: "entity", value: "this.repo.findById(params.id)" });
					w.$if("!entity").then((w) => {
						w.$throw({
							errorType: "C.Error",
							args: `"not found", C.Status.NOT_FOUND`,
						});
					});
					w.$return("entity");
				},
			});

			w.$function({
				variant: "method",
				isAsync: true,
				name: "list",
				args: [`search: ${m.modelTypeName}["list"]["search"]`],
				type: `Promise<${m.modelTypeName}["list"]["response"]>`,
				body: (w) => {
					w.$return(
						"this.repo.findMany({ page: search.page, limit: search.limit })",
					);
				},
			});

			w.$function({
				variant: "method",
				isAsync: true,
				name: "create",
				args: [`body: ${m.modelTypeName}["create"]["body"]`],
				type: `Promise<${m.modelTypeName}["create"]["response"]>`,
				body: (w) => {
					w.$return("this.repo.create({ name: body.name })");
				},
			});

			w.$function({
				variant: "method",
				isAsync: true,
				name: "update",
				args: [
					`params: ${m.modelTypeName}["update"]["params"]`,
					`body: ${m.modelTypeName}["update"]["body"]`,
				],
				type: `Promise<${m.modelTypeName}["update"]["response"]>`,
				body: (w) => {
					w.$const({
						name: "entity",
						value: "this.repo.update(params.id, { name: body.name })",
					});
					w.$if("!entity").then((w) => {
						w.$throw({
							errorType: "C.Error",
							args: `"not found", C.Status.NOT_FOUND`,
						});
					});
					w.$return("entity");
				},
			});

			w.$function({
				variant: "method",
				isAsync: true,
				name: "delete",
				args: [`params: ${m.modelTypeName}["delete"]["params"]`],
				type: `Promise<${m.modelTypeName}["delete"]["response"]>`,
				body: (w) => {
					w.$const({ name: "deleted", value: "this.repo.delete(params.id)" });
					w.$if("!deleted").then((w) => {
						w.$throw({
							errorType: "C.Error",
							args: `"internal error", C.Status.INTERNAL_SERVER_ERROR`,
						});
					});
					w.$return("entity");
				},
			});
		},
	});

	return w.read();
}
