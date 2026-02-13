import type { HttpHeadersInterface } from "@/modules/HttpHeaders/HttpHeadersInterface";
import type { HttpRequestInterface } from "@/modules/HttpRequest/HttpRequestInterface";
import type { HttpResponseInterface } from "@/modules/HttpResponse/HttpResponseInterface";
import type { CorsOptions } from "@/modules/Cors/types/CorsOptions";

export interface CorsInterface {
	readonly opts: CorsOptions;
	getCorsHeaders(
		req: HttpRequestInterface,
		res: HttpResponseInterface,
	): HttpHeadersInterface;
	apply(req: HttpRequestInterface, res: HttpResponseInterface): void;
}
