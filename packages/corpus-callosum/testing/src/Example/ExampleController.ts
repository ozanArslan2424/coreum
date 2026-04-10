import { C } from "@ozanarslan/corpus";
import { ExampleType } from "./ExampleModel";
import { ExampleService } from "./ExampleService";
export class ExampleController extends C.Controller {
	constructor(private readonly service: ExampleService) {
		super();
	}
	prefix = "/example";
	get = this.route<unknown, unknown, ExampleType["get"]["params"]>(
		"/:id",
		(c) => this.service.get(c.params),
	);
	list = this.route<unknown, ExampleType["list"]["search"]>("/", (c) =>
		this.service.list(c.search),
	);
	create = this.route<ExampleType["create"]["body"]>(
		{ method: "POST", path: "/" },
		(c) => this.service.create(c.body),
	);
	update = this.route<
		ExampleType["update"]["body"],
		unknown,
		ExampleType["update"]["params"]
	>({ method: "PUT", path: "/:id" }, (c) =>
		this.service.update(c.params, c.body),
	);
}
