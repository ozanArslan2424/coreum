import { TC, TX } from "./other/testing-modules";
import { describe, expect, it, spyOn, beforeEach } from "bun:test";
import { createTestServer } from "./utils/createTestServer";
import { createTestController } from "./utils/createTestController";
import { req } from "./utils/req";
import { log } from "@/utils/log";

describe("C.Middleware using extends", () => {
	const s = createTestServer();
	const middlewareData = "Hello";
	const overrideData = "world";
	const logSpy = spyOn(log, "log");
	beforeEach(() => logSpy.mockClear());

	const r1 = new TC.Route("/r12", (c) => c.data);
	new TC.Route("r22", (c) => c.data);
	const c1 = createTestController("c12");

	class M1 extends TC.MiddlewareAbstract {
		constructor() {
			super();
			this.register();
		}
		useOn: TC.MiddlewareUseOn = [r1, c1.cr1];
		handler: TC.MiddlewareHandler = (c) => {
			c.data = middlewareData;
		};
	}

	new M1();

	const r3 = new TC.Route("/r32", (c) => c.data);

	class M2 extends TC.MiddlewareAbstract {
		constructor() {
			super();
			this.register();
		}
		override useOn: TC.MiddlewareUseOn = [r3];
		override handler: TC.MiddlewareHandler = (c) => {
			c.data = { user: "john", role: "admin", count: 1 };
		};
	}

	new M2();

	const r4 = new TC.Route("/r42", (c) => c.data);

	class M3 extends TC.MiddlewareAbstract {
		constructor() {
			super();
			this.register();
		}
		override useOn: TC.MiddlewareUseOn = [r4];
		override handler: TC.MiddlewareHandler = (c) => {
			c.data = { user: "john", role: "admin", count: 1 };
		};
	}
	class M4 extends TC.MiddlewareAbstract {
		constructor() {
			super();
			this.register();
		}
		override useOn: TC.MiddlewareUseOn = [r4];
		override handler: TC.MiddlewareHandler = (c) => {
			(c.data as Record<string, unknown>).role = "superadmin";
			(c.data as Record<string, unknown>).count = 2;
		};
	}
	class M5 extends TC.MiddlewareAbstract {
		constructor() {
			super();
			this.register();
		}
		override useOn: TC.MiddlewareUseOn = "*";
		override handler: TC.MiddlewareHandler = (c) => {
			log.log(c.url.pathname);
		};
	}

	new M3();
	new M4();
	new M5();

	it("ROUTE - APPLIES TO REGISTERED ROUTE", async () => {
		const res = await s.handle(req("/r12"));
		const data = await TX.Parser.parseBody<string>(res);
		expect(data).toBe(middlewareData);
		expect(logSpy).toBeCalled();
	});

	it("ROUTE - DOES NOT APPLY TO UNREGISTERED ROUTE", async () => {
		const res = await s.handle(req("/r22"));
		const data = await TX.Parser.parseBody(res);
		expect(data).toBeEmptyObject();
		expect(logSpy).toBeCalled();
	});

	it("CONTROLLER - APPLIES TO REGISTERED CONTROLLER ROUTE", async () => {
		const res = await s.handle(req("/c12/cr1"));
		const data = await TX.Parser.parseBody<string>(res);
		expect(data).toBe(middlewareData);
		expect(logSpy).toBeCalled();
	});

	it("CONTROLLER - DOES NOT APPLY TO UNREGISTERED CONTROLLER ROUTE", async () => {
		const res = await s.handle(req("/c12/cr2"));
		const data = await TX.Parser.parseBody(res);
		expect(data).toBeEmptyObject();
		expect(logSpy).toBeCalled();
	});

	it("ROUTE - OVERRIDES PREVIOUS MIDDLEWARE DATA", async () => {
		class M6 extends TC.MiddlewareAbstract {
			constructor() {
				super();
				this.register();
			}
			override useOn: TC.MiddlewareUseOn = [r1];
			override handler: TC.MiddlewareHandler = (c) => {
				c.data = overrideData;
			};
		}
		new M6();

		const res = await s.handle(req("/r12"));
		const data = await TX.Parser.parseBody<string>(res);
		expect(data).toBe(overrideData);
		expect(logSpy).toBeCalled();
	});

	it("ROUTE - SETS OBJECT DATA", async () => {
		const res = await s.handle(req("/r32"));
		const data = await TX.Parser.parseBody<Record<string, unknown>>(res);
		expect(data).toEqual({ user: "john", role: "admin", count: 1 });
		expect(logSpy).toBeCalled();
	});

	it("ROUTE - MUTATES OBJECT DATA KEYS IN SUBSEQUENT MIDDLEWARE", async () => {
		const res = await s.handle(req("/r42"));
		const data = await TX.Parser.parseBody<Record<string, unknown>>(res);
		expect(data.user).toBe("john");
		expect(data.role).toBe("superadmin");
		expect(data.count).toBe(2);
		expect(logSpy).toBeCalled();
	});
});
