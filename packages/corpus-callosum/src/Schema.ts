import type {
	StandardJSONSchemaV1,
	StandardSchemaV1,
} from "@standard-schema/spec";

export interface Schema<T = unknown> extends StandardSchemaV1<unknown, T> {
	"~standard": StandardSchemaV1<unknown, T>["~standard"] & {
		readonly jsonSchema: StandardJSONSchemaV1.Converter;
	};
}
