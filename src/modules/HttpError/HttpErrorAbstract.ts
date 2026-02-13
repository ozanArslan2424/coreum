import type { Status } from "@/modules/HttpResponse/enums/Status";
import type { HttpErrorInterface } from "@/modules/HttpError/HttpErrorInterface";

export abstract class HttpErrorAbstract
	extends Error
	implements HttpErrorInterface
{
	constructor(
		public override message: string,
		public status: Status,
		public data?: unknown,
	) {
		super(message);
	}
}
