import { makeLogger } from "@/modules/Logger/LoggerClass";
import type { ServiceInterface } from "@/modules/Service/ServiceInterface";

export class ServiceAbstract implements ServiceInterface {
	readonly logger = makeLogger(this.constructor.name);
}
