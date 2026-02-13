import type { ConfigValueParser } from "@/modules/Config/types/ConfigValueParser";
import type { ConfigEnvKey } from "@/modules/Config/types/ConfigEnvKey";

export class Config {
	static get env() {
		if (typeof Bun !== "undefined") {
			return Bun.env;
		}

		if (typeof process !== "undefined" && process?.env) {
			return process.env;
		}

		return {};
	}

	static get<T = string>(
		key: ConfigEnvKey,
		opts?: { parser?: ConfigValueParser<T>; fallback?: T },
	): T {
		const value = this.env[key];
		if (value !== undefined && value !== "") {
			return opts?.parser ? opts?.parser(value) : (value as T);
		}

		if (opts?.fallback !== undefined) {
			return opts?.fallback;
		}

		throw new Error(`${key} doesn't exist in env`);
	}

	static set(key: string, value: string) {
		this.env[key] = value;
	}
}
