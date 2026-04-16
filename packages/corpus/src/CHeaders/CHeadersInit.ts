import type { CHeaderKey } from "@/CHeaders/CHeaderKey";
import type { CHeaders } from "@/CHeaders/CHeaders";

export type CHeadersInit =
	| Headers
	| CHeaders
	| [string, string][]
	| (Record<string, string> & Partial<Record<CHeaderKey, string>>);
