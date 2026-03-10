import type { Method } from "@/Request/enums/Method";
import type { CHeadersInit } from "@/Headers/types/CHeadersInit";

export type CRequestInit = Omit<RequestInit, "headers" | "method"> & {
	headers?: CHeadersInit;
	method?: Method;
};
