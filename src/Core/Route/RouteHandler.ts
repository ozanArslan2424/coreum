import type { Context } from "@/Core/Context/Context";
import type { Func } from "@/Utils/types/Func";
import type { MaybePromise } from "@/Utils/types/MaybePromise";

export type RouteHandler<
	B = unknown,
	S = unknown,
	P = unknown,
	R = unknown,
> = Func<[context: Context<B, S, P, R>], MaybePromise<R>>;
