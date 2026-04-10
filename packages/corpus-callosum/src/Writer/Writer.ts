import type {
	ArrayOpts,
	BodyWriter,
	ClassOpts,
	ClassConstrOpts,
	CommentOpts,
	ExportOpts,
	ForParan,
	FuncOpts,
	IfBuilder,
	IfCondition,
	ImpOpts,
	InterfaceOpts,
	ObjOpts,
	ReturnOpts,
	SwitchCase,
	ThrowOpts,
	TryCatchOpts,
	VarClsMember,
	VarConst,
	VarLet,
	VarOpts,
	VarVar,
} from "./WriterTypes";
import type { WriterInterface } from "./WriterInterface";
import fs from "node:fs";

export class Writer implements WriterInterface {
	constructor(indentOrFilePath?: number | string) {
		if (typeof indentOrFilePath === "string") {
			this.writeToFilePath = indentOrFilePath;
			fs.writeFileSync(indentOrFilePath, "");
		} else {
			this.indent = indentOrFilePath ?? 0;
		}
	}

	private readonly indent: number = 0;
	private readonly writeToFilePath?: string;

	private fileLineCount = 0;
	private readonly O: string[] = [];
	variables: Set<string> = new Set();
	interfaces: Set<string> = new Set();
	tabChar = "\t";

	read(join: string = "\n") {
		return this.O.join(join);
	}

	appendRaw(...strings: string[]) {
		this.O.push(...strings);
		if (this.writeToFilePath) {
			fs.appendFileSync(this.writeToFilePath, strings.join("\n") + "\n");
			this.fileLineCount += strings.length;
		}
	}

	append(...strings: string[]) {
		const tabs = new Array(this.indent).fill(this.tabChar).join("");
		const tabbed = strings.map((str) => `${tabs}${str}`);
		this.O.push(...tabbed);
		if (this.writeToFilePath) {
			fs.appendFileSync(this.writeToFilePath, tabbed.join("\n") + "\n");
			this.fileLineCount += tabbed.length;
		}
	}

	inline(...strings: string[]) {
		if (this.O.length === 0) this.O.push("");
		this.O[this.O.length - 1] += strings.join("");
		if (this.writeToFilePath) {
			const content = fs.readFileSync(this.writeToFilePath, "utf-8");
			const lines = content.split("\n");
			lines[this.fileLineCount - 1] = this.O[this.O.length - 1]!;
			fs.writeFileSync(this.writeToFilePath, lines.join("\n"));
		}
	}

	pair(k: string, v?: string) {
		if (v) {
			this.append(`${k}: ${v},`);
		} else {
			this.append(`${k},`);
		}
	}

	tab(str: string, indent: number = 1) {
		const tabs = new Array(this.indent + indent).fill(this.tabChar).join("");
		this.append(`${tabs}${str}`);
	}

	$function(o: FuncOpts) {
		switch (o.variant) {
			case "function":
				this.variables.add(o.name);

				this.append(`${o.isAsync ? `async ` : ``}function `);
				this.inline(
					o.name,
					o.generics ? `<${o.generics.join(", ")}>` : "",
					"(",
					o.args ? o.args.join(", ") : "",
					")",
					o.type ? `: ${o.type} ` : " ",
					"{",
				);
				break;
			case "const":
				this.variables.add(o.name);

				this.append("const ");
				this.inline(
					o.name,
					o.type ? `: ${o.type}` : "",
					" = ",
					o.isAsync ? "async " : "",
					o.generics ? `<${o.generics.join(", ")}>` : "",
					"(",
					o.args ? o.args.join(", ") : "",
					") => {",
				);
				break;
			case "anon":
				this.append(o.isAsync ? "async " : "");
				this.inline(
					o.generics ? `<${o.generics.join(", ")}>` : "",
					"(",
					o.args ? o.args.join(", ") : "",
					")",
					o.type ? `: ${o.type} ` : " ",
					"=> {",
				);
				break;
			case "method":
				this.append(o.keyword ? `${o.keyword} ` : "");
				this.inline(
					o.isAsync ? "async " : "",
					o.name,
					o.generics ? `<${o.generics.join(", ")}>` : " ",
					`(${o.args ? o.args.join(", ") : ""})`,
					o.type ? `: ${o.type}` : " ",
					"{",
				);
				break;
			case "constMethod":
				this.append(o.keyword ? `${o.keyword} ` : "");
				this.inline(
					o.name,
					o.type ? `: ${o.type}` : "",
					" = ",
					o.isAsync ? "async " : "",
					o.generics ? ` <${o.generics.join(", ")}>` : "",
					"(",
					o.args ? o.args.join(", ") : "",
					") => {",
				);
				break;
			case "abstractMethod":
				this.append("abstract ");
				this.inline(
					o.keyword ? `${o.keyword} ` : "",
					o.isAsync ? "async " : "",
					o.name,
					o.generics ? ` <${o.generics.join(", ")}>` : " ",
					`(${o.args ? o.args.join(", ") : ""})`,
					o.type ? `: ${o.type}` : " ",
					"{",
				);
				break;
		}
		if (o.variant !== "abstractMethod") {
			const w = new Writer(this.indent + 1);
			o.body(w);
			this.appendRaw(w.read());
		}
		this.append(`}`);
	}

	$object(o: ObjOpts) {
		switch (o.variant) {
			case "const":
				this.variables.add(o.name);

				this.append(`const ${o.name}: {`);
				break;
			case "objectMember":
				this.append(`${o.name}: {`);
				break;
			case "classMember":
				this.append(`${o.keyword ? `${o.keyword} ` : ``}${o.name} = {`);
				break;
			case "anon":
				this.append(`{`);
				break;
		}

		const w = new Writer(this.indent + 1);
		o.body(w);
		this.appendRaw(w.read());
		this.append(`}${o.variant !== "anon" ? `;` : ``}`);
	}

	$constructor(o: ClassConstrOpts) {
		this.tab(
			`constructor(${o.args ? o.args.map((a) => `${a.keyword ? `${a.keyword} ` : ``}${a.key}: ${a.type}`) : ``}) {`,
		);

		if (o.superArgs !== undefined) {
			this.tab(`super(${o.superArgs})`, 1);
		}

		if (o.body) {
			const w = new Writer(this.indent + 1);
			o.body(w);
			this.appendRaw(w.read());
		}

		this.tab(`}`);
	}

	$class(o: ClassOpts) {
		this.variables.add(o.name);

		this.append(
			`${o.isExported ? `export ` : ``}${o.isAbstract ? `abstract ` : ``}class ${o.name} ${o.extends ? `extends ${o.extends} ` : ``} ${o.implements ? `implements ${o.implements} ` : ``}{`,
		);

		if (o.constr) {
			this.$constructor(o.constr);
		}

		const w = new Writer(this.indent + 1);
		o.body(w);
		this.appendRaw(w.read());

		this.append(`}`);
	}

	$interface(o: InterfaceOpts) {
		if (o.variant === "anon") {
			this.append(`{`);
		} else if (o.variant === "inner") {
			this.inline(o.name, ": {");
		} else {
			this.interfaces.add(o.name);
			this.append(`${o.isExported ? "export " : ""}${o.variant} `);
			this.inline(
				o.name,
				o.generics ? `<${o.generics.join(", ")}> ` : " ",
				o.variant === "type" ? "= {" : "{",
			);
		}
		const w = new Writer(this.indent + 1);
		o.body(w);
		this.appendRaw(w.read());
		this.append(`}`);
	}

	$if(...conditions: IfCondition[]): IfBuilder {
		const self = this;
		self.append("");

		return {
			then(body) {
				const conditionStr = conditions.join(" ");
				self.append(`if (${conditionStr}) {`);
				const w = new Writer(self.indent + 1);
				body(w);
				self.appendRaw(w.read());
				self.append(`}`);

				return {
					elseif(...newConditions) {
						return {
							then(newBody) {
								const conditionStr2 = newConditions.join(" ");
								self.append(`else if (${conditionStr2}) {`);
								const w = new Writer(self.indent + 1);
								newBody(w);
								self.appendRaw(w.read());
								self.append(`}`);

								return {
									elseif(...newConditions2: IfCondition[]) {
										return this.elseif(...newConditions2);
									},
									else(finalBody: BodyWriter) {
										self.append(`else {`);
										const w = new Writer(self.indent + 1);
										finalBody(w);
										self.appendRaw(w.read());
										self.append(`}`);
									},
								};
							},
						};
					},
					else(finalBody) {
						self.append(`else {`);
						const w = new Writer(self.indent + 1);
						finalBody(w);
						self.appendRaw(w.read());
						self.append(`}`);
					},
				};
			},
		};
	}

	$for(paran: ForParan[], body: BodyWriter) {
		this.append(`for (${paran.join(" ")}) {`);
		const w = new Writer(this.indent + 1);
		body(w);
		this.appendRaw(w.read());
		this.append(`}`);
	}

	$import(o: ImpOpts) {
		this.append("import ");
		this.inline(o.isType ? "type " : "", o.def ? o.def : "");

		if (o.keys) {
			if (o.def) {
				this.inline(", ");
			}

			this.inline("{ ");

			for (const [i, k] of o.keys.entries()) {
				if (typeof k === "string") {
					this.inline(k);
				} else if (k.as) {
					this.inline(k.isType ? "type " : "", k.key, " as ", k.as);
				} else {
					this.inline(k.isType ? "type " : "", k.key);
				}
				if (i !== o.keys.length - 1) {
					this.inline(", ");
				}
			}

			this.inline(" }");
		}

		this.inline(` from "${o.from}";`);
	}

	$variable(o: VarOpts): void {
		this.variables.add(o.name);

		let value: string;
		if (typeof o.value === "string") {
			value = o.value;
		} else {
			const w = new Writer(this.indent + 1);
			o.value(w);
			value = w.read();
		}

		if (o.variant === "classMember") {
			this.append(
				`${o.keyword ? `${o.keyword} ` : ""}${o.name}${o.type ? `:${o.type}` : ``} = ${value};`,
			);
		} else {
			this.append(
				`${o.variant} ${o.name}${o.type ? `:${o.type}` : ``} = ${value};`,
			);
		}
	}

	$const(o: VarConst): void {
		this.$variable({ variant: "const", ...o });
	}

	$var(o: VarVar): void {
		this.$variable({ variant: "var", ...o });
	}

	$let(o: VarLet): void {
		this.$variable({ variant: "let", ...o });
	}

	$member(o: VarClsMember): void {
		this.$variable({ variant: "classMember", ...o });
	}

	$array(o: ArrayOpts): void {
		const items = o.items.join(", ");
		if (o.variant === "anon") {
			this.append(`[${items}]`);
		} else {
			this.variables.add(o.name);
			this.append(
				`${o.variant} ${o.name}${o.type ? `: ${o.type}[]` : ``} = [${items}];`,
			);
		}
	}

	$switch(expr: string, ...cases: SwitchCase[]): void {
		this.append(`switch (${expr}) {`);
		for (const c of cases) {
			if (c.condition === "default") {
				this.tab(`default: {`, 1);
			} else {
				this.tab(`case ${c.condition}: {`, 1);
			}
			const w = new Writer(this.indent + 2);
			c.body(w);
			this.appendRaw(w.read());
			if (c.break !== false) this.tab(`break;`, 2);
			this.tab(`}`, 1);
		}
		this.append(`}`);
	}

	$tryCatch(o: TryCatchOpts): void {
		this.append(`try {`);
		const tw = new Writer(this.indent + 1);
		o.try(tw);
		this.appendRaw(tw.read());
		this.append(`}`);

		if (o.catch) {
			this.append(`catch (${o.catch.arg ?? `e`}) {`);
			const cw = new Writer(this.indent + 1);
			o.catch.body(cw);
			this.appendRaw(cw.read());
			this.append(`}`);
		}

		if (o.finally) {
			this.append(`finally {`);
			const fw = new Writer(this.indent + 1);
			o.finally(fw);
			this.appendRaw(fw.read());
			this.append(`}`);
		}
	}

	$return(o: ReturnOpts): void {
		if (typeof o === "string") {
			this.append(`return ${o};`);
			return;
		}

		switch (o.variant) {
			case "void":
				this.append(`return;`);
				break;
			case "value":
				this.append(`return ${o.value};`);
				break;
			case "object":
				this.append(`return {`);
				const w = new Writer(this.indent + 1);
				o.body(w);
				this.appendRaw(w.read());
				this.append(`};`);
				break;
		}
	}

	$throw(o: ThrowOpts): void {
		this.append(`throw new ${o.errorType ?? `Error`}(${o.args});`);
	}

	$comment(o: CommentOpts): void {
		switch (o.variant) {
			case "line":
				this.append(`// ${o.text}`);
				break;
			case "block":
				this.append(`/*`);
				for (const line of o.lines) this.append(` * ${line}`);
				this.append(` */`);
				break;
			case "jsdoc":
				this.append(`/**`);
				for (const line of o.lines) this.append(` * ${line}`);
				this.append(` */`);
				break;
		}
	}

	$export(o: ExportOpts): void {
		switch (o.variant) {
			case "type":
				this.append(`export type { ${o.keys.join(", ")} };`);
				break;
			case "obj":
				this.append(`export { ${o.keys.join(", ")} };`);
				break;
			case "named":
				this.append(`export const ${o.name} = { ${o.keys.join(", ")} };`);
				break;
			case "default":
				this.append(
					`export default ${
						o.keys.length > 1 ? `{ ${o.keys.join(", ")} }` : o.keys
					};`,
				);
				break;
			case "reexport":
				this.append(`export { ${o.keys.join(", ")} } from "${o.from}";`);
				break;
			case "reexportStar":
				this.append(`export * from "${o.from}";`);
				break;
		}
	}
}
