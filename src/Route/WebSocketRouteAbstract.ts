import { RouteAbstract } from "@/Route/RouteAbstract";
import { RouteVariant } from "@/Route/enums/RouteVariant";
import type { Func } from "@/utils/types/Func";
import type { Context } from "@/Context/Context";
import { Method } from "@/CRequest/enums/Method";
import type { WebSocketOnOpen } from "@/Route/types/WebSocketOnOpen";
import type { WebSocketOnClose } from "@/Route/types/WebSocketOnClose";
import type { WebSocketOnMessage } from "@/Route/types/WebSocketOnMessage";
import { joinPathSegments } from "@/utils/joinPathSegments";
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
