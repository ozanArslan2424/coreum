import { Router } from "@/Router/Router";
import { Store } from "@/utils/Store";

import * as C from "@/C";
import * as X from "@/X";

export { Router } from "@/Router/Router";

export const $prefixStore = new Store("");
export const $routerStore = new Store(new Router());
export const $corsStore = new Store<X.Cors | null>(null);

export type * from "./types.d.ts";
export * from "@/C";
export * from "@/X";

export { C, C as Corpus, X, X as Extra };
