import { C } from "@/index";
import { log } from "@/utils/internalLogger";

export function createTestServer(
	opts?: C.ServerOptions & { withLogging?: boolean },
) {
	const { withLogging, ...serverOpts } = opts ?? {
		withLogging: false,
	};
	const s = new C.Server(serverOpts);

	if (withLogging === true) {
		s.setOnError((err) => {
			log.error("thrown error", err);
			return s.defaultErrorHandler(err);
		});

		s.setOnNotFound((req) => {
			log.error("not found request", req);
			return s.defaultNotFoundHandler(req);
		});
	}

	return s;
}
