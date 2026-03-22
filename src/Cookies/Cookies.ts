import type { ConstructorOf } from "@/utils/ConstructorOf";
import type { CookiesAbstract } from "@/Cookies/CookiesAbstract";
import type { CookiesInterface } from "@/Cookies/CookiesInterface";

const Adapted = require(
	typeof Bun !== "undefined" ? "./Cookies.bun" : "./Cookies.node",
).default as ConstructorOf<typeof CookiesAbstract, CookiesInterface>;

export class Cookies extends Adapted {}
