import type { Method } from "@/CRequest/Method";
import type { RouteModel } from "@/Model/RouteModel";
import type { RouteVariant } from "@/Route/RouteVariant";
import type { Context } from "@/Context/Context";
import type { RouterData } from "@/Registry/RouterData";
import type { Func } from "corpus-utils/Func";
import type { MaybePromise } from "corpus-utils/MaybePromise";

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
