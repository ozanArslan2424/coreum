// import type { OrString } from "@ozanarslan/corpus";
// import type { Writer } from "./Writer";
//
// // CLASS
//
// // CLASS
//
// // FUNC
//
// type FAnon = FBase;
//
// export type FuncOpts =
// 	| Disco<"anon", FAnon>
// 	| Disco<"function", FunctionOpts>
// 	| Disco<"method", MethodOpts>
// 	| Disco<"constMethod", ConstMethodOpts>
// 	| Disco<"abstractMethod", AbstractMethodOpts>;
// // FUNC
//
// // OBJ
// type OBase = {
// 	name: string;
// 	body: BodyWriter;
// };
// type OAnon = Omit<OBase, "name">;
// type OConst = OBase;
// type OObjMember = OBase;
// type OClassMember = OBase & { keyword?: ClsMemberKeyword };
// export type ObjOpts =
// 	| Disco<"anon", OAnon>
// 	| Disco<"const", OConst>
// 	| Disco<"objectMember", OObjMember>
// 	| Disco<"classMember", OClassMember>;
// // OBJ
//
// // INTERFACE
//
// // INTERFACE
//
// // IF
//
// // IF
//
// // FOR
// // FOR
//
// // SWITCH
//
// // SWITCH
//
// // TRYCATCH
//
// // TRYCATCH
//
// // RETURN
//
// // RETURN
//
// // THROW
// // THROW
//
// // VAR
// export type VarConst = VarBase;
// export type VarLet = VarBase;
// export type VarVar = VarBase;
//
// export type VarOpts =
// 	| Disco<"const", VarConst>
// 	| Disco<"let", VarLet>
// 	| Disco<"var", VarVar>
// 	| Disco<"classMember", VarClsMember>;
// // VAR
//
// // ARR
// type ArrBase = {
// 	name: string;
// 	items: string[];
// };
// type ArrAnon = Omit<ArrBase, "name">;
// type ArrConst = ArrBase & { type?: string };
// type ArrLet = ArrBase & { type?: string };
// export type ArrayOpts =
// 	| Disco<"anon", ArrAnon>
// 	| Disco<"const", ArrConst>
// 	| Disco<"let", ArrLet>;
// // ARR
//
// // COMMENT
//
// // IMPORT
