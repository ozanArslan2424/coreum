import { log } from "@/Utils/log";

export {
	C as TC,
	X as TX,
	$registry as $registryTesting,
	$registry,
	Router as RouterTesting,
} from "../dist";

export const testLog = log.noop;
