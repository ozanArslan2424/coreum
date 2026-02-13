import { CommonHeaders } from "@/modules/HttpHeaders/enums/CommonHeaders";
import { Status } from "@/modules/HttpResponse/enums/Status";
import { HttpResponseAbstract } from "@/modules/HttpResponse/HttpResponseAbstract";
import type { HttpResponseInterface } from "@/modules/HttpResponse/HttpResponseInterface";
import type { HttpResponseInit } from "@/modules/HttpResponse/types/HttpResponseInit";

/**
 * This is NOT the default response. It provides {@link HttpResponse.response}
 * getter to access web Response with all mutations applied during the
 * handling of the request, JSON body will be handled and cookies will be
 * applied to response headers.
 * */

export class HttpResponse<R = unknown>
	extends HttpResponseAbstract<R>
	implements HttpResponseInterface<R>
{
	static redirect(
		url: string | URL,
		init?: HttpResponseInit,
	): HttpResponseInterface {
		const res = new HttpResponse(undefined, {
			...init,
			status: init?.status ?? Status.FOUND,
			statusText: init?.statusText,
		});
		const urlString = url instanceof URL ? url.toString() : url;
		res.headers.set(CommonHeaders.Location, urlString);
		return res;
	}

	static permanentRedirect(
		url: string | URL,
		init?: Omit<HttpResponseInit, "status">,
	): HttpResponseInterface {
		return this.redirect(url, {
			...init,
			status: Status.MOVED_PERMANENTLY,
		});
	}

	static temporaryRedirect(
		url: string | URL,
		init?: Omit<HttpResponseInit, "status">,
	): HttpResponseInterface {
		return this.redirect(url, { ...init, status: Status.TEMPORARY_REDIRECT });
	}

	static seeOther(
		url: string | URL,
		init?: Omit<HttpResponseInit, "status">,
	): HttpResponseInterface {
		return this.redirect(url, { ...init, status: Status.SEE_OTHER });
	}
}
