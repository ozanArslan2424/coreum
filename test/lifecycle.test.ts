import C, { X } from "@/index";
import { describe, expect, it, spyOn } from "bun:test";
import { createTestServer } from "./utils/createTestServer";
import { createTestController } from "./utils/createTestController";
import { req } from "./utils/req";
import { beforeEach } from "node:test";
import { log } from "@/utils/internalLogger";

describe("C.Middleware", () => {
	const s = createTestServer();
	const middlewareData = { hello: "world" };
	const overrideData = { hello: "override" };
	const otherData = { data: "other" };

	const r1 = new C.Route("/r1", (c) => c.data);
	const r2 = new C.Route("/r2", (c) => c.data);
	const r3 = new C.Route("/r3", (c) => c.data);

	new C.Middleware({
		useOn: [r1, r2],
		handler: (c) => {
			c.data = middlewareData;
		},
	});
	new C.Middleware({
		useOn: [r1],
		handler: (c) => {
			c.data = overrideData;
		},
	});
	new C.Middleware({
		variant: "outbound",
		useOn: [r3],
		handler: () => {
			log.log("outbound middleware is called");
			return new C.Response(otherData);
		},
	});

	it("DATA OVERRIDE", async () => {
		const res = await s.handle(req("/r1"));
		const data = await X.Parser.parseBody<{}>(res);
		expect(data).toEqual(overrideData);
	});

	it("NO DATA OVERRIDE", async () => {
		const res = await s.handle(req("/r2"));
		const data = await X.Parser.parseBody<{}>(res);
		expect(data).toEqual(middlewareData);
	});

	it("RESPONSE OVERRIDE", async () => {
		const res = await s.handle(req("/r3"));
		const data = await X.Parser.parseBody<{}>(res);
		expect(data).toEqual(otherData);
	});
});
