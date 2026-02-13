import type { RouteSchemas } from "@/modules/Parser/types/RouteSchemas";
import type { Schema } from "@/modules/Parser/types/Schema";

export interface ModelInterface {
	[key: string]: Schema | RouteSchemas;
}
