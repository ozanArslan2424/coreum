import { $registry } from "@/index";
import { RouteAbstract } from "@/Route/RouteAbstract";
import { RouteVariant } from "@/Route/RouteVariant";
import type { Context } from "@/Context/Context";
import { Method } from "@/CRequest/Method";
import type { WebSocketOnOpen } from "@/Route/WebSocketOnOpen";
import type { WebSocketOnClose } from "@/Route/WebSocketOnClose";
import type { WebSocketOnMessage } from "@/Route/WebSocketOnMessage";
import type { Func } from "corpus-utils/Func";
import { joinPathSegments } from "corpus-utils/joinPathSegments";

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
