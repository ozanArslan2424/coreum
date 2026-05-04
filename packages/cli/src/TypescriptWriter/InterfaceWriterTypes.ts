import type { BaseWriterTypes as B } from "../BaseWriter/BaseWriterTypes";
import type { TypescriptWriter } from "./TypescriptWriter";

export namespace InterfaceWriterTypes {
	type BodyWriter = B.BodyWriter<TypescriptWriter>;

	export type Interface = {
		keyword?: "interface" | "type";
		isExported?: boolean;
		name: string;
		generics?: string[];
		body: BodyWriter;
	};
}
