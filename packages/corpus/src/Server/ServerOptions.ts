import type { RouterAdapterInterface } from "@/RouterAdapter/RouterAdapterInterface";

export type ServerOptions = {
	adapter?: RouterAdapterInterface;
	idleTimeout?: number;
	tls?: {
		cert: string | Buffer;
		key: string | Buffer;
		ca?: string | Buffer;
	};
};
