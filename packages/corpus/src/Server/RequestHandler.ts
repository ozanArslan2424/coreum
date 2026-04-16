import type { Func } from "corpus-utils/Func";
import type { MaybePromise } from "corpus-utils/MaybePromise";

import type { CRequest } from "@/CRequest/CRequest";
import type { CResponse } from "@/CResponse/CResponse";

export type RequestHandler<R = unknown> = Func<[CRequest], MaybePromise<CResponse<R>>>;
