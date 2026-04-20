import { type } from "arktype";
import z from "zod";

export class TestModel {
	// primitives
	static ark = {
		number: type("number"),
		stringToNumber: type("string").pipe((v) => parseInt(v)),
	};
	static zod = {
		number: z.number(),
		stringToNumber: z.coerce.number(),
	};

	// standalone objects
	static arkObject = type({ hello: this.ark.number });
	static zodObject = z.object({ hello: this.zod.number });

	// route schemas (params/search coerce, body does not)
	static arkRoute = {
		params: type({ hello: this.ark.stringToNumber }),
		search: type({ hello: this.ark.number }),
		body: type({ hello: this.ark.number }),
		response: type({
			params: type({ hello: this.ark.number }),
			search: type({ hello: this.ark.number }),
			body: type({ hello: this.ark.number }),
		}),
	};
	static zodRoute = {
		params: z.object({ hello: this.zod.stringToNumber }),
		search: z.object({ hello: this.zod.number }),
		body: z.object({ hello: this.zod.number }),
	};

	static arkRouteReferenced = {
		params: type({ hello: this.ark.stringToNumber }),
		search: this.arkRoute.search,
		body: this.arkObject,
	};
	static zodRouteReferenced = {
		params: z.object({ hello: this.zod.stringToNumber }),
		search: this.zodRoute.search,
		body: this.zodObject,
	};

	static combined = {
		params: type({ hello: this.ark.stringToNumber }),
		search: z.object({ hello: this.zod.number }),
		body: this.arkRoute.body,
	};
}
