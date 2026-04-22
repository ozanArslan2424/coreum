import type { OrString } from "corpus-utils/OrString";

import type { BaseWriterTypes as B } from "./BaseWriterTypes";

export namespace ClassWriterTypes {
	type MemberKeyword =
		| "public"
		| "protected"
		| "private"
		| "public readonly"
		| "protected readonly"
		| "private readonly"
		| "public static"
		| "protected static"
		| "private static"
		| "public static readonly"
		| "protected static readonly"
		| "private static readonly"
		| "readonly"
		| "static"
		| "static readonly"
		| "declare"
		| "declare readonly";

	type MethodKeyword =
		| "public"
		| "protected"
		| "private"
		| "public static"
		| "protected static"
		| "private static"
		| "public abstract"
		| "protected abstract"
		| "public static abstract"
		| "protected static abstract"
		| "override"
		| "public override"
		| "protected override"
		| "private override";

	export type Constructor = {
		args?: { keyword?: MemberKeyword; key: string; type: string }[];
		superArgs?: string;
		body?: B.BodyWriter;
	};

	export type Class = {
		isExported?: boolean;
		extends?: string;
		implements?: string;
		isAbstract?: boolean;
		name: string;
		body: B.BodyWriter;
		generics?: string[];
		constr?: Constructor;
	};

	type MethodBase = {
		name: string;
		keyword?: MethodKeyword;
		args?: B.Arg[];
		generics?: string[];
		isAsync?: boolean;
		type?: string;
		body: B.BodyWriter;
	};

	export type Method = MethodBase;

	export type ArrowMethod = Omit<MethodBase, "args"> & {
		args?: OrString<B.Arg>[];
	};

	export type AbstractMethod = Omit<MethodBase, "body">;

	export type Member = {
		name: string;
		type?: string;
		value: string | B.BodyWriter;
		keyword?: MemberKeyword;
	};
}
