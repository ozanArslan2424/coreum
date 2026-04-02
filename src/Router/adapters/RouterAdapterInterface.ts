import type { CRequest } from "@/CRequest/CRequest";
import type { RouterReturn } from "@/Router/types/RouterReturn";
import type { RouterData } from "@/Router/types/RouterData";
import type { Func } from "@/utils/types/Func";

export interface RouterAdapterInterface {
	find(req: CRequest): RouterReturn | null;
	add(data: RouterData): void;
	list: Func<[], Array<RouterData>> | undefined;
}
