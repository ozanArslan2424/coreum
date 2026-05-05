import type { Config } from "../config";
import type { ImportableInterface } from "../Importable/ImportableInterface";
import type { ModuleInterface } from "../Module/ModuleInterface";
import { TypescriptWriter } from "../TypescriptWriter/TypescriptWriter";

export function writeMainFile(
	config: Config,
	mainFilePath: string,
	database: ImportableInterface,
	modules: ModuleInterface[],
) {
	const w = new TypescriptWriter(mainFilePath);

	w.$import({ keys: ["C", "X"], from: config.pkgPath });
	w.$import({ keys: [database.name], from: database.import(mainFilePath) });

	for (const m of modules) {
		w.$import({
			keys: [m.controller.name],
			from: m.controller.import(mainFilePath),
		});
		w.$import({
			keys: [m.service.name],
			from: m.service.import(mainFilePath),
		});
		w.$import({
			keys: [m.repository.name],
			from: m.repository.import(mainFilePath),
		});
	}

	w.$const({ name: "server", value: "new C.Server()" });
	w.$const({ name: database.camelName, value: `new ${database.name}()` });
	w.line(`new C.Route("/health", () => "ok");`);

	for (const m of modules) {
		w.$const({
			name: m.repository.camelName,
			value: `new ${m.repository.name}(${database.camelName})`,
		});
		w.$const({
			name: m.service.camelName,
			value: `new ${m.service.name}(${m.repository.camelName})`,
		});
		w.line(`new ${m.controller.name}(${m.service.camelName})`);
	}

	w.line(
		`new X.RateLimiter();`,
		`new C.Cors({`,
		`	allowedOrigins: [X.Config.get("CLIENT_URL")],`,
		`	allowedMethods: ["GET", "POST"],`,
		`	allowedHeaders: ["Content-Type", "Authorization"],`,
		`	credentials: true,`,
		`});`,
		``,
		`new C.Middleware({`,
		`	useOn: "*",`,
		`	handler: (c) => {`,
		`		console.log(\`[\${c.req.method}] \${c.url.pathname}\`);`,
		`	},`,
		`});`,
		``,

		`void server.listen(X.Config.get("PORT", { parser: Number, fallback: 3000 }));`,
	);

	return w.read();
}
