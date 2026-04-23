import { describe, expect, it } from "bun:test";

import { MiddlewareRouter } from "@/MiddlewareRouter/MiddlewareRouter";
import { Route } from "@/Route/Route";

import { createTestController } from "./utils/createTestController";

describe("MiddlewareRouter.resolveRouteIds", () => {
	it('"*" returns ["*"]', () => {
		expect(MiddlewareRouter.resolveRouteIds("*")).toEqual(["*"]);
	});

	it("Route instance returns [route.id]", () => {
		const r = new Route("/resolve-route", (c) => c.data);
		expect(MiddlewareRouter.resolveRouteIds(r)).toEqual([r.id]);
		expect(MiddlewareRouter.resolveRouteIds([r])).toEqual([r.id]);
	});

	it("Controller expands to all routeIds", () => {
		const ctrl = createTestController("resolve-ctrl");
		expect(MiddlewareRouter.resolveRouteIds(ctrl)).toEqual(Array.from(ctrl.routeIds));
		expect(MiddlewareRouter.resolveRouteIds([ctrl])).toEqual(Array.from(ctrl.routeIds));
	});

	it("string passes through verbatim", () => {
		expect(MiddlewareRouter.resolveRouteIds(["/any-string"])).toEqual(["/any-string"]);
	});

	it("mixed array preserves order and expands controllers inline", () => {
		const rA = new Route("/rx-a", (c) => c.data);
		const ctrl = createTestController("rx-ctrl");
		const rB = new Route("/rx-b", (c) => c.data);

		expect(MiddlewareRouter.resolveRouteIds([rA, ctrl, rB.id])).toEqual([
			rA.id,
			...ctrl.routeIds,
			rB.id,
		]);
	});
});
