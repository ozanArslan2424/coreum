import type { HttpHeadersInterface } from "@/modules/HttpHeaders/HttpHeadersInterface";
import type { HttpRequestInterface } from "@/modules/HttpRequest/HttpRequestInterface";
import type { ContextDataInterface } from "@/types";
import type { CookiesInterface } from "@/modules/Cookies/CookiesInterface";
import { HttpResponse } from "@/modules/HttpResponse/HttpResponse";
import type { ContextInterface } from "@/modules/Context/ContextInterface";
import type { HttpResponseInterface } from "@/modules/HttpResponse/HttpResponseInterface";

export class ContextAbstract<
	R = unknown,
	B = unknown,
	S = unknown,
	P = unknown,
> implements ContextInterface<R, B, S, P> {
	constructor(
		readonly req: HttpRequestInterface,
		body: B,
		search: S,
		params: P,
		res?: HttpResponseInterface<R>,
	) {
		this.url = req.urlObject;
		this.headers = req.headers;
		this.cookies = req.cookies;
		this.body = body;
		this.search = search;
		this.params = params;
		this.res = res ?? new HttpResponse<R>();
	}

	url: URL;
	headers: HttpHeadersInterface;
	cookies: CookiesInterface;
	body: B;
	search: S;
	params: P;
	res: HttpResponseInterface<R>;
	data: ContextDataInterface = {};
}
