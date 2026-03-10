import type { CHeaders } from "@/Headers/CHeaders";
import type { HeaderKey } from "@/Headers/types/HeaderKey";

export type CHeadersInit =
	| Headers
	| CHeaders
	| [string, string][]
	| (Record<string, string> & Partial<Record<HeaderKey, string>>);
