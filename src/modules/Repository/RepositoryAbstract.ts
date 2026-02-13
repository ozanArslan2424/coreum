import type { DatabaseClientInterface } from "@/modules/DatabaseClient/DatabaseClientInterface";
import type { RepositoryInterface } from "@/modules/Repository/RepositoryInterface";

export abstract class RepositoryAbstract implements RepositoryInterface {
	constructor(readonly db: DatabaseClientInterface) {}
}
