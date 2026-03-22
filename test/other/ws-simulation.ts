import { TEST_PORT } from "../utils/req";

const WS_URL = `ws://localhost:${TEST_PORT}/ws`;

// ── helpers ──────────────────────────────────────────────────────────────────

function send(ws: WebSocket, payload: object) {
	ws.send(JSON.stringify(payload));
}

function close(ws: WebSocket): Promise<void> {
	return new Promise((resolve) => {
		ws.onclose = () => resolve();
		ws.close();
	});
}

function makeClient(
	label: string,
): Promise<{ ws: WebSocket; next: () => Promise<object> }> {
	return new Promise((resolve, reject) => {
		const ws = new WebSocket(WS_URL);
		const queue: object[] = [];
		const waiters: ((v: object) => void)[] = [];

		ws.onmessage = (e) => {
			const msg = JSON.parse(e.data as string);
			console.log(`[${label}] <<`, msg);
			const waiter = waiters.shift();
			if (waiter) waiter(msg);
			else queue.push(msg);
		};

		const next = (): Promise<object> => {
			if (queue.length) return Promise.resolve(queue.shift()!);
			return new Promise((res) => waiters.push(res));
		};

		ws.onopen = () => {
			console.log(`[${label}] connected`);
			resolve({ ws, next });
		};
		ws.onerror = () => reject(new Error(`[${label}] connection error`));
	});
}

// ── test ─────────────────────────────────────────────────────────────────────

async function run() {
	// Three clients
	const { ws: alice, next: aliceNext } = await makeClient("alice");
	const { ws: bob, next: bobNext } = await makeClient("bob");
	const { ws: carol, next: carolNext } = await makeClient("carol");

	// Consume the "connected" greeting from each
	await aliceNext();
	await bobNext();
	await carolNext();

	// ── ping / pong ───────────────────────────────────────────────────────────
	send(alice, { event: "ping", data: { ts: Date.now() } });
	const pong = await aliceNext();
	console.log("[alice] pong:", pong);

	// ── subscribe alice + bob to "news", carol to "sports" ───────────────────
	send(alice, { event: "subscribe", topic: "news" });
	send(bob, { event: "subscribe", topic: "news" });
	send(carol, { event: "subscribe", topic: "sports" });

	const aliceSub = await aliceNext();
	const bobSub = await bobNext();
	const carolSub = await carolNext();
	console.log("[alice] subscribed:", aliceSub);
	console.log("[bob]   subscribed:", bobSub);
	console.log("[carol] subscribed:", carolSub);

	// ── carol also subscribes to "news" ───────────────────────────────────────
	send(carol, { event: "subscribe", topic: "news" });
	const carolSubNews = await carolNext();
	console.log("[carol] subscribed:", carolSubNews);

	// ── query subscriptions ───────────────────────────────────────────────────
	send(carol, { event: "subscriptions" });
	const carolSubs = await carolNext();
	console.log("[carol] active subscriptions:", carolSubs); // ["sports", "news"]

	// ── alice publishes to "news" (bob + carol receive, alice gets ack) ───────
	// Set up listeners on bob and carol before alice publishes
	const bobReceives = bobNext();
	const carolReceives = carolNext();

	send(alice, {
		event: "publish",
		topic: "news",
		data: { headline: "corpus ships" },
	});

	const aliceAck = await aliceNext();
	const bobNews = await bobReceives;
	const carolNews = await carolReceives;
	console.log("[alice] publish ack:", aliceAck);
	console.log("[bob]   received news:", bobNews);
	console.log("[carol] received news:", carolNews);

	// ── carol publishes to "sports" (only carol is subscribed, she doesn't receive her own) ─
	send(carol, { event: "publish", topic: "sports", data: { score: "2-1" } });
	const carolSportsAck = await carolNext();
	console.log("[carol] sports publish ack:", carolSportsAck);

	// ── bob unsubscribes from "news" ──────────────────────────────────────────
	send(bob, { event: "unsubscribe", topic: "news" });
	const bobUnsub = await bobNext();
	console.log("[bob]   unsubscribed:", bobUnsub);

	// ── alice publishes to "news" again — only carol should receive ───────────
	const carolReceives2 = carolNext();

	send(alice, {
		event: "publish",
		topic: "news",
		data: { headline: "bob missed this" },
	});
	await aliceNext(); // ack

	const carolNews2 = await carolReceives2;
	console.log("[carol] received news after bob left:", carolNews2);

	// ── unknown event ─────────────────────────────────────────────────────────
	send(bob, { event: "explode" });
	const err = await bobNext();
	console.log("[bob]   error response:", err);

	// ── clean up ──────────────────────────────────────────────────────────────
	await Promise.all([close(alice), close(bob), close(carol)]);
	console.log("all clients closed");
}

run().catch(console.error);
