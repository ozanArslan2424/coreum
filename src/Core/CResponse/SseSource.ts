import type { Func } from "@/Utils/Func";

export type SseSource = Func<
	[
		send: Func<
			[
				item: {
					data: unknown;
					event?: string;
					id?: string;
				},
			],
			void
		>,
	],
	void | Func<[], void>
>;
