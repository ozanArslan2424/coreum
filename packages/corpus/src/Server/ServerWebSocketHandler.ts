import * as Bun from "bun";

import type { WebSocketRoute } from "@/index";

export type ServerWebSocketHandler = Bun.WebSocketHandler<WebSocketRoute>;
