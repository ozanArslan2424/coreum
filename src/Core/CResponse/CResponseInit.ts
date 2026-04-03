import type { Status } from "@/Core/CResponse/Status";
import type { CookiesInit } from "@/Core/Cookies/CookiesInit";
import type { CHeadersInit } from "@/Core/CHeaders/CHeadersInit";

export type CResponseInit = {
	cookies?: CookiesInit;
	headers?: CHeadersInit;
	status?: Status;
	statusText?: string;
};
