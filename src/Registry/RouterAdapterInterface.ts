import type { CRequest } from "@/CRequest/CRequest";
import type { RouterReturn } from "@/Registry/types/RouterReturn";
import type { RouterData } from "@/Registry/types/RouterData";
import type { Func } from "@/utils/types/Func";

export interface RouterAdapterInterface {
	find(req: CRequest): RouterReturn | null;
	add(data: RouterData): void;
	list: Func<[], Array<RouterData>> | undefined;
}
