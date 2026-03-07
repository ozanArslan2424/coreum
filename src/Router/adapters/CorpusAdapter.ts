import type { RouterAdapterInterface } from "@/Router/RouterAdapterInterface";
import type { RouterRouteData } from "@/Router/types/RouterRouteData";
import { HttpError } from "@/Error/HttpError";
import { isRegexMatch } from "@/utils/isRegexMatch";
import { strIsEqual } from "@/utils/strIsEqual";

export class CorpusAdapter implements RouterAdapterInterface {
	// endpoint -> RouteRegistryData
	private _routes: Map<string, RouterRouteData> | undefined;
	private get routes(): Map<string, RouterRouteData> {
		if (!this._routes) {
			this._routes = new Map<string, RouterRouteData>();
		}
		return this._routes;
	}

	add(_method: string, _path: string, store: RouterRouteData): void {
		this.checkPossibleCollision(store);
		this.routes.set(store.id, store);
	}

	find(
		method: string,
		path: string,
	): { store: RouterRouteData; params?: Record<string, unknown> } | null {
		let route: RouterRouteData | null = null;

		for (const [endpoint, data] of this.routes.entries()) {
			if (endpoint.includes(":")) {
				if (isRegexMatch(path, data.pattern)) {
					route = data;
					break;
				}
				if (
					this.hasLastPartParam(endpoint) &&
					strIsEqual(endpoint.split("/").slice(0, -1).join("/"), path, "lower")
				) {
					route = data;
					break;
				}
			} else if (strIsEqual(endpoint, path)) {
				route = data;
				break;
			}
		}

		if (route === null) throw HttpError.notFound();
		if (!strIsEqual(method, route.method, "upper"))
			throw HttpError.methodNotAllowed();

		return { store: route };
	}

	getRouteList(): Array<[string, string]> {
		return Array.from(this.routes.values()).map((r) => [r.method, r.endpoint]);
	}

	private checkPossibleCollision(data: RouterRouteData) {
		const existingById = this.routes.get(data.id);
		if (existingById) {
			console.error(
				`⚠️  Collision: ${data.method} ${data.endpoint} clashes with ${existingById.method} ${existingById.endpoint}`,
			);
		}

		for (const existing of this.routes.values()) {
			// Different methods can't clash
			if (existing.method !== data.method) continue;

			if (this.hasAnyParam(data.endpoint)) {
				// Has params, pattern shouldn't match existing
				if (isRegexMatch(data.endpoint, existing.pattern)) {
					console.error(
						`⚠️  Collision: ${data.method} ${data.endpoint} clashes with ${existing.method} ${existing.endpoint}`,
					);
				}

				// Param route vs static route with same base
				if (!this.hasAnyParam(existing.endpoint)) {
					if (
						strIsEqual(
							this.removeLastParam(data.endpoint),
							existing.endpoint,
							"lower",
						)
					) {
						console.error(
							`⚠️  Param route ${data.method} ${data.endpoint} may conflict with static ${existing.method} ${existing.endpoint}`,
						);
					}
				}
			} else {
				// No params, endpoint string shouldn't already exist
				if (strIsEqual(data.endpoint, existing.endpoint, "lower")) {
					console.error(
						`⚠️  Collision: ${data.method} ${data.endpoint} already exists`,
					);
				}

				// No params but existing has last part param
				if (this.hasLastPartParam(existing.endpoint)) {
					if (
						strIsEqual(
							this.removeLastParam(data.endpoint),
							this.removeLastParam(existing.endpoint),
							"lower",
						)
					) {
						console.error(
							`⚠️  Static route ${data.method} ${data.endpoint} may be shadowed by param route ${existing.method} ${existing.endpoint}`,
						);
					}
				}
			}
		}
	}

	private hasLastPartParam(endpoint: string): boolean {
		if (!this.hasAnyParam(endpoint)) return false;
		const parts = endpoint.split("/");
		return parts[parts.length - 1]?.startsWith(":") ?? false;
	}

	private removeLastParam(endpoint: string): string {
		return endpoint.split("/").slice(0, -1).join("/");
	}

	private hasAnyParam(endpoint: string): boolean {
		return endpoint.includes(":");
	}
}
