import type { Writer } from "./Writer";

export namespace BaseWriterTypes {
	export type BodyWriter = (w: Writer) => void;

	export type Disco<T extends string, U> = { variant: T } & U;

	export type Arg = `${string}: ${string}`;
}
