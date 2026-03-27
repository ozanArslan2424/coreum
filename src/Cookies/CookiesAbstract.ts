import type { CookiesInterface } from "@/Cookies/CookiesInterface";
import type { CookieOptions } from "@/Cookies/types/CookieOptions";
import type { CookiesInit } from "@/Cookies/types/CookiesInit";

export abstract class CookiesAbstract implements CookiesInterface {
	constructor(_?: CookiesInit | CookiesInterface) {}

	protected applyInit(init?: CookiesInit | CookiesInterface): void {
		if (!init) return;

		if (init instanceof CookiesAbstract) {
			for (const name of init.keys()) {
				const value = init.get(name) ?? "";
				this.set({ name, value });
			}
		} else if (Array.isArray(init)) {
			for (const opts of init) {
				this.set(opts);
			}
		} else if ("name" in init && "value" in init) {
			this.set(init);
		}
	}

	protected abstract map: Iterable<[string, string]>;
	abstract set(opts: CookieOptions): void;
	abstract get(name: string): string | null;
	abstract has(name: string): boolean;
	abstract get count(): number;
	abstract delete(name: string): void;
	abstract entries(): IterableIterator<[string, string]>;
	abstract values(): Array<string>;
	abstract keys(): Array<string>;
	abstract toSetCookieHeaders(): Array<string>;
	abstract setMany(optsArr: Array<CookieOptions>): void;
}
