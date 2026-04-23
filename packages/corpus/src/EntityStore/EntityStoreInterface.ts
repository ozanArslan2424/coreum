import type { EntityDefinition } from "@/Entity/EntityDefinition";

export interface EntityStoreInterface {
	map: Map<string, EntityDefinition>;
	add(def: EntityDefinition): void;
	find(name: string): EntityDefinition | null;
}
