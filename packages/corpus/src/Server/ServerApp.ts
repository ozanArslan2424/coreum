import * as Bun from "bun";

import type { WebSocketRoute } from "@/index";

export type ServerApp = Bun.Server<WebSocketRoute>;
