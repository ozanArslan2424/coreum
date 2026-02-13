import type { ControllerInterface } from "@/modules/Controller/ControllerInterface";

import type { AnyRoute } from "@/modules/Route/types/AnyRoute";

type UseInput = ControllerInterface | AnyRoute;
type UseReturn = ControllerInterface | AnyRoute | void;

export interface MiddlewareInterface {
	use(): void;
	use(controller: ControllerInterface): ControllerInterface;
	use(route: AnyRoute): AnyRoute;
	use(input?: UseInput): UseReturn;
	useGlobally(): void;
	useOnController(controller: ControllerInterface): ControllerInterface;
	useOnRoute(route: AnyRoute): AnyRoute;
}
