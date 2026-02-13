import { EnvInterface as IEnv } from "@/modules/Config/EnvInterface";
import { DatabaseClientInterface as IDatabaseClient } from "@/modules/DatabaseClient/DatabaseClientInterface";
import { LoggerInterface as ILogger } from "@/modules/Logger/LoggerInterface";

declare module "coreum" {
	export interface Env extends IEnv {}
	export interface DatabaseClientInterface extends IDatabaseClient {}
	export interface LoggerInterface extends ILogger {}
}

export as namespace coreum;
