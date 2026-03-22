import type { ServerAbstract } from "@/Server/ServerAbstract";
import type { ServerInterface } from "@/Server/ServerInterface";
import type { ConstructorOf } from "@/utils/ConstructorOf";

/**
 * Server is the entrypoint to the app. It must be initialized before registering routes and middlewares.
 * ".listen()" to start listening.
 */

const Adapted = require(
	typeof Bun !== "undefined" ? "./Server.bun" : "./Server.node",
).default as ConstructorOf<typeof ServerAbstract, ServerInterface>;

export class Server extends Adapted {}
