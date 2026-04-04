import type { Func } from "@/Utils/Func";

export type NdjsonSource = Func<
	[send: Func<[item: unknown], void>],
	void | Func<[], void>
>;
