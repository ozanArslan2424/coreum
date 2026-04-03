import type { Method } from "@/Core/CRequest/Method";
import type { CHeadersInit } from "@/Core/CHeaders/CHeadersInit";

export type CRequestInit = Omit<RequestInit, "headers" | "method"> & {
	headers?: CHeadersInit;
	method?: Method;
};
