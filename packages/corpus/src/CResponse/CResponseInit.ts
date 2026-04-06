import type { Status } from "@/CResponse/Status";
import type { CookiesInit } from "@/Cookies/CookiesInit";
import type { CHeadersInit } from "@/CHeaders/CHeadersInit";

export type CResponseInit = {
	cookies?: CookiesInit;
	headers?: CHeadersInit;
	status?: Status;
	statusText?: string;
};
