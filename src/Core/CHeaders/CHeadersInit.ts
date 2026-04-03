import type { CHeaders } from "@/Core/CHeaders/CHeaders";
import type { CHeaderKey } from "@/Core/CHeaders/CHeaderKey";

export type CHeadersInit =
	| Headers
	| CHeaders
	| [string, string][]
	| (Record<string, string> & Partial<Record<CHeaderKey, string>>);
