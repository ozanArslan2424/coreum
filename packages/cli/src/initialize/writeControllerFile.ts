import type { Config } from "../config";
import type { ModuleInterface } from "../Module/ModuleInterface";
import { TypescriptWriter } from "../TypescriptWriter/TypescriptWriter";

export function writeControllerFile(c: Config, m: ModuleInterface) {
	const w = new TypescriptWriter(m.controller.filePath);

	w.$import({ keys: ["C"], from: c.pkgPath });
	w.$import({
		keys: c.validationLibrary ? [m.model.name] : [m.modelTypeName],
		from: m.model.import(m.controller.filePath),
	});
	w.$import({
		keys: [m.service.name],
		from: m.service.import(m.controller.filePath),
	});

	w.$class({
		isExported: true,
		name: m.controller.name,
		extends: `C.Controller`,
		constr: {
			args: [{ keyword: "private readonly", key: "service", type: m.service.name }],
			superArgs: "",
		},
		body: (w) => {
			w.$member({
				name: "prefix",
				value: `"/example"`,
			});
			w.$member({
				name: "get",
				value: (w) => {
					const v = c.validationLibrary;
					const mt = m.modelTypeName;
					const mm = m.model.name;
					const g = v ? "" : `<unknown, unknown, ${mt}["get"]["params"]>`;
					const e = v ? `, ${mm}.get)` : ")";
					w.line(`this.route${g}("/:id", (c) => this.service.get(c.params)${e}`);
				},
			});
			w.$member({
				name: "list",
				value: (w) => {
					const v = c.validationLibrary;
					const mt = m.modelTypeName;
					const mm = m.model.name;
					const g = v ? "" : `<unknown, ${mt}["list"]["search"]>`;
					const e = v ? `, ${mm}.list)` : ")";
					w.line(`this.route${g}("/", (c) => this.service.list(c.search)${e}`);
				},
			});
			w.$member({
				name: "create",
				value: (w) => {
					const v = c.validationLibrary;
					const mt = m.modelTypeName;
					const mm = m.model.name;
					const g = v ? "" : `<${mt}["create"]["body"]>`;
					const e = v ? `, ${mm}.create)` : ")";
					w.line(
						`this.route${g}({ method: "POST", path: "/" }, (c) => this.service.create(c.body)${e}`,
					);
				},
			});
			w.$member({
				name: "update",
				value: (w) => {
					const v = c.validationLibrary;
					const mt = m.modelTypeName;
					const mm = m.model.name;
					const g = v ? "" : `<${mt}["update"]["body"], unknown, ${mt}["update"]["params"]>`;
					const e = v ? `, ${mm}.update)` : ")";
					w.line(
						`this.route${g}({ method: "PUT", path: "/:id" }, (c) => this.service.update(c.params, c.body)${e}`,
					);
				},
			});
		},
	});

	return w.read();
}
