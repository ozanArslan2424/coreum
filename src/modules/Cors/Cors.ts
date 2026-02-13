import { CorsAbstract } from "@/modules/Cors/CorsAbstract";
import type { CorsInterface } from "@/modules/Cors/CorsInterface";

/** Simple cors helper object to set cors headers */

export class Cors extends CorsAbstract implements CorsInterface {}
