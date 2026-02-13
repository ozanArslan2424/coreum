import type { HttpHeadersInterface } from "@/modules/HttpHeaders/HttpHeadersInterface";
import type { HttpRequestInterface } from "@/modules/HttpRequest/HttpRequestInterface";
import type { RouteContextInterface } from "@/modules/RouteContext/RouteContextInterface";
import type { CookiesInterface } from "@/modules/Cookies/CookiesInterface";
import type { Type } from "arktype";
import { HttpResponse } from "@/modules/HttpResponse/HttpResponse";

export class RouteContextAbstract<
	R = unknown,
	B = unknown,
	S = unknown,
	P = unknown,
> implements RouteContextInterface<R, B, S, P> {
	constructor(
		readonly req: HttpRequestInterface,
		readonly url: URL,
		readonly headers: HttpHeadersInterface,
		readonly cookies: CookiesInterface,
		readonly body: Type<B>["inferOut"],
		readonly search: Type<S>["inferOut"],
		readonly params: Type<P>["inferOut"],
	) {}

	res = new HttpResponse<Type<R>["inferOut"]>();
	data: Record<string, unknown> = {};
}
