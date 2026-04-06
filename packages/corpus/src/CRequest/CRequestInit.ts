import type { Method } from "@/CRequest/Method";
import type { CHeadersInit } from "@/CHeaders/CHeadersInit";

export type CRequestInit = Omit<RequestInit, "headers" | "method"> & {
	headers?: CHeadersInit;
	method?: Method;
};
