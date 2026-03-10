import type { Status } from "@/Response/enums/Status";
import type { CookiesInit } from "@/Cookies/types/CookiesInit";
import type { CHeadersInit } from "@/Headers/types/CHeadersInit";

export type CResponseInit = {
	cookies?: CookiesInit;
	headers?: CHeadersInit;
	status?: Status;
	statusText?: string;
};
