import type { EntityJsonSchema } from "@/Entity/EntityJsonSchema";
import type { Schema } from "corpus-utils/Schema";

export interface EntityDefinition<T extends Schema = Schema> {
	name: string;
	schema: T;
	jsonSchema?: EntityJsonSchema;
	disableParsing?: boolean;
}
