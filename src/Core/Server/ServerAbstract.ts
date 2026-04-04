import { Context } from "@/Core/Context/Context";
import { Status } from "@/Core/CResponse/Status";
import { $registry } from "@/index";
import { CError } from "@/Core/CError/CError";
import { CRequest } from "@/Core/CRequest/CRequest";
import { CResponse } from "@/Core/CResponse/CResponse";
import type { ErrorHandler } from "@/Core/Server/ErrorHandler";
import type { MaybePromise } from "@/Utils/MaybePromise";
import type { RequestHandler } from "@/Core/Server/RequestHandler";
import type { ServeArgs } from "@/Core/Server/ServeArgs";
import type { ServerInterface } from "@/Core/Server/ServerInterface";
import { Router } from "@/Core/Registry/Router";
import type { Func } from "@/Utils/Func";
import type { ServerOptions } from "@/Core/Server/ServerOptions";
import { log, logFatal } from "@/Utils/log";
import { WebSocketRoute } from "@/Core/Route/WebSocketRoute";
import type { RouterData } from "@/Core/Registry/RouterData";
import { RouteVariant } from "@/Core/Route/RouteVariant";

export abstract class ServerAbstract implements ServerInterface {
	protected abstract serve(options: ServeArgs): void;
	abstract close(closeActiveConnections?: boolean): Promise<void>;

	constructor(protected readonly opts?: ServerOptions) {
		$registry.router = new Router(opts?.adapter);
	}

	get routes(): Array<RouterData> {
		return $registry.router.list();
	}

	setGlobalPrefix(value: string): void {
		$registry.prefix = value;
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
		return handled.response;
	}

	protected async handleRequest(
		req: CRequest,
		onUpgrade: Func<[WebSocketRoute], undefined>,
	): Promise<CResponse | undefined> {
		const ctx = new Context(req);

		// gmw = global middlewares
		const gmw = $registry.middlewares.find("*");

		try {
			const gmwir = await gmw.inbound(ctx);
			if (gmwir instanceof CResponse) {
				return gmwir;
			}
			const match = $registry.router.find(req);

			if (req.isPreflight) {
				ctx.res = await this.handlePreflight(req);
			} else if (!match) {
				ctx.res = await this.handleNotFound(req);
			} else {
				// lmw = local middlewares
				const lmw = $registry.middlewares.find(match.route.id);

				const lmwir = await lmw.inbound(ctx);
				if (lmwir instanceof CResponse) {
					return lmwir;
				}

				await Context.appendParsedData(ctx, req, match);
				const mr = await match.route.handler(ctx);
				if (match.route.variant === RouteVariant.websocket && req.isWebsocket) {
					return onUpgrade(mr);
				} else if (mr instanceof CResponse) {
					ctx.res = mr;
				} else {
					ctx.res = new CResponse(mr, ctx.res);
				}

				const lmwor = await lmw.outbound(ctx);
				if (lmwor instanceof CResponse) {
					return lmwor;
				}
			}

			const gmwor = await gmw.outbound(ctx);
			if (gmwor instanceof CResponse) {
				return gmwor;
			}
		} catch (err) {
			ctx.res = await this.handleError(err as Error);
		}

		await $registry.cors?.handler(ctx);

		return ctx.res;
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

	protected handlePreflight: RequestHandler = async (req) => {
		if (!$registry.cors) {
			return new CResponse(undefined, { status: Status.NO_CONTENT });
		}
		const handler = $registry.cors.getPreflightHandler();
		return await handler(req);
	};
}
