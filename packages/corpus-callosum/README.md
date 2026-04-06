# @ozanarslan/corpus-callosum

CLI for [@ozanarslan/corpus](https://github.com/ozanArslan2424/corpus) that generates TypeScript client code from your Corpus server.

## Usage

```bash
pnpx @ozanarslan/corpus-callosum -m ./src/main.ts
```

Or install as a dev dependency:

```bash
pnpm add -D @ozanarslan/corpus-callosum
```

```json
{
	"scripts": {
		"generate": "corpus -m ./src/main.ts -o ./src/generated.ts"
	}
}
```

## Requirements

Your entry file must call `.listen()` either at the top level or inside a single function.

## Options

| Flag | Description                                                      |
| ---- | ---------------------------------------------------------------- |
| `-m` | Path to your server entry file                                   |
| `-o` | Output path for the generated file                               |
| `-p` | Path to `@ozanarslan/corpus` (defaults to the installed package) |
| `-s` | Silent mode                                                      |

```ts
import type { StandardJSONSchemaV1 } from "@standard-schema/spec";

export type GeneratorConfig = Partial<{
	/**
	 * The file path where the generated output will be written.
	 *
	 * @default "/src/corpus.gen.ts"
	 */
	output: string;

	/**
	 * Controls how the paths object is exported.
	 *
	 * @default "individual"
	 *
	 * @example
	 * // pathsExport: "individual"
	 * export { path1, path2 };
	 *
	 * @example
	 * // pathsExport: "default"
	 * export default { path1, path2 };
	 *
	 * @example
	 * // pathsExport: "API" // or any other string for the object name
	 * export const API = { path1, path2 };
	 */
	exportRoutesAs: "individual" | "default" | (string & {});

	/**
	 * Whether to generate a typed API client class alongside the route constants.
	 *
	 * @default true
	 */
	generateClient: boolean;

	/**
	 * Controls how the API Client is exported, generateClient must be true.
	 *
	 * @default "CorpusApi"
	 */
	exportClientAs: string;

	/**
	 * Options passed to `schema["~standard"].jsonSchema.output()` for each route model.
	 * Use this to configure how your schema library handles types that don't have
	 * JSON Schema equivalents (e.g. Date, morph, predicate).
	 *
	 * @example
	 * // arktype — "just make it work"
	 * { jsonSchemaOptions: { target: "draft-07", libraryOptions: { fallback: ctx => ctx.base } } }
	 */
	jsonSchemaOptions: StandardJSONSchemaV1.Options;
}>;
```
