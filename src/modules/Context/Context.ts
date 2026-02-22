import { HttpRequest } from "@/modules/HttpRequest/HttpRequest";
import type { HttpRequestInterface } from "@/modules/HttpRequest/HttpRequestInterface";
import { Parser } from "@/modules/Parser/Parser";
import { ContextAbstract } from "@/modules/Context/ContextAbstract";
import type { ContextInterface } from "@/modules/Context/ContextInterface";
import type { ModelRegistryData } from "@/modules/Registry/types/ModelRegistryData";

/**
 * The context object used in Route "callback" parameter.
 * Takes 5 generics:
 * D = Data passed through a {@link Middleware}
 * R = The return type
 * B = Request body
 * S = Request URL search params
 * P = Request URL params
 * The types are resolved using Route "schemas" parameter except D
 * which you may want to pass if you have middleware data.
 *
 * Contains:
 * req = {@link Request} instance
 * url = Request URL
 * body = Async function to get the parsed Request body
 * search = Parsed Request URL search params
 * params = Parsed Request URL params
 * status = To set the Response status
 * statusText = To set the Response statusText
 * headers = To set the Response {@link Headers}
 * cookies = To set the Response {@link Cookies}
 * */

export class Context<R = unknown, B = unknown, S = unknown, P = unknown>
	extends ContextAbstract<R, B, S, P>
	implements ContextInterface<R, B, S, P>
{
	static makeFromRequest(req: HttpRequestInterface): ContextInterface {
		return new Context(req, {}, {}, {});
	}

	static async appendParsedData<
		Path extends string = string,
		R = unknown,
		B = unknown,
		S = unknown,
		P = unknown,
	>(
		ctx: ContextInterface<R, B, S, P>,
		req: HttpRequestInterface,
		endpoint: Path,
		model?: ModelRegistryData<R, B, S, P>,
	) {
		ctx.body = await Parser.getBody(req, model?.body);
		ctx.search = await Parser.getSearch(ctx.url, model?.search);
		ctx.params = await Parser.getParams(endpoint, ctx.url, model?.params);
	}
}
