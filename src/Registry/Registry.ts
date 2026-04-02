import { MiddlewareRegistry } from "@/Router/registries/MiddlewareRegistry";
import type { Router } from "@/Router/Router";
import { logFatal } from "@/utils/log";
import type { XCors } from "@/XCors/XCors";

export class Registry {
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
