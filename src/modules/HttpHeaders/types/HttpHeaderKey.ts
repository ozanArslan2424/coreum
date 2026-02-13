import type { CommonHeaders } from "@/modules/HttpHeaders/enums/CommonHeaders";

export type HttpHeaderKey = CommonHeaders | (string & {});
