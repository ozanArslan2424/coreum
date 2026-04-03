import { Registry } from "@/Core/Registry/Registry";

import * as C from "@/Core";
import * as X from "@/Extra";

export { Router } from "@/Core/Registry/Router";

export const $registry = new Registry();

export type * from "./types.d.ts";
export * from "@/Core";
export * from "@/Extra";

export { C, C as Corpus, X, X as Extra };
