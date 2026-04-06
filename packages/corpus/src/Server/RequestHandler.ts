import type { CRequest } from "@/CRequest/CRequest";
import type { CResponse } from "@/CResponse/CResponse";
import type { Func } from "corpus-utils/Func";
import type { MaybePromise } from "corpus-utils/MaybePromise";

export type RequestHandler<R = unknown> = Func<
	[CRequest],
	MaybePromise<CResponse<R>>
>;
