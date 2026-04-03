import type { CookieOptions } from "@/Core/Cookies/CookieOptions";

export interface CookiesInterface {
	set(opts: CookieOptions): void;
	get(name: string): string | null;
	has(name: string): boolean;
	get count(): number;
	delete(name: string): void;
	entries(): IterableIterator<[string, string]>;
	values(): Array<string>;
	keys(): Array<string>;
	toSetCookieHeaders(): Array<string>;
	setMany(optsArr: Array<CookieOptions>): void;
}
