import type { CRequest } from "@/CRequest/CRequest";
import type { RouterReturn } from "@/Registry/RouterReturn";
import type { RouterData } from "@/Registry/RouterData";
import type { Func } from "corpus-utils/Func";
import type { Branded } from "corpus-utils/Branded";

export interface RouterAdapterInterface extends Branded<{
	find(req: CRequest): RouterReturn | null;
	add(data: RouterData): void;
	list: Func<[], Array<RouterData>> | undefined;
}> {}
