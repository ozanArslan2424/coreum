import { resolve } from "path";
import { existsSync } from "fs";
import type { PartialConfig } from "./Config";

export function getFileConfig() {
	const extensions = [".ts", ".js"];
	const base = resolve(process.cwd(), "corpus.config");
	const configPath = extensions.map((ext) => base + ext).find(existsSync);
	const fileC: PartialConfig = configPath ? require(configPath).default : {};
	return fileC;
}
