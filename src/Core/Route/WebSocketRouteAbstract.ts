import { RouteAbstract } from "@/Core/Route/RouteAbstract";
import { RouteVariant } from "@/Core/Route/RouteVariant";
import type { Context } from "@/Core/Context/Context";
import { Method } from "@/Core/CRequest/Method";
import type { WebSocketOnOpen } from "@/Core/Route/WebSocketOnOpen";
import type { WebSocketOnClose } from "@/Core/Route/WebSocketOnClose";
import type { WebSocketOnMessage } from "@/Core/Route/WebSocketOnMessage";
import type { Func } from "@/Utils/Func";
import { joinPathSegments } from "@/Utils/joinPathSegments";
import { $registry } from "@/index";

type R = WebSocketRouteAbstract;

export abstract class WebSocketRouteAbstract<
	E extends string = string,
> extends RouteAbstract<E> {
	// FROM CONSTRUCTOR
	abstract readonly path: E;

	abstract readonly onOpen?: WebSocketOnOpen;

	abstract readonly onClose?: WebSocketOnClose;

	abstract readonly onMessage: WebSocketOnMessage;

	// BASE ROUTE PROPERTIES
	variant: RouteVariant = RouteVariant.websocket;

	get endpoint(): string {
		return joinPathSegments($registry.prefix, this.path);
	}

	get method(): Method {
		return Method.GET;
	}

	get handler(): Func<[Context], R> {
		return () => this;
	}

	model = undefined;
}
