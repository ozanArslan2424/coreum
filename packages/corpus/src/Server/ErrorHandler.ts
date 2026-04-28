import type { Func } from "corpus-utils/Func";
import type { MaybePromise } from "corpus-utils/MaybePromise";

import type { Context } from "@/Context/Context";
import type { Res } from "@/Res/Res";

export type ErrorHandler<R = unknown> = Func<[Error, Context], MaybePromise<Res<R>>>;
