import type { BaseWriterTypes as B } from "./BaseWriterTypes";

export namespace InterfaceWriterTypes {
	export type Interface = {
		keyword?: "interface" | "type";
		isExported?: boolean;
		name: string;
		generics?: string[];
		body: B.BodyWriter;
	};
}
