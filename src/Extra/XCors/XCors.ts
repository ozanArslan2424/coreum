import type { CorsOptions } from "@/Extra/XCors/CorsOptions";
import { isSomeArray } from "@/Utils/isSomeArray";
import { MiddlewareVariant } from "@/Core/Middleware/MiddlewareVariant";
import { MiddlewareAbstract } from "@/Core/Middleware/MiddlewareAbstract";
import type { MiddlewareUseOn } from "@/Core/Middleware/MiddlewareUseOn";
import type { MiddlewareHandler } from "@/Core/Middleware/MiddlewareHandler";
import { CResponse } from "@/Core/CResponse/CResponse";
import { Status } from "@/Core/CResponse/Status";
import { CommonHeaders } from "@/Core/CHeaders/CommonHeaders";
import type { RequestHandler } from "@/Core/Server/RequestHandler";
import { boolToString } from "@/Utils/boolToString";
import { $registry } from "@/index";

/** Simple cors helper to set CORS headers. Also provides a preflight handler for the Server. */
export class XCors extends MiddlewareAbstract {
	constructor(private readonly opts: CorsOptions | undefined) {
		super();
		$registry.cors = this;
	}

	override variant: MiddlewareVariant = MiddlewareVariant.outbound;
	override useOn: MiddlewareUseOn = "*";
	override handler: MiddlewareHandler = (c) => {
		this.applyHeaders(c.res.headers, c.headers.get("origin") ?? "");
	};

	/** Applies CORS headers to a Headers object given the request origin. */
	private applyHeaders(
		headers: Headers,
		reqOrigin: string,
		includeMaxAge = false,
	): void {
		const {
			allowedOrigins,
			allowedMethods,
			allowedHeaders,
			exposedHeaders,
			credentials,
			maxAge = 86400,
		} = this.opts ?? {};

		const isWildcard = !allowedOrigins || allowedOrigins.includes("*");
		const originAllowed = !isWildcard && allowedOrigins.includes(reqOrigin);

		// Credentials mode forbids wildcard origin — reflect actual origin instead
		if (credentials && isWildcard && reqOrigin) {
			headers.set(CommonHeaders.AccessControlAllowOrigin, reqOrigin);
			headers.append(CommonHeaders.Vary, "Origin");
		} else if (isWildcard) {
			headers.set(CommonHeaders.AccessControlAllowOrigin, "*");
		} else if (originAllowed) {
			headers.set(CommonHeaders.AccessControlAllowOrigin, reqOrigin);
			headers.append(CommonHeaders.Vary, "Origin");
		}

		if (isSomeArray(allowedMethods)) {
			headers.set(
				CommonHeaders.AccessControlAllowMethods,
				allowedMethods.join(", "),
			);
		}

		if (isSomeArray(allowedHeaders)) {
			headers.set(
				CommonHeaders.AccessControlAllowHeaders,
				allowedHeaders.join(", "),
			);
		}

		if (isSomeArray(exposedHeaders)) {
			headers.set(
				CommonHeaders.AccessControlExposeHeaders,
				exposedHeaders.join(", "),
			);
		}

		if (includeMaxAge) {
			headers.set(CommonHeaders.AccessControlMaxAge, maxAge.toString());
		}

		headers.set(
			CommonHeaders.AccessControlAllowCredentials,
			boolToString(credentials),
		);
	}

	/** Preflight handler for OPTIONS requests. */
	getPreflightHandler(): RequestHandler {
		return (req) => {
			const res = new CResponse(undefined, { status: Status.NO_CONTENT });
			this.applyHeaders(res.headers, req.headers.get("origin") ?? "", true);
			return res;
		};
	}
}
