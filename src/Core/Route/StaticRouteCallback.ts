import type { Context } from "@/Core/Context/Context";
import type { CResponse } from "@/Core/CResponse/CResponse";
import type { Func } from "@/Utils/types/Func";
import type { MaybePromise } from "@/Utils/types/MaybePromise";

type R = CResponse | string;

export type StaticRouteCallback<B = unknown, S = unknown, P = unknown> = Func<
	[context: Context<B, S, P, R>, content: string],
	MaybePromise<R>
>;
