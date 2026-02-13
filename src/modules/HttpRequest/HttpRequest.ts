import type { HttpRequestInterface } from "@/modules/HttpRequest/HttpRequestInterface";

import { HttpRequestAbstract } from "@/modules/HttpRequest/HttpRequestAbstract";

/** HttpRequest includes a cookie jar, better headers, and some utilities. */

export class HttpRequest
	extends HttpRequestAbstract
	implements HttpRequestInterface {}
