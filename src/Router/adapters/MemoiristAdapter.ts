import Memoirist from "memoirist";
import type { RouterAdapterInterface } from "@/Router/RouterAdapterInterface";
import type { RouterRouteData } from "@/Router/types/RouterRouteData";

export class MemoiristAdapter implements RouterAdapterInterface {
	private router = new Memoirist<RouterRouteData>();

	add(method: string, path: string, store: RouterRouteData): void {
		this.router.add(method, path, store);
	}

	find(method: string, path: string) {
		return this.router.find(method, path);
	}

	getRouteList(): Array<[string, string]> {
		return this.router.history.map(([method, path]) => [method, path]);
	}
}
