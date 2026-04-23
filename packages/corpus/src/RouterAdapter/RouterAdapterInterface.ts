import type { Func } from "corpus-utils/Func";

import type { Req } from "@/Req/Req";
import type { RouterData } from "@/Router/RouterData";
import type { RouterReturn } from "@/Router/RouterReturn";

export interface RouterAdapterInterface {
	readonly __brand: string;
	find(req: Req): RouterReturn | null;
	add(data: RouterData): void;
	list: Func<[], Array<RouterData>> | undefined;
}
