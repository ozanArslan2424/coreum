import { Config } from "@/Config/Config";
import { log } from "@/utils/internalLogger";

export function testDebug(...data: any[]) {
	if (Config.nodeEnv !== "test") return;

	log.log("[TEST DEBUG]: ", ...data);
}
