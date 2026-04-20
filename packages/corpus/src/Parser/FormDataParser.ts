import type { UnknownObject } from "corpus-utils/UnknownObject";

import { ObjectParserAbstract } from "@/Parser/ObjectParserAbstract";

export class FormDataParser extends ObjectParserAbstract<FormData> {
	toObject(formData: FormData): UnknownObject {
		const result = this.newSafeObject();

		formData.forEach((entry, key) => {
			const parts = this.parseKey(key);
			const value = entry instanceof File ? entry : this.tryParseJSON(entry);
			this.setDeep(result, parts, value);
		});

		return result;
	}

	private setDeep(result: UnknownObject, parts: (string | number)[], value: unknown) {
		let current = result;

		for (let i = 0; i < parts.length - 1; i++) {
			const part = parts[i]!;
			const next = parts[i + 1];
			// just for readability, current can be used directly as well
			const container = this.newContainer(current);

			// each part needs an entry
			// container[part] is undefined so we assign it as inner container
			if (container[part] === undefined) {
				const isIndexAssigned = typeof next === "number";
				container[part] = isIndexAssigned ? [] : {};
			}

			// if container[part] defined, it is a value assigned directly
			(current as unknown) = container[part];
		}

		const last = parts[parts.length - 1]!;
		if (parts.length === 1) {
			// just for readability, current can be used directly as well
			const container = this.newContainer(current);
			const existing = container[last];
			if (existing !== undefined) {
				container[last] = Array.isArray(existing)
					? // array assignment
						[...existing, value]
					: // multiple assignments to single key
						[existing, value];
			} else {
				// key assignment
				container[last] = value;
			}
		} else {
			// last is assigned directly
			(current as any)[last] = value;
		}
	}
}
