import type { ConstructorOf } from "@/utils/ConstructorOf";
import type { XFileAbstract } from "@/XFile/XFileAbstract";
import type { XFileInterface } from "@/XFile/XFileInterface";

const Adapted = require(
	typeof Bun !== "undefined" ? "./XFile.bun" : "./XFile.node",
).default as ConstructorOf<typeof XFileAbstract, XFileInterface>;

export class XFile extends Adapted {}
