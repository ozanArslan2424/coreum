import type { CRequest } from "@/CRequest/CRequest";
import type { RouterReturnData } from "@/Router/types/RouterReturnData";
import type { RouterRouteData } from "@/Router/types/RouterRouteData";

export interface RouterAdapterInterface {
	find(req: CRequest): RouterReturnData | null;
	list(): Array<RouterRouteData>;
	add(data: RouterRouteData): void;
}
