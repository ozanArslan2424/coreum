import type { CWebSocketInterface } from "@/CWebSocket/CWebSocketInterface";
import type { Func } from "corpus-utils/Func";
import type { MaybePromise } from "corpus-utils/MaybePromise";

export type WebSocketOnMessage = Func<
	[ws: CWebSocketInterface, message: string | Buffer],
	MaybePromise<void>
>;
