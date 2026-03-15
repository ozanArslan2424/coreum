import { Method } from "@/CRequest/enums/Method";
import { CResponse } from "@/CResponse/CResponse";
import type { RouteId } from "@/Route/types/RouteId";
import type { RouteModel } from "@/Model/types/RouteModel";
import type { StaticRouteHandler } from "@/StaticRoute/types/StaticRouteHandler";
import type { StaticRouteDefinition } from "@/StaticRoute/types/StaticRouteDefinition";
import { $routerStore } from "@/index";
import { StaticRouteAbstract } from "@/StaticRoute/StaticRouteAbstract";
import type { RouteHandler } from "@/Route/types/RouteHandler";
import type { OrString } from "@/utils/types/OrString";

/**
 * Defines a route that serves a static file. Accepts a path and a {@link StaticRouteDefinition}
 * which can either be a plain file path string for a standard file response, or an object
 * with `stream: true` to stream the file directly from disk — useful for large files like
 * videos, PDFs, or large assets where reading the entire file into memory is undesirable.
 *
 * An optional custom handler can be provided to intercept the file content before it is sent,
 * for example to modify headers or transform the content. Route instantiation automatically
 * registers to the router.
 *
 * @example
 * // Serve a file normally
 * new StaticRoute("/style", "assets/style.css");
 *
 * // Stream a large file
 * new StaticRoute("/video", { filePath: "assets/video.mp4", stream: true });
 *
 * // Custom handler
 * new StaticRoute("/doc", "assets/doc.txt", (c, content) => {
 *     c.res.headers.set("x-custom", "value");
 *     return content;
 * });
 */

type R = string | CResponse;

export class StaticRoute<
	Path extends string = string,
	B = unknown,
	S = unknown,
	P = unknown,
> extends StaticRouteAbstract<Path, B, S, P> {
	constructor(
		path: Path,
		definition: StaticRouteDefinition,
		handler?: StaticRouteHandler<B, S, P>,
		model?: RouteModel<B, S, P, R>,
	) {
		super();
		this.endpoint = path;
		this.method = Method.GET;
		this.pattern = this.resolvePattern(this.endpoint);
		this.id = this.resolveId(this.method, this.endpoint);
		this.model = model;
		this.filePath = this.resolveFilePath(definition);
		this.handler = this.resolveHandler(definition, handler);
		$routerStore.get().addRoute(this);
	}

	id: RouteId;
	method: OrString<Method>;
	endpoint: Path;
	pattern: RegExp;
	handler: RouteHandler<B, S, P, R>;
	model?: RouteModel<B, S, P, R>;
	protected filePath: string;
}
