import type { CacheDirective } from "@/CHeaders/CacheDirective";

export type StaticRouteDefinition =
	// just the file path, doesn't stream
	| string
	| {
			filePath: string;
			stream: false;
			cache?: CacheDirective;
	  }
	| {
			filePath: string;
			stream: true;
			// defaults to attachment
			disposition?: "attachment" | "inline";
			cache?: CacheDirective;
	  };
