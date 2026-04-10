import type { OrString } from "@ozanarslan/corpus";
import type { WriterInterface } from "./WriterInterface";

export type BodyWriter = (w: WriterInterface) => void;
export type Disco<T extends string, U> = { variant: T } & U;

// CLASS
type ClsMethodKeyword =
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

type ClsMemberKeyword =
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

export type ClassConstrOpts = {
	args?: { keyword?: ClsMemberKeyword; key: string; type: string }[];
	superArgs?: string;
	body?: BodyWriter;
};

export type ClassOpts = {
	isExported?: boolean;
	extends?: string;
	implements?: string;
	isAbstract?: boolean;
	name: string;
	body: BodyWriter;
	generics?: string[];
	constr?: ClassConstrOpts;
};
// CLASS

// FUNC
type ClsMethodBase = {
	name: string;
	keyword?: ClsMethodKeyword;
};
type FArg = `${string}: ${string}`;
type FBase = {
	args?: FArg[];
	generics?: string[];
	isAsync?: boolean;
	type?: string;
	body: BodyWriter;
};
type FAnon = FBase;
type FFunc = FBase & { name: string };
type FConst = Omit<FBase, "args"> & {
	name: string;
	args?: OrString<FArg>[];
};
type FClsMethod = FBase & ClsMethodBase;
type FClsConst = Omit<FBase, "args"> &
	ClsMethodBase & { args?: OrString<FArg>[] };
type FClsAbs = Omit<FBase, "body"> & ClsMethodBase;
export type FuncOpts =
	| Disco<"anon", FAnon>
	| Disco<"function", FFunc>
	| Disco<"const", FConst>
	| Disco<"method", FClsMethod>
	| Disco<"constMethod", FClsConst>
	| Disco<"abstractMethod", FClsAbs>;
// FUNC

// OBJ
type OBase = {
	name: string;
	body: BodyWriter;
};
type OAnon = Omit<OBase, "name">;
type OConst = OBase;
type OObjMember = OBase;
type OClassMember = OBase & { keyword?: ClsMemberKeyword };
export type ObjOpts =
	| Disco<"anon", OAnon>
	| Disco<"const", OConst>
	| Disco<"objectMember", OObjMember>
	| Disco<"classMember", OClassMember>;
// OBJ

// INTERFACE
export type IBase = {
	isExported?: boolean;
	name: string;
	generics?: string[];
	body: BodyWriter;
};
type IAnon = Omit<IBase, "name" | "isExported">;
type IInner = Omit<IBase, "generics" | "isExported">;
type IInterface = IBase;
type IType = IBase;
export type InterfaceOpts =
	| Disco<"anon", IAnon>
	| Disco<"interface", IInterface>
	| Disco<"type", IType>
	| Disco<"inner", IInner>;
// INTERFACE

// IF
export type IfCondition = OrString<"&&" | "||">;
type Else = (finalBody: BodyWriter) => void;
type ElseIf = (...conditions: IfCondition[]) => {
	then(body: BodyWriter): {
		elseif: ElseIf;
		else: Else;
	};
};
export type IfBuilder = {
	then(body: BodyWriter): {
		elseif: ElseIf;
		else: Else;
	};
};
// IF

// FOR
export type ForParan = OrString<"const" | "let" | "in" | "of">;
// FOR

// SWITCH
export type SwitchCase = {
	condition: OrString<"default">;
	body: BodyWriter;
	break?: boolean;
};
// SWITCH

// TRYCATCH
export type TryCatchOpts = {
	try: BodyWriter;
	catch?: { arg?: string; body: BodyWriter };
	finally?: BodyWriter;
};
// TRYCATCH

// RETURN
type RnValue = { value: string };
type RnObj = { body: BodyWriter };
export type ReturnOpts =
	| Disco<"value", RnValue>
	| Disco<"object", RnObj>
	| { variant: "void" }
	| string;
// RETURN

// THROW
export type ThrowOpts = { errorType?: string; args: string };
// THROW

// VAR
type VarBase = {
	name: string;
	type?: string;
	value: string | BodyWriter;
};
export type VarConst = VarBase;
export type VarLet = VarBase;
export type VarVar = VarBase;
export type VarClsMember = VarBase & { keyword?: ClsMemberKeyword };
export type VarOpts =
	| Disco<"const", VarConst>
	| Disco<"let", VarLet>
	| Disco<"var", VarVar>
	| Disco<"classMember", VarClsMember>;
// VAR

// ARR
type ArrBase = {
	name: string;
	items: string[];
};
type ArrAnon = Omit<ArrBase, "name">;
type ArrConst = ArrBase & { type?: string };
type ArrLet = ArrBase & { type?: string };
export type ArrayOpts =
	| Disco<"anon", ArrAnon>
	| Disco<"const", ArrConst>
	| Disco<"let", ArrLet>;
// ARR

// COMMENT
type CmmLine = { text: string };
type CmmBlock = { lines: string[] };
type CmmJsDoc = { lines: string[] };
export type CommentOpts =
	| Disco<"line", CmmLine>
	| Disco<"block", CmmBlock>
	| Disco<"jsdoc", CmmJsDoc>;
// COMMENT

// EXPORT
type ExpObj = { keys: string[] };
type ExpType = { keys: string[] };
type ExpDefault = { keys: string[] };
type ExpNamed = { name: string; keys: string[] };
type ExpReExp = { from: string; keys: string[] };
type ExpReExpStar = { from: string };

export type ExportOpts =
	| Disco<"obj", ExpObj>
	| Disco<"type", ExpType>
	| Disco<"default", ExpDefault>
	| Disco<"named", ExpNamed>
	| Disco<"reexport", ExpReExp>
	| Disco<"reexportStar", ExpReExpStar>;
// EXPORT

// IMPORT
type ImpAs = { key: string; as?: string; isType?: boolean };
export type ImpOpts = {
	keys?: string[] | ImpAs[];
	def?: string;
	isType?: boolean;
	from: string;
};
// IMPORT
