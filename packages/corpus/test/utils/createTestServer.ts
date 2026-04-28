import { log } from "corpus-utils/internalLog";

import { TC } from "../_modules";

export function createTestServer(opts?: TC.ServerOptions & { withLogging?: boolean }) {
	const { withLogging, ...serverOpts } = opts ?? {
		withLogging: false,
	};
	const s = new TC.Server(serverOpts);

	if (withLogging === true) {
		s.setOnError((err, c) => {
			log.error("thrown error", err);
			return s.defaultErrorHandler(err, c);
		});

		s.setOnNotFound((req) => {
			log.error("not found request", req);
			return s.defaultNotFoundHandler(req);
		});
	}

	return s;
}
