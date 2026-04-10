import type { PackageInterface } from "./PackageInterface";
import type { PackageManager } from "../PackageManager/PackageManager";

export class Package implements PackageInterface {
	constructor(
		private readonly selfPm: PackageManager,
		public readonly name: string,
		public readonly dev: boolean = false,
		private readonly vrs?: string,
	) {}

	get version(): string | null {
		if (this.vrs) return this.vrs;
		const thisVersion =
			this.selfPm.devDependencies[this.name] ??
			this.selfPm.dependencies[this.name];
		if (thisVersion?.includes("workspace")) {
			return this.selfPm.version;
		}
		return thisVersion ?? null;
	}
}
