import type { CRequest } from "@/CRequest/CRequest";
import type { RouterAdapterInterface } from "@/Registry/RouterAdapterInterface";
import type { RouterReturn } from "@/Registry/types/RouterReturn";
import type { RouterData } from "@/Registry/types/RouterData";
import type { RouteInterface } from "@/Route/RouteInterface";
import { BranchAdapter } from "@/Registry/BranchAdapter";
import { log } from "@/utils/log";
import { internFunc } from "@/utils/internFunc";
import { objGetKeys } from "@/utils/objGetKeys";
import type { RouteModel } from "@/Model/types/RouteModel";
import { strRemoveWhitespace } from "@/utils/strRemoveWhitespace";
import type { Func } from "@/utils/types/Func";
import { $registry } from "@/index";

export class Router {
	constructor(private adapter: RouterAdapterInterface = new BranchAdapter()) {}

	private cache = new WeakMap<CRequest, RouterReturn>();
	private funcMap = new Map<string, Func>();

	add(route: RouteInterface<any, any, any, any, string>): void {
		const data = route.toRouterData();
		if (route.model) {
			if (!data.model) {
				data.model = {};
			}
			// const modelData: RouterData["model"] = {};
			for (const key of objGetKeys<keyof RouteModel>(route.model)) {
				if (key === "response") continue;
				const schema = route.model[key];
				if (!schema) continue;
				data.model[key] = internFunc(
					this.funcMap,
					schema["~standard"].validate,
					"model",
					strRemoveWhitespace(JSON.stringify(schema)),
				);
			}
		}
		this.adapter.add(data);
		$registry.appendDocs(route.endpoint, {
			method: route.method,
			model: route.model,
		});
	}

	find(req: CRequest): RouterReturn | null {
		const match = this.cache.get(req) ?? this.adapter.find(req);
		if (!match) return null;
		this.cache.set(req, match);
		return match;
	}

	list(): Array<RouterData> {
		const fn = this.adapter.list;
		if (!fn) {
			log.warn(
				"Router adapter does not support list method, returning empty array",
			);
		}
		return fn?.() ?? [];
	}
}
