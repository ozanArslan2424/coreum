import { createTestServer } from "../utils/createTestServer";
import { log } from "@/utils/log";
import { C } from "../../dist";
import { TEST_PORT } from "../utils/req";

const server = createTestServer();

new C.WebSocketRoute("/ws", {
	onOpen: (ws) => {
		ws.send(
			JSON.stringify({
				event: "connected",
				data: { remoteAddress: ws.remoteAddress },
			}),
		);
	},

	onClose: (_ws, code, reason) => {
		log.log(`[ws] closed — code=${code} reason=${reason}`);
	},

	onMessage: (ws, message) => {
		const msg = JSON.parse(message as string) as {
			event: string;
			topic?: string;
			data?: unknown;
		};

		switch (msg.event) {
			case "subscribe": {
				ws.subscribe(msg.topic!);
				ws.send(JSON.stringify({ event: "subscribed", topic: msg.topic }));
				break;
			}
			case "unsubscribe": {
				ws.unsubscribe(msg.topic!);
				ws.send(JSON.stringify({ event: "unsubscribed", topic: msg.topic }));
				break;
			}
			case "publish": {
				const sent = ws.publish(
					msg.topic!,
					JSON.stringify({
						event: "message",
						topic: msg.topic,
						data: msg.data,
					}),
				);
				ws.send(
					JSON.stringify({ event: "published", topic: msg.topic, bytes: sent }),
				);
				break;
			}
			case "ping": {
				ws.send(JSON.stringify({ event: "pong", data: msg.data }));
				break;
			}
			case "subscriptions": {
				ws.send(
					JSON.stringify({ event: "subscriptions", data: ws.subscriptions }),
				);
				break;
			}
			default: {
				ws.send(
					JSON.stringify({
						event: "error",
						data: `unknown event: ${msg.event}`,
					}),
				);
			}
		}
	},
});

new C.Route("/:param1/:param2", () => "ok");
new C.Route("hello/:param1/:param2", () => "ok");
new C.Route("/world/:param1/:param2", () => "ok");
new C.Route("/lalala/:param1/:param2", () => "ok");
new C.Route("/yesyes/:param2", () => "ok");
new C.Route("/okay/:param1/letsgo", () => "ok");
new C.Route("/deneme/:param1/:param2", () => "ok");
new C.Route("/we/got/this", () => "ok");
new C.Route("/ohmyohmy", () => "ok");
new C.Route("/2bros", () => "ok");
new C.Route("/chillin/in/a/hottub", () => "ok");
new C.Route("/5/feet/apart/cuz/theyre/not/gay", () => "ok");
new C.Route("/verywild/*", () => "ok");
new C.Route("/craaaazy/*", () => "ok");

void server.listen(TEST_PORT);
