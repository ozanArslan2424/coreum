import type { WebSocketOnClose } from "@/Core/Route/WebSocketOnClose";
import type { WebSocketOnMessage } from "@/Core/Route/WebSocketOnMessage";
import type { WebSocketOnOpen } from "@/Core/Route/WebSocketOnOpen";

export type WebSocketRouteDefinition = {
	onOpen?: WebSocketOnOpen;
	onClose?: WebSocketOnClose;
	onMessage: WebSocketOnMessage;
};
