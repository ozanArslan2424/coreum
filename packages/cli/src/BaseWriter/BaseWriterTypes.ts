import type { BaseWriter } from "./BaseWriter";

export namespace BaseWriterTypes {
	export type BodyWriter<W extends BaseWriter> = (w: W) => void;
	export type Disco<T extends string, U> = { variant: T } & U;
	export type TypedArg = `${string}: ${string}`;
}
