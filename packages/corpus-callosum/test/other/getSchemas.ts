import type { ValidationLib } from "../../src/utils/ACCEPTED_VALIDATION_LIBS";
import { getArkSchemas } from "./getArkSchemas";
// import { getValiSchemas } from "./getValiSchemas";
import { getYupSchemas } from "./getYupSchemas";
import { getZodSchemas } from "./getZodSchemas";

export function getSchemas(lib: ValidationLib) {
	switch (lib) {
		case "zod":
			return getZodSchemas();
		case "arktype":
		default:
			return getArkSchemas();
		// case "valibot":
		// 	return getValiSchemas();
		case "yup":
			return getYupSchemas();
	}
}
