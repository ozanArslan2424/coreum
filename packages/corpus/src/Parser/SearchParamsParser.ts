import type { UnknownObject } from "corpus-utils/UnknownObject";

import { ObjectParserAbstract } from "@/Parser/ObjectParserAbstract";

export class SearchParamsParser extends ObjectParserAbstract<URLSearchParams> {
	toObject(searchParams: URLSearchParams): UnknownObject {
		const result = this.newSafeObject();

		searchParams.forEach((entry, key) => {
			const parts = this.parseKey(key);
			const value = this.tryParseJSON(entry);
			this.setDeep(result, parts, value);
		});

		return result;
	}

	// same as formdata but good to keep separate
	private setDeep(result: UnknownObject, parts: (string | number)[], value: unknown): void {
		let current = result;
		for (let i = 0; i < parts.length - 1; i++) {
			const part = parts[i]!;
			const next = parts[i + 1];
			const container = this.newContainer(current);
			if (container[part] === undefined) {
				const isIndexAssigned = typeof next === "number";
				container[part] = isIndexAssigned ? [] : {};
			}
			(current as unknown) = container[part];
		}
		const last = parts[parts.length - 1]!;
		if (parts.length === 1) {
			const container = this.newContainer(current);
			const existing = container[last];
			if (existing !== undefined) {
				container[last] = Array.isArray(existing) ? [...existing, value] : [existing, value];
			} else {
				container[last] = value;
			}
		} else {
			(current as any)[last] = value;
		}
	}
}
