import type { Context } from "@/Core/Context/Context";
import type { CResponse } from "@/Core/CResponse/CResponse";
import type { Func } from "@/Utils/Func";
import type { MaybePromise } from "@/Utils/MaybePromise";

export type MiddlewareHandler = Func<
	[context: Context],
	MaybePromise<void | CResponse>
>;
