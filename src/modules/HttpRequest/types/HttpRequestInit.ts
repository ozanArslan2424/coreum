import type { HttpHeadersInit } from "@/modules/HttpHeaders/types/HttpHeadersInit";
import type { Method } from "@/modules/HttpRequest/enums/Method";

export type HttpRequestInit = Omit<RequestInit, "headers" | "method"> & {
	headers?: HttpHeadersInit;
	method?: Method;
};
