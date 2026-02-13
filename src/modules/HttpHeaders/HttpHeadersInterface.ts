import type { HttpHeaderKey } from "@/modules/HttpHeaders/types/HttpHeaderKey";
import type { HttpHeadersInit } from "@/modules/HttpHeaders/types/HttpHeadersInit";

export interface HttpHeadersInterface extends Headers {
	append(name: HttpHeaderKey, value: string): void;
	set(name: HttpHeaderKey, value: string): void;
	combine(
		source: HttpHeadersInterface,
		target: HttpHeadersInterface,
	): HttpHeadersInterface;
	innerCombine(source: HttpHeadersInterface): HttpHeadersInterface;
	setMany(init: HttpHeadersInit): void;
}
