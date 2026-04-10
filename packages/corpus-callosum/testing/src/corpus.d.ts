import "@ozanarslan/corpus";
import type { DatabaseClient } from "./Database/DatabaseClient";

declare module "@ozanarslan/corpus" {
	interface DatabaseClientInterface extends DatabaseClient {}

	interface Env {
		PORT: string;
		CLIENT_URL: string;
	}

	interface ContextDataInterface {}
}

export {};
