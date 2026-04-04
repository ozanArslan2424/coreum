import type { CWebSocketInterface } from "@/Core/CWebSocket/CWebSocketInterface";
import type { Func } from "@/Utils/Func";
import type { MaybePromise } from "@/Utils/MaybePromise";

export type WebSocketOnClose = Func<
	[ws: CWebSocketInterface, code?: number, reason?: string],
	MaybePromise<void>
>;
