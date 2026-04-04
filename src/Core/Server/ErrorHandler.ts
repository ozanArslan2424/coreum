import type { CResponse } from "@/Core/CResponse/CResponse";
import type { Func } from "@/Utils/Func";
import type { MaybePromise } from "@/Utils/MaybePromise";

export type ErrorHandler<R = unknown> = Func<
	[Error],
	MaybePromise<CResponse<R>>
>;
