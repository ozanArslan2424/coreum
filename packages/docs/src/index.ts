import { mkdtempSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

import { C, X } from "@ozanarslan/corpus";

import { compile } from "@/compiler/compile";

const outDir =
	X.Config.nodeEnv === "development"
		? mkdtempSync(join(tmpdir(), "corpus-"))
		: `${process.cwd()}/public`;

await compile(outDir);

const server = new C.Server();

new C.BundleRoute("/*", outDir);

await server.listen(3000);
