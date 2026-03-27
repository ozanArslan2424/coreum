import { XConfig } from "@/XConfig/XConfig";
import { log } from "@/utils/internalLogger";

export function testDebug(...data: any[]) {
	if (XConfig.nodeEnv !== "test") return;

	log.log("[TEST DEBUG]: ", ...data);
}
