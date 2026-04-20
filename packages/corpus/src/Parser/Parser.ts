import type { SchemaValidator } from "corpus-utils/Schema";
import type { UnknownObject } from "corpus-utils/UnknownObject";

import type { CRequest } from "@/CRequest/CRequest";
import type { CResponse } from "@/CResponse/CResponse";
import { BodyParser } from "@/Parser/BodyParser";
import { FormDataParser } from "@/Parser/FormDataParser";
import { SchemaParser } from "@/Parser/SchemaParser";
import { SearchParamsParser } from "@/Parser/SearchParamsParser";

export class Parser {
	static readonly formDataParser = new FormDataParser();
	static readonly searchParamsParser = new SearchParamsParser();
	static readonly bodyParser = new BodyParser();
	static readonly schemaParser = new SchemaParser();

	static async parseBody<T = UnknownObject>(
		r: CRequest | CResponse | Response,
		validate?: SchemaValidator<T>,
	): Promise<T> {
		const data = await this.bodyParser.parse(r);
		return await this.schemaParser.parse("body", data, validate);
	}

	static async parseSearchParams<T = UnknownObject>(
		searchParams: URLSearchParams,
		validate?: SchemaValidator<T>,
	): Promise<T> {
		const data = this.searchParamsParser.toObject(searchParams);
		return await this.schemaParser.parse("URLSearchParams", data, validate);
	}

	static async parseUrlParams<T = UnknownObject>(
		urlParams: Record<string, string>,
		validate?: SchemaValidator<T>,
	): Promise<T> {
		const data: UnknownObject = {};
		for (const [key, value] of Object.entries(urlParams)) {
			data[key] = decodeURIComponent(value);
		}
		return await this.schemaParser.parse("params", data, validate);
	}
}
