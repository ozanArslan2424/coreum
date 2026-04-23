import type { UnknownObject } from "corpus-utils/UnknownObject";

export interface ObjectParserInterface<T> {
	parse(input: T): UnknownObject;
}
