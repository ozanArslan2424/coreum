import type { Func } from "corpus-utils/Func";
import type { MaybePromise } from "corpus-utils/MaybePromise";

import type { ServerWebSocket } from "@/Server/ServerWebSocket";

export type WebSocketRouteDefinition = {
	onOpen?: Func<[ws: ServerWebSocket], MaybePromise<void>>;
	onClose?: Func<[ws: ServerWebSocket, code?: number, reason?: string], MaybePromise<void>>;
	onMessage: Func<[ws: ServerWebSocket, message: string | Buffer], MaybePromise<void>>;
};
