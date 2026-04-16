import type { EntityJsonSchema } from "@/Entity/EntityJsonSchema";
import { Parser } from "@/Parser/Parser";
import type {
	InferSchemaIn,
	InferSchemaOut,
	Schema,
} from "corpus-utils/Schema";
import type { EntityDefinition } from "@/Entity/EntityDefinition";
import { $registry } from "@/index";

export function Entity<T extends Schema = Schema>(def: EntityDefinition<T>) {
	$registry.entities.add(def);

	class Base {
		static readonly name: string = def.name;
		static readonly schema: T = def.schema;
		static readonly jsonSchema?: EntityJsonSchema = def.jsonSchema;
		static readonly disableParsing?: boolean = def.disableParsing;
		constructor(values: InferSchemaIn<T>) {
			const data = def.disableParsing
				? values
				: Parser.parseSync(values, def.schema["~standard"].validate);
			Object.assign(this, data);
		}
	}

	return Base as (new (values: InferSchemaIn<T>) => Base & InferSchemaOut<T>) &
		EntityDefinition<T>;
}
