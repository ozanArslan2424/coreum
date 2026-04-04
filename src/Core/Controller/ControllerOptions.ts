import type { Context } from "@/Core/Context/Context";
import type { Func } from "@/Utils/Func";
import type { MaybePromise } from "@/Utils/MaybePromise";

export type ControllerOptions = {
	prefix?: string;
	beforeEach?: Func<[context: Context], MaybePromise<void>>;
};
