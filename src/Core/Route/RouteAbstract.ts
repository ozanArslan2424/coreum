import { Method } from "@/Core/CRequest/Method";
import { RouteVariant } from "@/Core/Route/RouteVariant";
import type { RouteModel } from "@/Core/Model/RouteModel";
import type { RouteInterface } from "@/Core/Route/RouteInterface";
import type { Context } from "@/Core/Context/Context";
import type { RouterData } from "@/Core/Registry/RouterData";
import type { Func } from "@/Utils/Func";
import type { MaybePromise } from "@/Utils/MaybePromise";
import { $registry } from "@/index";

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
