export interface CWebSocketInterface {
	/**
	 * - if **0**, the message was **dropped**.
	 * - if **-1**, there is **backpressure** of messages.
	 * - if **>0**, it represents the **number of bytes sent**.
	 */
	send(data: string | ArrayBufferLike): number;

	publish(topic: string, data: string | ArrayBufferLike): number;

	cork(callback: (ws: CWebSocketInterface) => unknown): unknown;

	/**
	 * Closes the connection.
	 * To close the connection abruptly, use `terminate()`.
	 */
	close(code?: number, reason?: string): void;

	/**
	 * Abruptly close the connection.
	 * To gracefully close the connection, use `close()`.
	 */
	terminate(): void;

	subscribe(topic: string): void;
	unsubscribe(topic: string): void;
	isSubscribed(topic: string): boolean;
	readonly subscriptions: string[];

	/** The IP address of the client. */
	readonly remoteAddress: string;

	/**
	 * The ready state of the client.
	 *
	 * - if `0`, the client is connecting.
	 * - if `1`, the client is connected.
	 * - if `2`, the client is closing.
	 * - if `3`, the client is closed.
	 */
	readonly readyState: 0 | 1 | 2 | 3;
}
