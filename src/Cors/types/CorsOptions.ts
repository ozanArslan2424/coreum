import type { HeaderKey } from "@/Headers/types/HeaderKey";

export type CorsOptions = {
	allowedOrigins?: string[];
	allowedMethods?: string[];
	allowedHeaders?: HeaderKey[];
	credentials?: boolean;
};
