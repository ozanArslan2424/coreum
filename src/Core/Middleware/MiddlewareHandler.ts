import type { Context } from "@/Core/Context/Context";
import type { CResponse } from "@/Core/CResponse/CResponse";
import type { Func } from "@/Utils/types/Func";
import type { MaybePromise } from "@/Utils/types/MaybePromise";

export type MiddlewareHandler = Func<
	[context: Context],
	MaybePromise<void | CResponse>
>;
