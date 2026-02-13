import type { CookiesInterface } from "@/modules/Cookies/CookiesInterface";

export type CookiesInit =
	| CookiesInterface
	| [string, string][]
	| Record<string, string>;
