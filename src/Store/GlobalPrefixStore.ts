import { StoreAbstract } from "@/store/StoreAbstract";

export class GlobalPrefixStore extends StoreAbstract<string> {
	protected value = "";
}
