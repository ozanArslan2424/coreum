import type { Context } from "@/Context/Context";
import type { CResponse } from "@/CResponse/CResponse";
import type { Func } from "corpus-utils/Func";
import type { MaybePromise } from "corpus-utils/MaybePromise";

export type MiddlewareHandler = Func<
	[context: Context],
	MaybePromise<void | CResponse>
>;
