import type { CResponse } from "@/Response/CResponse";
import type { Func } from "@/utils/types/Func";
import type { MaybePromise } from "@/utils/types/MaybePromise";

export type ErrorHandler<R = unknown> = Func<
	[Error],
	MaybePromise<CResponse<R>>
>;
