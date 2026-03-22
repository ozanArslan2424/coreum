import type { XCors } from "@/XCors/XCors";
import { StoreAbstract } from "@/store/StoreAbstract";

export class GlobalCorsStore extends StoreAbstract<XCors | null> {
	protected value: XCors | null = null;
}
