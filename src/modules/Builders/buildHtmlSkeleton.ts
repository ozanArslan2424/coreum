import type { HtmlSkeleton } from "@/modules/StaticRoute/types/HtmlSkeleton";
import { HTML } from "@/modules/StaticRoute/utils/HTML";

export function buildHtmlSkeleton(skeleton: HtmlSkeleton): string {
	return HTML.build(skeleton);
}
