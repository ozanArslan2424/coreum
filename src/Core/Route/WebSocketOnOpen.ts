import type { CWebSocketInterface } from "@/Core/CWebSocket/CWebSocketInterface";
import type { Func } from "@/Utils/Func";
import type { MaybePromise } from "@/Utils/MaybePromise";

export type WebSocketOnOpen = Func<
	[ws: CWebSocketInterface],
	MaybePromise<void>
>;
