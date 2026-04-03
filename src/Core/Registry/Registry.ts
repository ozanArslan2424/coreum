import { MiddlewareRegistry } from "@/Core/Registry/MiddlewareRegistry";
import type { Router } from "@/Core/Registry/Router";
import { logFatal } from "@/Utils/log";
import type { XCors } from "@/Extra/XCors/XCors";

export class Registry {
	private _docs: Record<string, { method: string; model: any }> = {};
	public get docs(): Record<string, { method: string; model: any }> {
		return this._docs;
	}
	public set docs(value: Record<string, { method: string; model: any }>) {
		this._docs = value;
	}
	public appendDocs(key: string, value: { method: string; model: any }) {
		this.docs = { ...this.docs, [key]: value };
	}

	// PREFIX
	private _prefix: string = "";
	public get prefix(): string {
		return this._prefix;
	}
	public set prefix(value: string) {
		this._prefix = value;
		this.prefixRemake = () => {
			this.prefix = value;
		};
	}
	prefixRemake = () => {
		this.prefix = "";
	};

	// ROUTER
	private _router: Router | null = null;
	public get router(): Router {
		if (!this._router) {
			logFatal(
				"Router instance missing. Create a Server instance before any routes.",
			);
		}
		return this._router;
	}
	public set router(value: Router | null) {
		this._router = value;
		this.routerRemake = () => {
			this.router = value;
		};
	}
	routerRemake = () => {
		this.router = null;
	};

	// CORS
	private _cors: XCors | null = null;
	public get cors(): XCors | null {
		return this._cors;
	}
	public set cors(value: XCors | null) {
		this._cors = value;
	}

	// MIDDLEWARES
	private _middlewares: MiddlewareRegistry = new MiddlewareRegistry();
	public get middlewares(): MiddlewareRegistry {
		return this._middlewares;
	}
	public set middlewares(value: MiddlewareRegistry) {
		this._middlewares = value;
	}

	// RESET
	public reset() {
		this.prefixRemake();
		this.routerRemake();
		this.cors = null;
		this.middlewares = new MiddlewareRegistry();
	}
}
