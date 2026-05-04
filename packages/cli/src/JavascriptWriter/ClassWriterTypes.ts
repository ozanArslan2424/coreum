import type { BaseWriterTypes as B } from "../BaseWriter/BaseWriterTypes";
import type { JavascriptWriter } from "./JavascriptWriter";

export namespace ClassWriterTypes {
	type BodyWriter = B.BodyWriter<JavascriptWriter>;

	type MemberKeyword = "static";

	type MethodKeyword = "static";

	export type Constructor = {
		args?: { keyword?: MemberKeyword; key: string }[];
		superArgs?: string;
		body?: BodyWriter;
	};

	export type Class = {
		isExported?: boolean;
		extends?: string;
		name: string;
		body: BodyWriter;
		constr?: Constructor;
	};

	type MethodBase = {
		name: string;
		keyword?: MethodKeyword;
		args?: string[];
		isAsync?: boolean;
		body: BodyWriter;
	};

	export type Method = MethodBase;

	export type ArrowMethod = Omit<MethodBase, "args"> & {
		args?: string[];
	};

	export type Member = {
		name: string;
		value: string | BodyWriter;
		keyword?: MemberKeyword;
	};
}
