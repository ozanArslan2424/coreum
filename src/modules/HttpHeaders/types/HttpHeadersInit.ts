import type { HttpHeadersInterface } from "@/modules/HttpHeaders/HttpHeadersInterface";
import type { HttpHeaderKey } from "@/modules/HttpHeaders/types/HttpHeaderKey";

export type HttpHeadersInit =
	| Headers
	| HttpHeadersInterface
	| [string, string][]
	| (Record<string, string> & Partial<Record<HttpHeaderKey, string>>);
