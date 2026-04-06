import { log, logFatal } from "corpus-utils/internalLog";
import { generate } from "./generate";
import { initialize } from "./initialize";

function badRequest(): never {
	log.bold("No action provided. Available actions:");
	log.info(
		"  gen   — generate types and API client from your server entry file",
	);
	log.info(
		"          example: corpus gen -m ./src/main.ts -o ./src/corpus.gen.ts",
	);
	log.info("  init  — scaffold an empty Corpus project");
	log.info("          example: corpus init");
	logFatal("Please provide an action and try again.");
}

const action = process.argv[2];

if (!action) {
	badRequest();
}

switch (action) {
	case "gen":
		generate();
		break;

	case "init":
		initialize();
		break;

	default:
		badRequest();
}
