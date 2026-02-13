import type { Status } from "@/modules/HttpResponse/enums/Status";
import type { CookiesInit } from "@/modules/Cookies/types/CookiesInit";
import type { HttpHeadersInit } from "@/modules/HttpHeaders/types/HttpHeadersInit";

export type HttpResponseInit = {
	cookies?: CookiesInit;
	headers?: HttpHeadersInit;
	status?: Status;
	statusText?: string;
};
