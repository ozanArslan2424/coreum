import { ConfigEnv, JwtPayload } from "@/types";

declare module "coreum" {
	export interface ConfigEnv extends ConfigEnv {}
	export interface JwtPayload extends JwtPayload {}
}

export as namespace coreum;

export { ConfigEnv, JwtPayload };
