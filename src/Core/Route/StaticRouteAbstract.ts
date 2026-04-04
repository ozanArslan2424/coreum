import { Method } from "@/Core/CRequest/Method";
import { CResponse } from "@/Core/CResponse/CResponse";
import { CError } from "@/Core/CError/CError";
import { RouteVariant } from "@/Core/Route/RouteVariant";
import { RouteAbstract } from "@/Core/Route/RouteAbstract";
import { XFile } from "@/Extra/XFile/XFile";
import { Status } from "@/Core/CResponse/Status";
import { CommonHeaders } from "@/Core/CHeaders/CommonHeaders";
import type { Context } from "@/Core/Context/Context";
import type { Func } from "@/Utils/Func";
import type { MaybePromise } from "@/Utils/MaybePromise";
import type { StaticRouteDefinition } from "@/Core/Route/StaticRouteDefinition";
import type { StaticRouteCallback } from "@/Core/Route/StaticRouteCallback";

type R = CResponse | string;

export abstract class StaticRouteAbstract<
	B = unknown,
	S = unknown,
	P = unknown,
	E extends string = string,
> extends RouteAbstract<B, S, P, R, E> {
	// FROM CONSTRUCTOR
	abstract readonly path: E;

	abstract readonly definition: StaticRouteDefinition;

	abstract readonly callback?: StaticRouteCallback<B, S, P>;

	protected get filePath(): string {
		return typeof this.definition === "string"
			? this.definition
			: this.definition.filePath;
	}

	// ROUTE BASE PROPERTIES
	readonly variant: RouteVariant = RouteVariant.static;

	get endpoint(): E {
		return this.path;
	}

	get method(): Method {
		return Method.GET;
	}

	get handler(): Func<[Context<B, S, P, R>], MaybePromise<R>> {
		const customHandler = this.callback;

		if (customHandler !== undefined) {
			return async (c) => {
				const file = new XFile(this.filePath);
				const exists = await file.exists();
				if (!exists) {
					throw new CError(Status.NOT_FOUND.toString(), Status.NOT_FOUND);
				}
				const content = await file.text();
				c.res.headers.setMany({
					[CommonHeaders.ContentType]: file.mimeType,
					[CommonHeaders.ContentLength]: content.length.toString(),
				});
				return customHandler(c, content);
			};
		}

		if (typeof this.definition === "string") {
			return async () => await CResponse.file(this.filePath);
		}

		return async () => await CResponse.streamFile(this.filePath);
	}
}
