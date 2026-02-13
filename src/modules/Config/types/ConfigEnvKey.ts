import type { EnvInterface } from "@/modules/Config/EnvInterface";

export type ConfigEnvKey = keyof EnvInterface | (string & {});
