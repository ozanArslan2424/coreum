import type { OrString } from "corpus-utils/OrString";
import type { BaseWriterTypes as B } from "./BaseWriterTypes";

export namespace StatementWriterTypes {
	export type Condition = OrString<"&&" | "||">;

	export type Else = (finalBody: B.BodyWriter) => void;

	export type ElseIf = (...conditions: Condition[]) => {
		then(body: B.BodyWriter): {
			elseif: ElseIf;
			else: Else;
		};
	};

	export type If = {
		then(body: B.BodyWriter): {
			elseif: ElseIf;
			else: Else;
		};
	};

	export type ForParan = OrString<"const" | "let" | "in" | "of">;

	export type SwitchCase = {
		condition: OrString<"default">;
		body: B.BodyWriter;
		break?: boolean;
	};

	export type TryCatch = {
		try: B.BodyWriter;
		catch?: { arg?: string; body: B.BodyWriter };
		finally?: B.BodyWriter;
	};

	type CmmLine = { text: string };

	type CmmBlock = { lines: string[] };

	type CmmJsDoc = { lines: string[] };

	export type Comment =
		| B.Disco<"line", CmmLine>
		| B.Disco<"block", CmmBlock>
		| B.Disco<"jsdoc", CmmJsDoc>
		| string;

	type ExpObj = { keys: string[] };

	type ExpType = { keys: string[] };

	type ExpDefault = { keys: string[] };

	type ExpNamed = { name: string; keys: string[] };

	type ExpReExp = { from: string; keys: string[] };

	type ExpReExpStar = { from: string };

	export type Export =
		| B.Disco<"obj", ExpObj>
		| B.Disco<"type", ExpType>
		| B.Disco<"default", ExpDefault>
		| B.Disco<"named", ExpNamed>
		| B.Disco<"reexport", ExpReExp>
		| B.Disco<"reexportStar", ExpReExpStar>;

	type ImpAs = { key: string; as?: string; isType?: boolean };

	export type Import = {
		keys?: string[] | ImpAs[];
		def?: string;
		isType?: boolean;
		from: string;
	};

	export type Throw = { errorType?: string; args: string };
}
