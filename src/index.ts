import { GlobalPrefixStore } from "@/store/GlobalPrefixStore.js";
import { GlobalRouterStore } from "@/store/GlobalRouterStore.js";
import { GlobalCorsStore } from "@/store/GlobalCorsStore.js";
import * as C from "@/C";
import * as X from "@/X";

export const $prefixStore = new GlobalPrefixStore();
export const $routerStore = new GlobalRouterStore();
export const $corsStore = new GlobalCorsStore();

export type * from "./types.d.ts";
export * from "@/C";
export * from "@/X";

export { C, C as default, X, X as Extra };
