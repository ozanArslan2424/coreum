import { CookiesAbstract } from "@/Core/Cookies/CookiesAbstract";
import type { CookiesInterface } from "@/Core/Cookies/CookiesInterface";
import type { CookieOptions } from "@/Core/Cookies/CookieOptions";
import type { CookiesInit } from "@/Core/Cookies/CookiesInit";

export class Cookies extends CookiesAbstract {
	constructor(init?: CookiesInit | CookiesInterface) {
		super();
		this.applyInit(init);
	}

	protected map = new Bun.CookieMap();

	toSetCookieHeaders(): Array<string> {
		return this.map.toSetCookieHeaders();
	}

	set(opts: CookieOptions): void {
		this.map.set(opts.name, opts.value, opts);
	}

	setMany(optsArr: Array<CookieOptions>): void {
		for (const opts of optsArr) {
			this.set(opts);
		}
	}

	get(name: string): string | null {
		return this.map.get(name);
	}

	has(name: string): boolean {
		return this.map.has(name);
	}

	get count(): number {
		return this.values().length;
	}

	delete(name: string): void {
		this.map.delete(name);
	}

	entries(): IterableIterator<[string, string]> {
		return this.map.entries();
	}

	values(): Array<string> {
		return Array.from(this.map.values());
	}

	keys(): Array<string> {
		return Array.from(this.map.keys());
	}
}
