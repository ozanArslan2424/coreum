import type { HttpHeadersInterface } from "@/modules/HttpHeaders/HttpHeadersInterface";
import type { HttpRequestInterface } from "@/modules/HttpRequest/HttpRequestInterface";
import type { CookiesInterface } from "@/modules/Cookies/CookiesInterface";
import type { HttpResponseInterface } from "@/modules/HttpResponse/HttpResponseInterface";
import type { Type } from "arktype";

export interface RouteContextInterface<
	R = unknown,
	B = unknown,
	S = unknown,
	P = unknown,
> {
	readonly req: HttpRequestInterface;
	readonly url: URL;
	readonly headers: HttpHeadersInterface;
	readonly cookies: CookiesInterface;
	readonly body: Type<B>["inferOut"];
	readonly search: Type<S>["inferOut"];
	readonly params: Type<P>["inferOut"];
	res: HttpResponseInterface<Type<R>["inferOut"]>;
	data: Record<string, unknown>;
}
