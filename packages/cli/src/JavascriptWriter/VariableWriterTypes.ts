import type { BaseWriterTypes as B } from "../BaseWriter/BaseWriterTypes";
import type { JavascriptWriter } from "./JavascriptWriter";

export namespace VariableWriterTypes {
	type BodyWriter = B.BodyWriter<JavascriptWriter>;

	type Base = {
		name: string;
		value: string | BodyWriter;
		isExported?: boolean;
	};

	export type Const = Base;
	export type Let = Omit<Base, "value"> & { value?: string | BodyWriter };
	export type Var = Base;
	export type Assign = Pick<Base, "name" | "value">;
}
