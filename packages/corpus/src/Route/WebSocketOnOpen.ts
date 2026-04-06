import type { CWebSocketInterface } from "@/CWebSocket/CWebSocketInterface";
import type { Func } from "corpus-utils/Func";
import type { MaybePromise } from "corpus-utils/MaybePromise";

export type WebSocketOnOpen = Func<
	[ws: CWebSocketInterface],
	MaybePromise<void>
>;
