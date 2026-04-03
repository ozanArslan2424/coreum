import type { CRequest } from "@/Core/CRequest/CRequest";
import type { RouterAdapterInterface } from "@/Core/Registry/RouterAdapterInterface";
import type { RouterReturn } from "@/Core/Registry/RouterReturn";
import type { RouterData } from "@/Core/Registry/RouterData";
import type { RouteInterface } from "@/Core/Route/RouteInterface";
import { BranchAdapter } from "@/Core/Registry/BranchAdapter";
import type { RouteModel } from "@/Core/Model/RouteModel";
import { log } from "@/Utils/log";
import { internFunc } from "@/Utils/internFunc";
import { objGetKeys } from "@/Utils/objGetKeys";
import { strRemoveWhitespace } from "@/Utils/strRemoveWhitespace";
import type { Func } from "@/Utils/types/Func";
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
