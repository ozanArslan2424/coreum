import type { BaseWriterTypes as B } from "../BaseWriter/BaseWriterTypes";
import type { JavascriptWriter } from "./JavascriptWriter";

export namespace FunctionWriterTypes {
	type BodyWriter = B.BodyWriter<JavascriptWriter>;

	type FunctionBase = {
		args?: string[];
		isAsync?: boolean;
		body: BodyWriter;
	};

	export type Function = FunctionBase & { name: string };

	export type Arrow = Omit<FunctionBase, "args"> & {
		keyword?: "const" | "let" | "var";
		name: string;
		args?: string[];
	};
}
