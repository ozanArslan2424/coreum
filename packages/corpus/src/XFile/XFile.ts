import fs from "node:fs/promises";
import path from "node:path";

import { XFileAbstract } from "@/XFile/XFileAbstract";

export class XFile extends XFileAbstract {
	async exists(): Promise<boolean> {
		return fs.exists(this.path);
	}

	async text(encoding: BufferEncoding = "utf8"): Promise<string> {
		return fs.readFile(this.path, { encoding });
	}

	async stream(): Promise<ReadableStream<Uint8Array>> {
		const buffer = await fs.readFile(this.path);
		return new Blob([buffer], { type: this.mimeType }).stream();
	}

	async write(data: string | ArrayBuffer | Uint8Array): Promise<void> {
		await fs.mkdir(path.dirname(this.path), { recursive: true });
		const payload = data instanceof ArrayBuffer ? new Uint8Array(data) : data;
		await fs.writeFile(this.path, payload);
	}

	async unlink(): Promise<void> {
		await fs.unlink(this.path);
	}
}
