import type { CHeadersInit } from "@/CHeaders/CHeadersInit";
import type { CookiesInit } from "@/Cookies/CookiesInit";
import type { Status } from "@/CResponse/Status";

export type CResponseInit = {
	cookies?: CookiesInit;
	headers?: CHeadersInit;
	status?: Status;
	statusText?: string;
};
