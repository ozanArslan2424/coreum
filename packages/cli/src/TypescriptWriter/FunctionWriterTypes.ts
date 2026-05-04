import type { OrString } from "corpus-utils/OrString";

import type { BaseWriterTypes as B } from "../BaseWriter/BaseWriterTypes";
import type { TypescriptWriter } from "./TypescriptWriter";

export namespace FunctionWriterTypes {
	type BodyWriter = B.BodyWriter<TypescriptWriter>;

	type FunctionBase = {
		args?: B.TypedArg[];
		generics?: string[];
		isAsync?: boolean;
		type?: string;
		body: BodyWriter;
	};

	export type Function = FunctionBase & { name: string };

	export type Arrow = Omit<FunctionBase, "args"> & {
		keyword?: "const" | "let" | "var";
		name: string;
		args?: OrString<B.TypedArg>[];
	};
}
