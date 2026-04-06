import type { WebSocketOnClose } from "@/Route/WebSocketOnClose";
import type { WebSocketOnMessage } from "@/Route/WebSocketOnMessage";
import type { WebSocketOnOpen } from "@/Route/WebSocketOnOpen";

export type WebSocketRouteDefinition = {
	onOpen?: WebSocketOnOpen;
	onClose?: WebSocketOnClose;
	onMessage: WebSocketOnMessage;
};
