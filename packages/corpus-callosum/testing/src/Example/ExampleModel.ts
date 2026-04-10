// No validation library detected.
export interface ExampleType {
	entity: { id: string; name: string };
	get: { params: { id: string }; response: ExampleType["entity"] };
	list: {
		search: { page?: string; limit?: string };
		response: [ExampleType["entity"]];
	};
	create: { body: { name: string }; response: ExampleType["entity"] };
	update: {
		params: ExampleType["get"]["params"];
		body: { name: string };
		response: ExampleType["entity"];
	};
	delete: { params: ExampleType["get"]["params"]; response: undefined };
}
