import type { OrString } from "corpus-utils/OrString";
import type { BaseWriterTypes as B } from "./BaseWriterTypes";

export namespace FunctionWriterTypes {
	type FunctionBase = {
		args?: B.Arg[];
		generics?: string[];
		isAsync?: boolean;
		type?: string;
		body: B.BodyWriter;
	};

	export type Function = FunctionBase & { name: string };

	export type Arrow = Omit<FunctionBase, "args"> & {
		keyword?: "const" | "let" | "var";
		name: string;
		args?: OrString<B.Arg>[];
	};
}
