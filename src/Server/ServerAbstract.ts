import { Context } from "@/Context/Context";
import { Status } from "@/CResponse/enums/Status";
import { $corsStore, $prefixStore, $routerStore } from "@/index";
import { CError } from "@/CError/CError";
import { CRequest } from "@/CRequest/CRequest";
import { CResponse } from "@/CResponse/CResponse";
import type { ErrorHandler } from "@/Server/types/ErrorHandler";
import type { MaybePromise } from "@/utils/types/MaybePromise";
import type { RequestHandler } from "@/Server/types/RequestHandler";
import type { ServeArgs } from "@/Server/types/ServeArgs";
import type { ServerInterface } from "@/Server/ServerInterface";
import type { AfterResponseHandler } from "@/Server/types/AfterResponseHandler";
import { Router } from "@/Router/Router";
import type { Func } from "@/utils/types/Func";
import type { ServerOptions } from "@/Server/types/ServerOptions";
import { log, logFatal } from "@/utils/internalLogger";
import { WebSocketRoute } from "@/WebSocketRoute/WebSocketRoute";

export abstract class ServerAbstract implements ServerInterface {
	abstract serve(options: ServeArgs): void;
	abstract close(): Promise<void>;

	constructor(protected readonly opts?: ServerOptions) {
		$routerStore.set(new Router(opts?.adapter));
	}

	get routes(): Array<[string, string]> {
		return $routerStore.get().getRouteList();
	}

	setGlobalPrefix(value: string): void {
		$prefixStore.set(value);
	}

	async listen(
		port: ServeArgs["port"],
		hostname: ServeArgs["hostname"] = "0.0.0.0",
	): Promise<void> {
		try {
			process.on("SIGINT", () => this.close());
			process.on("SIGTERM", () => this.close());

			log.log(`Listening on ${hostname}:${port}`);

			await this.handleBeforeListen?.();
			this.serve({
				port,
				hostname,
			});
		} catch (err) {
			log.error("Server unable to start:", err);
			await this.close();
		}
	}

	async handle(request: Request): Promise<Response> {
		const req = new CRequest(request);
		const handled = await this.handleRequest(req, () => undefined);
		if (!handled) {
			logFatal("WebSocket requests cannot be handled with this method.");
		}
		return handled;
	}

	protected async handleRequest(
		req: CRequest,
		onUpgrade: Func<[WebSocketRoute], undefined>,
	): Promise<Response | undefined> {
		let res: CResponse;

		try {
			if (req.isPreflight) {
				// preflight for cors
				res = await this.handlePreflight(req);
			} else {
				// get router
				const router = $routerStore.get();
				// get route handler
				const handleFound = router.findRouteHandler(req);
				// create context for middleware
				const ctx = Context.makeFromRequest(req);
				// get global middleware
				const handleGlobalMiddleware = router.findMiddleware("*");
				// handleGlobalMiddleware
				await handleGlobalMiddleware(ctx);
				// handleFound
				const result = await handleFound?.(ctx);
				if (result instanceof WebSocketRoute && req.isWebsocket) {
					// ws requests return undefined
					return onUpgrade(result);
				} else if (result instanceof CResponse) {
					// http request
					res = result;
				} else {
					// nothing found
					res = await this.handleNotFound(req);
				}
			}
		} catch (err) {
			// handle any thrown error
			res = await this.handleError(err as Error);
		}

		// get cors config
		const cors = $corsStore.get();
		if (cors !== null) {
			// apply cors config
			cors.apply(req, res);
		}

		if (this.handleAfterResponse) {
			// apply response transformation
			res = await this.handleAfterResponse(res);
		}

		// return regular web response
		return res.response;
	}

	protected handleBeforeListen: Func<[], MaybePromise<void>> | undefined;
	setOnBeforeListen(handler: Func<[], MaybePromise<void>> | undefined): void {
		this.handleBeforeListen = handler;
	}
	defaultOnBeforeListen: Func<[], MaybePromise<void>> | undefined = undefined;

	protected handleBeforeClose: Func<[], MaybePromise<void>> | undefined;
	setOnBeforeClose(handler: () => MaybePromise<void>): void {
		this.handleBeforeClose = handler;
	}
	defaultOnBeforeClose: Func<[], MaybePromise<void>> | undefined = undefined;

	protected handleAfterResponse: AfterResponseHandler | undefined;
	setOnAfterResponse(handler: AfterResponseHandler | undefined): void {
		this.handleAfterResponse = handler;
	}
	defaultOnAfterResponse: AfterResponseHandler | undefined = undefined;

	protected handleError: ErrorHandler = (err) => this.defaultErrorHandler(err);
	setOnError(handler: ErrorHandler): void {
		this.handleError = handler;
	}
	defaultErrorHandler: ErrorHandler = (err) => {
		if (err instanceof CError) {
			return err.toResponse();
		}

		return new CResponse(
			{ error: err, message: "message" in err ? err.message : "Unknown" },
			{ status: Status.INTERNAL_SERVER_ERROR },
		);
	};

	protected handleNotFound: RequestHandler = (req) =>
		this.defaultNotFoundHandler(req);
	setOnNotFound(handler: RequestHandler): void {
		this.handleNotFound = handler;
	}
	defaultNotFoundHandler: RequestHandler = (req) => {
		return new CResponse(
			{ error: true, message: `${req.method} on ${req.url} does not exist.` },
			{ status: Status.NOT_FOUND },
		);
	};

	protected handlePreflight: RequestHandler = (req) =>
		this.defaultPreflightHandler(req);
	setOnPreflight(handler: RequestHandler): void {
		this.handlePreflight = handler;
	}
	defaultPreflightHandler: RequestHandler = () => {
		return new CResponse("Departed");
	};
}
