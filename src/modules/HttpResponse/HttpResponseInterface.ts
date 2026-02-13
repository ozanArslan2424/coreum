import { Status } from "@/modules/HttpResponse/enums/Status";
import type { CookiesInterface } from "@/modules/Cookies/CookiesInterface";

import type { HttpHeadersInterface } from "@/modules/HttpHeaders/HttpHeadersInterface";
import type { HttpResponseBody } from "@/modules/HttpResponse/types/HttpResponseBody";
import type { HttpResponseInit } from "@/modules/HttpResponse/types/HttpResponseInit";

export interface HttpResponseInterface<R = unknown> {
	readonly body?: HttpResponseBody<R>;
	readonly init?: HttpResponseInit;
	headers: HttpHeadersInterface;
	status: Status;
	statusText: string;
	cookies: CookiesInterface;
	get response(): Response;
}
