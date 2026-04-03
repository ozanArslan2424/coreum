import { Status } from "@/Core/CResponse/Status";
import { CResponse } from "@/Core/CResponse/CResponse";

export class CError extends Error {
	constructor(
		public override message: string,
		public status: Status,
		public data?: unknown,
	) {
		super(message);
	}

	toResponse(): CResponse {
		if (this.data instanceof CResponse) {
			this.data.status = this.status;
			return this.data;
		}

		return new CResponse(
			{ error: this.data ?? true, message: this.message },
			{ status: this.status },
		);
	}

	isStatusOf(status: Status): boolean {
		return this.status === status;
	}
}
