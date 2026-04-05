export type ToCamelCasePart<S extends string> = S extends `:${infer P}`
	? P
	: S extends "*"
		? "*"
		: Lowercase<S>;

export type ToCamelCaseKey<S extends string> = S extends `/${infer Rest}`
	? ToCamelCaseKey<Rest>
	: S extends `${infer First}/${infer Rest}`
		? `${ToCamelCasePart<First>}${Capitalize<ToCamelCaseKey<Rest>>}`
		: ToCamelCasePart<S>;

export type PathParams<T extends string> =
	T extends `${string}:${infer Param}/${infer Rest}`
		? { [K in Param | keyof PathParams<Rest>]: string }
		: T extends `${string}:${infer Param}`
			? { [K in Param]: string }
			: T extends `${string}*`
				? { "*": string }
				: {};
