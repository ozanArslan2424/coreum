import { Config } from "@/Config/Config";
import { CRequest } from "@/CRequest/CRequest";
import { Status } from "@/CResponse/enums/Status";
import { ServerAbstract } from "@/Server/ServerAbstract";
import type { ServeArgs } from "@/Server/types/ServeArgs";
import { log } from "@/utils/internalLogger";
import { WebSocketRoute } from "@/WebSocketRoute/WebSocketRoute";
import { CError } from "@/CError/CError";
import { CWebSocket } from "@/CWebSocket/CWebSocket";

type ServerAppUsingBun = Bun.Server<WebSocketRoute>;

export default class ServerUsingBun extends ServerAbstract {
	private app: ServerAppUsingBun | undefined;

	serve(args: ServeArgs): void {
		this.app = this.createApp(args);
	}

	async close(): Promise<void> {
		await this.handleBeforeClose?.();
		log.log("Closing...");

		await this.app?.stop(true);

		if (Config.nodeEnv !== "test") {
			process.exit(0);
		}
	}

	private createApp(options: ServeArgs): ServerAppUsingBun {
		return Bun.serve<WebSocketRoute>({
			port: options.port,
			hostname: options.hostname,
			idleTimeout: this.opts?.idleTimeout,
			tls: this.opts?.tls,
			fetch: async (request, server) => {
				// "host": "localhost:4444",
				// "connection": "Upgrade",
				// "upgrade": "websocket",
				// "sec-websocket-version": "13",
				// "sec-websocket-key": "74lUIg0FuiVdM0YRwGaQRA==",
				const req = new CRequest(request);
				return await this.handleRequest(req, (data) => {
					const upgraded = server.upgrade(request, { data });
					if (!upgraded) {
						throw new CError("Upgrade failed", Status.UPGRADE_REQUIRED);
					}
					return undefined;
				});
			},
			websocket: {
				async open(ws) {
					await ws.data.onOpen?.(new CWebSocket(ws));
				},
				async message(ws, message) {
					await ws.data.onMessage(new CWebSocket(ws), message);
				},
				async close(ws, code, reason) {
					await ws.data.onClose?.(new CWebSocket(ws), code, reason);
				},
			},
		});
	}
}
