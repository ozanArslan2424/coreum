import { C, X } from "@ozanarslan/corpus";

import { DatabaseClient } from "./Database/DatabaseClient";
import { ExampleController } from "./Example/ExampleController";
import { ExampleRepository } from "./Example/ExampleRepository";
import { ExampleService } from "./Example/ExampleService";

const server = new C.Server();

const db = new DatabaseClient();

new C.Route("/health", () => "ok");

const exampleRepository = new ExampleRepository(db);
const exampleService = new ExampleService(exampleRepository);
new ExampleController(exampleService);

void server.listen(X.Config.get("PORT", { parser: Number, fallback: 3000 }));
