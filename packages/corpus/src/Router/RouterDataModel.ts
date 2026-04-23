import type { SchemaValidator } from "corpus-utils/Schema";

export type RouterDataModel = {
	body?: SchemaValidator<any>;
	search?: SchemaValidator<any>;
	params?: SchemaValidator<any>;
};
