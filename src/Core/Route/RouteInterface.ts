import type { Method } from "@/Core/CRequest/Method";
import type { RouteModel } from "@/Core/Model/RouteModel";
import type { RouteVariant } from "@/Core/Route/RouteVariant";
import type { Context } from "@/Core/Context/Context";
import type { RouterData } from "@/Core/Registry/RouterData";
import type { Func } from "@/Utils/types/Func";
import type { MaybePromise } from "@/Utils/types/MaybePromise";

export interface RouteInterface<
	B = unknown,
	S = unknown,
	P = unknown,
	R = unknown,
	E extends string = string,
> {
	get id(): string;
	get handler(): Func<[Context<B, S, P, R>], MaybePromise<R>>;
	get endpoint(): E;
	get method(): Method;
	readonly variant: RouteVariant;
	readonly model?: RouteModel<B, S, P, R>;
	register(): void;
	toRouterData(): RouterData;
}
