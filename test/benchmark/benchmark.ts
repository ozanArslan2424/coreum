import { log } from "@/utils/log";
import { RouterBenchmark } from "./RouterBenchmark";
import { TX } from "../other/testing-modules";

async function main() {
	const adapters = [new TX.MemoiristAdapter(), new TX.BranchAdapter()];
	const results: string[] = [];
	for (const adapter of adapters) {
		const bench = new RouterBenchmark(adapter);
		bench.setup();
		results.push(await bench.run());
	}

	log.success(["Finished", ...results].join("\n\n"));
}

// Run the benchmark
main().catch((error) => {
	log.fatal("Benchmark failed:", error);
});
