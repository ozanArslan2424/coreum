import type { Status } from "@/modules/HttpResponse/enums/Status";

export interface HttpErrorInterface extends Error {
	message: string;
	status: Status;
	data?: unknown;
}
