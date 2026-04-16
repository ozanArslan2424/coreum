import type { CHeadersInit } from "@/CHeaders/CHeadersInit";
import type { Method } from "@/CRequest/Method";

export type CRequestInit = Omit<RequestInit, "headers" | "method"> & {
	headers?: CHeadersInit;
	method?: Method;
};
