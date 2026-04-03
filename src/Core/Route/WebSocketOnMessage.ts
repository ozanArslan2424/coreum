import type { CWebSocketInterface } from "@/Core/CWebSocket/CWebSocketInterface";
import type { Func } from "@/Utils/types/Func";
import type { MaybePromise } from "@/Utils/types/MaybePromise";

export type WebSocketOnMessage = Func<
	[ws: CWebSocketInterface, message: string | Buffer],
	MaybePromise<void>
>;
