import { $registry } from "@/index";
import { Method } from "@/CRequest/Method";
import { RouteVariant } from "@/Route/RouteVariant";
import type { RouteModel } from "@/Model/RouteModel";
import type { RouteInterface } from "@/Route/RouteInterface";
import type { Context } from "@/Context/Context";
import type { RouterData } from "@/Registry/RouterData";
import type { Func } from "corpus-utils/Func";
import type { MaybePromise } from "corpus-utils/MaybePromise";

export abstract class RouteAbstract<
	B = unknown,
	S = unknown,
	P = unknown,
	R = unknown,
	E extends string = string,
> implements RouteInterface<B, S, P, R, E> {
	get id(): string {
		return `${this.method.toUpperCase()} ${this.endpoint}`;
	}

	abstract get handler(): Func<[Context<B, S, P, R>], MaybePromise<R>>;

	abstract get endpoint(): E;

	abstract get method(): Method;

	abstract readonly variant: RouteVariant;

	abstract readonly model?: RouteModel<B, S, P, R>;

	register(): void {
		$registry.router.add(this);
	}

	toRouterData(): RouterData {
		return {
			id: this.id,
			endpoint: this.endpoint,
			method: this.method,
			handler: this.handler,
			variant: this.variant,
		};
	}
}
