import type { CRequest } from "@/Core/CRequest/CRequest";
import type { CResponse } from "@/Core/CResponse/CResponse";
import type { Func } from "@/Utils/types/Func";
import type { MaybePromise } from "@/Utils/types/MaybePromise";

export type RequestHandler<R = unknown> = Func<
	[CRequest],
	MaybePromise<CResponse<R>>
>;
