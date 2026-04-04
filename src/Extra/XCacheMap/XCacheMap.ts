import type { Func } from "@/Utils/Func";
import type { MaybePromise } from "@/Utils/MaybePromise";

export class XCacheMap<K = string, V = unknown> {
	private map = new Map<K, V>();

	constructor(private readonly getter: Func<[key: K], MaybePromise<V>>) {}

	async get(key: K): Promise<V> {
		const cached = this.map.get(key);
		if (cached) return cached;
		const value = await this.getter(key);
		this.map.set(key, value);
		return value;
	}

	invalidate(key: K) {
		this.map.delete(key);
	}

	clear() {
		this.map.clear();
	}

	set(key: K, value: V) {
		this.map.set(key, value);
	}
}
