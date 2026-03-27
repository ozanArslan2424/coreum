import type { Env } from "@/types.d.ts";
import { log } from "@/utils/internalLogger";
import { strIsDefined } from "@/utils/strIsDefined";
import type { Func } from "@/utils/types/Func";
import type { OrString } from "@/utils/types/OrString";
import path from "path";

export class XConfig {
	static get runtime(): string {
		if (typeof Bun !== "undefined") {
			return "bun";
		}

		if (typeof process !== "undefined" && process?.env) {
			return "node";
		}

		log.warn(
			"⚠️ Runtime isn't Bun or NodeJS. Features may not be available. App might not start.",
		);
		return "unknown";
	}

	static get nodeEnv(): OrString<"development" | "production" | "test"> {
		return this.env.NODE_ENV ?? "development";
	}

	static get env(): NodeJS.ProcessEnv {
		switch (this.runtime) {
			case "bun":
				return Bun.env;
			case "node":
				return process.env;
			default:
				log.warn(
					"⚠️ process.env wasn't available. Your environment variables are in memory.",
				);
				return {};
		}
	}

	static cwd() {
		return process.cwd();
	}

	static resolvePath(...paths: string[]) {
		return path.resolve(...paths);
	}

	static get<T = string>(
		key: OrString<keyof Env>,
		opts?: { parser?: Func<[raw: string], T>; fallback?: T },
	): T {
		const value = this.env[key];

		if (strIsDefined(value)) {
			return opts?.parser ? opts?.parser(value) : (value as T);
		}

		if (opts?.fallback !== undefined) {
			return opts?.fallback;
		}

		log.warn(`${key} doesn't exist in env`);
		return undefined as T;
	}

	static set(key: string, value: string | number | boolean): void {
		if (typeof value === "number") {
			this.env[key] = value.toString();
			return;
		}

		if (typeof value === "boolean") {
			this.env[key] = value ? "true" : "false";
			return;
		}

		this.env[key] = value;
	}
}
