import type { __Coreum_Context } from "@/Context/__Coreum_Context";

export type __Coreum_MiddlewareCallback<D = void> = (context: __Coreum_Context) => Promise<D> | D;
