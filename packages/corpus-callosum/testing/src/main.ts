import { C, X } from "@ozanarslan/corpus";
import { DatabaseClient } from "./Database/DatabaseClient";
import { ExampleController } from "./Example/ExampleController";
import { ExampleService } from "./Example/ExampleService";
import { ExampleRepository } from "./Example/ExampleRepository";
const server = new C.Server();
const databaseClient = new DatabaseClient();
new C.Route("/health", () => "ok");
const exampleRepository = new ExampleRepository(databaseClient);
const exampleService = new ExampleService(exampleRepository);
new ExampleController(exampleService);
new X.RateLimiter();
new X.Cors({
	allowedOrigins: [X.Config.get("CLIENT_URL")],
	allowedMethods: ["GET", "POST"],
	allowedHeaders: ["Content-Type", "Authorization"],
	credentials: true,
});

new C.Middleware({
	useOn: "*",
	handler: (c) => {
		console.log(`[${c.req.method}] ${c.url.pathname}`);
	},
});

void server.listen(X.Config.get("PORT", { parser: Number, fallback: 3000 }));
