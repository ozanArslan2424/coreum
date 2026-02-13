import type { HttpHeaderKey } from "@/modules/HttpHeaders/types/HttpHeaderKey";

export type CorsOptions = {
	allowedOrigins?: string[];
	allowedMethods?: string[];
	allowedHeaders?: HttpHeaderKey[];
	credentials?: boolean;
};
