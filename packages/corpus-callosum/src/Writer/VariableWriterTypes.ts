import type { BaseWriterTypes as B } from "./BaseWriterTypes";

export namespace VariableWriterTypes {
	type Base = {
		name: string;
		type?: string;
		value: string | B.BodyWriter;
		isExported?: boolean;
	};

	export type Const = Base;
	export type Let = Base;
	export type Var = Base;
	export type Type = Omit<Base, "type"> & { generics?: string[] };

	export type Namespace = {
		isExported?: boolean;
		name: string;
		body: B.BodyWriter;
	};
}
