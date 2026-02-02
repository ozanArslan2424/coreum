import type { __Coreumum_ConfigEnvKey } from "@/Config/__Coreum_ConfigEnvKey";
import type { __Coreumum_ConfigValueParser } from "@/Config/__Coreum_ConfigValueParser";
import "dotenv/config";

export class __Coreumum_Config {
	static get<T = string>(
		key: __Coreumum_ConfigEnvKey,
		opts?: { parser?: __Coreumum_ConfigValueParser<T>; fallback?: T },
	): T {
		const value = process.env[key];
		if (value !== undefined && value !== "") {
			return opts?.parser ? opts?.parser(value) : (value as T);
		} else if (opts?.fallback !== undefined) {
			return opts?.fallback;
		} else {
			throw new Error(`${key} doesn't exist in env`);
		}
	}

	static set(key: string, value: string) {
		process.env[key] = value;
	}
}
