import { Config } from "@/modules/Config/Config";
import { FileWalker } from "@/modules/FileWalker/FileWalker";
import ts from "typescript";

export class JS {
	static async transpile(fileName: string, content: string): Promise<string> {
		// Check for web config first
		const webConfigPath = Config.resolvePath(Config.cwd(), "tsconfig.web.json");
		const defaultConfigPath = Config.resolvePath(Config.cwd(), "tsconfig.json");
		const webConfigExists = await FileWalker.exists(webConfigPath);
		const configPath = webConfigExists ? webConfigPath : defaultConfigPath;
		const configFile = ts.readConfigFile(configPath, ts.sys.readFile);
		const parsedConfig = ts.parseJsonConfigFileContent(
			configFile.config,
			ts.sys,
			Config.cwd(),
		);
		const result = ts.transpileModule(content, {
			compilerOptions: parsedConfig.options,
			fileName,
		});
		return result.outputText;
	}
}
