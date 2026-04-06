import type { CResponse } from "@/CResponse/CResponse";
import type { Func } from "corpus-utils/Func";
import type { MaybePromise } from "corpus-utils/MaybePromise";

export type ErrorHandler<R = unknown> = Func<
	[Error],
	MaybePromise<CResponse<R>>
>;
