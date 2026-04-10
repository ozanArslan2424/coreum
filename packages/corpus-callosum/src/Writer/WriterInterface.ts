import type {
	ArrayOpts,
	BodyWriter,
	ClassConstrOpts,
	ClassOpts,
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

export interface WriterInterface {
	variables: Set<string>;
	interfaces: Set<string>;

	read(join: string): string;
	appendRaw(...strings: string[]): void;
	append(...strings: string[]): void;
	inline(...strings: string[]): void;
	pair(k: string, v?: string): void;
	tab(str: string, indent: number): void;

	$function(o: FuncOpts): void;
	$object(o: ObjOpts): void;
	$array(o: ArrayOpts): void;
	$variable(o: VarOpts): void;
	$var(o: VarVar): void;
	$const(o: VarConst): void;
	$let(o: VarLet): void;

	$constructor(o: ClassConstrOpts): void;
	$class(o: ClassOpts): void;
	$member(o: VarClsMember): void;

	$interface(o: InterfaceOpts): void;

	$if(...conditions: IfCondition[]): IfBuilder;
	$for(paran: ForParan[], body: BodyWriter): void;
	$switch(expr: string, ...cases: SwitchCase[]): void;
	$tryCatch(o: TryCatchOpts): void;

	$return(o: ReturnOpts): void;
	$throw(o: ThrowOpts): void;

	$comment(o: CommentOpts): void;

	$import(o: ImpOpts): void;
	$export(o: ExportOpts): void;
}
