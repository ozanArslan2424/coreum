import type { CResponse } from "@/Core/CResponse/CResponse";
import type { Func } from "@/Utils/types/Func";
import type { MaybePromise } from "@/Utils/types/MaybePromise";

export type ErrorHandler<R = unknown> = Func<
	[Error],
	MaybePromise<CResponse<R>>
>;
