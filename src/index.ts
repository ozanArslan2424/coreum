import { Registry } from "@/Registry/Registry";

import * as C from "@/C";
import * as X from "@/X";

export { Router } from "@/Router/Router";

export const $registry = new Registry();

export type * from "./types.d.ts";
export * from "@/C";
export * from "@/X";

export { C, C as Corpus, X, X as Extra };
