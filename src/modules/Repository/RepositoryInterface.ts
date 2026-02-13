import type { DatabaseClientInterface } from "@/modules/DatabaseClient/DatabaseClientInterface";

export interface RepositoryInterface {
	readonly db: DatabaseClientInterface;
}
