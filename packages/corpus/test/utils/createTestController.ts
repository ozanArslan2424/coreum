import { TC } from "../_modules";

export function createTestController(prefix: string) {
	class TestController extends TC.Controller {
		prefix?: string | undefined = prefix;

		cr1 = this.route("/cr1", (c) => c.data);
		cr2 = this.route("cr2", (c) => c.data);
	}

	return new TestController();
}
