import { afterAll, beforeAll, describe, expect, it } from "bun:test";
import fs from "node:fs/promises";
import os from "node:os";
import path from "node:path";

import { TX } from "./_modules";

describe("X.File", () => {
	let tmpDir: string;

	beforeAll(async () => {
		tmpDir = await fs.mkdtemp(path.join(os.tmpdir(), "xfile-test-"));
	});

	afterAll(async () => {
		await fs.rm(tmpDir, { recursive: true, force: true });
	});

	const writeFile = async (name: string, contents: string): Promise<string> => {
		const filePath = path.join(tmpDir, name);
		await fs.mkdir(path.dirname(filePath), { recursive: true });
		await fs.writeFile(filePath, contents, "utf8");
		return filePath;
	};

	describe("getters", () => {
		it("EXTENSION - FROM PATH", () => {
			const file = new TX.File("assets/document.txt");
			expect(file.extension).toBe("txt");
		});

		it("EXTENSION - FALLBACK WHEN NO DOT", () => {
			const file = new TX.File("assets/data", "json");
			expect(file.extension).toBe("json");
		});

		it("EXTENSION - DEFAULT TO TXT WHEN NO DOT AND NO FALLBACK", () => {
			const file = new TX.File("assets/data");
			expect(file.extension).toBe("txt");
		});

		it("NAME - STRIPS EXTENSION", () => {
			const file = new TX.File("assets/document.txt");
			expect(file.name).toBe("document");
		});

		it("NAME - HANDLES PATH WITH NO DIRECTORY", () => {
			const file = new TX.File("readme.md");
			expect(file.name).toBe("readme");
		});

		it("FULLNAME - INCLUDES EXTENSION", () => {
			const file = new TX.File("assets/document.txt");
			expect(file.fullname).toBe("document.txt");
		});

		it("PARENT_DIRS - ORDERED IMMEDIATE TO ROOT", () => {
			const file = new TX.File("a/b/c/file.txt");
			expect(file.parentDirs).toEqual(["c", "b", "a"]);
		});

		it("PARENT_DIRS - EMPTY FOR ROOT-LEVEL FILE", () => {
			const file = new TX.File("file.txt");
			expect(file.parentDirs).toEqual([]);
		});

		it("PARENT_DIRS - FILTERS EMPTY SEGMENTS FROM LEADING SLASH", () => {
			const file = new TX.File("/a/b/file.txt");
			expect(file.parentDirs).toEqual(["b", "a"]);
		});
	});

	describe("mimeType", () => {
		it("KNOWN EXTENSIONS", () => {
			expect(new TX.File("a.html").mimeType).toBe("text/html");
			expect(new TX.File("a.css").mimeType).toBe("text/css");
			expect(new TX.File("a.js").mimeType).toBe("application/javascript");
			expect(new TX.File("a.json").mimeType).toBe("application/json");
			expect(new TX.File("a.png").mimeType).toBe("image/png");
			expect(new TX.File("a.svg").mimeType).toBe("image/svg+xml");
			expect(new TX.File("a.pdf").mimeType).toBe("application/pdf");
			expect(new TX.File("a.mp4").mimeType).toBe("video/mp4");
		});

		it("UNKNOWN EXTENSION FALLS BACK TO OCTET-STREAM", () => {
			expect(new TX.File("a.xyz").mimeType).toBe("application/octet-stream");
		});

		it("USES FALLBACK EXTENSION WHEN PATH HAS NONE", () => {
			expect(new TX.File("data", "json").mimeType).toBe("application/json");
		});
	});

	describe("exists", () => {
		it("RETURNS TRUE FOR EXISTING FILE", async () => {
			const filePath = await writeFile("present.txt", "hello");
			const file = new TX.File(filePath);
			expect(await file.exists()).toBeTrue();
		});

		it("RETURNS FALSE FOR MISSING FILE", async () => {
			const file = new TX.File(path.join(tmpDir, "missing.txt"));
			expect(await file.exists()).toBeFalse();
		});
	});

	describe("text", () => {
		it("READS UTF8 BY DEFAULT", async () => {
			const filePath = await writeFile("text.txt", "hello world");
			const file = new TX.File(filePath);
			expect(await file.text()).toBe("hello world");
		});

		it("READS NON-ASCII CONTENT", async () => {
			const filePath = await writeFile("unicode.txt", "merhaba 🌍");
			const file = new TX.File(filePath);
			expect(await file.text()).toBe("merhaba 🌍");
		});

		it("READS EMPTY FILE", async () => {
			const filePath = await writeFile("empty.txt", "");
			const file = new TX.File(filePath);
			expect(await file.text()).toBe("");
		});

		it("THROWS WHEN FILE MISSING", () => {
			const file = new TX.File(path.join(tmpDir, "nope.txt"));
			expect(file.text()).rejects.toThrow();
		});
	});

	describe("stream", () => {
		it("RETURNS A READABLE STREAM", async () => {
			const filePath = await writeFile("stream.txt", "streamed contents");
			const file = new TX.File(filePath);
			const stream = await file.stream();
			expect(stream).toBeInstanceOf(ReadableStream);
		});

		it("STREAM CONTENTS MATCH FILE CONTENTS", async () => {
			const contents = "streamed contents";
			const filePath = await writeFile("stream-read.txt", contents);
			const file = new TX.File(filePath);
			const stream = await file.stream();
			const text = await new Response(stream).text();
			expect(text).toBe(contents);
		});

		it("HANDLES BINARY CONTENT", async () => {
			const filePath = path.join(tmpDir, "binary.bin");
			const bytes = new Uint8Array([0x00, 0x01, 0x02, 0xff, 0xfe]);
			await fs.writeFile(filePath, bytes);

			const file = new TX.File(filePath);
			const stream = await file.stream();
			const buffer = await new Response(stream).arrayBuffer();
			expect(new Uint8Array(buffer)).toEqual(bytes);
		});

		it("HANDLES EMPTY FILE", async () => {
			const filePath = await writeFile("empty-stream.txt", "");
			const file = new TX.File(filePath);
			const stream = await file.stream();
			const text = await new Response(stream).text();
			expect(text).toBe("");
		});

		it("THROWS WHEN FILE MISSING", () => {
			const file = new TX.File(path.join(tmpDir, "missing-stream.txt"));
			expect(file.stream()).rejects.toThrow();
		});
	});
	describe("write", () => {
		it("WRITES STRING CONTENT", async () => {
			const filePath = path.join(tmpDir, "written.txt");
			const file = new TX.File(filePath);
			await file.write("hello world");
			expect(await fs.readFile(filePath, "utf8")).toBe("hello world");
		});

		it("WRITES UINT8ARRAY CONTENT", async () => {
			const filePath = path.join(tmpDir, "written.bin");
			const file = new TX.File(filePath);
			const bytes = new Uint8Array([0x00, 0x01, 0xff]);
			await file.write(bytes);
			const read = await fs.readFile(filePath);
			expect(new Uint8Array(read)).toEqual(bytes);
		});

		it("WRITES ARRAYBUFFER CONTENT", async () => {
			const filePath = path.join(tmpDir, "written-ab.bin");
			const file = new TX.File(filePath);
			const buffer = new Uint8Array([0xde, 0xad, 0xbe, 0xef]).buffer;
			await file.write(buffer);
			const read = await fs.readFile(filePath);
			expect(new Uint8Array(read)).toEqual(new Uint8Array(buffer));
		});

		it("OVERWRITES EXISTING FILE", async () => {
			const filePath = await writeFile("overwrite.txt", "original");
			const file = new TX.File(filePath);
			await file.write("replaced");
			expect(await fs.readFile(filePath, "utf8")).toBe("replaced");
		});

		it("CREATES PARENT DIRECTORIES", async () => {
			const filePath = path.join(tmpDir, "nested", "deeply", "file.txt");
			const file = new TX.File(filePath);
			await file.write("nested content");
			expect(await fs.readFile(filePath, "utf8")).toBe("nested content");
		});

		it("WRITES EMPTY STRING", async () => {
			const filePath = path.join(tmpDir, "empty-write.txt");
			const file = new TX.File(filePath);
			await file.write("");
			expect(await fs.readFile(filePath, "utf8")).toBe("");
		});

		it("ROUND-TRIPS THROUGH TEXT()", async () => {
			const filePath = path.join(tmpDir, "roundtrip.txt");
			const file = new TX.File(filePath);
			await file.write("merhaba 🌍");
			expect(await file.text()).toBe("merhaba 🌍");
		});
	});

	describe("unlink", () => {
		it("REMOVES EXISTING FILE", async () => {
			const filePath = await writeFile("to-delete.txt", "bye");
			const file = new TX.File(filePath);
			await file.unlink();
			expect(await fs.exists(filePath)).toBeFalse();
		});

		it("THROWS WHEN FILE MISSING", () => {
			const file = new TX.File(path.join(tmpDir, "never-existed.txt"));
			expect(file.unlink()).rejects.toThrow();
		});

		it("EXISTS RETURNS FALSE AFTER UNLINK", async () => {
			const filePath = await writeFile("check-after.txt", "data");
			const file = new TX.File(filePath);
			expect(await file.exists()).toBeTrue();
			await file.unlink();
			expect(await file.exists()).toBeFalse();
		});

		it("WRITE AFTER UNLINK RECREATES FILE", async () => {
			const filePath = await writeFile("recreate.txt", "first");
			const file = new TX.File(filePath);
			await file.unlink();
			await file.write("second");
			expect(await file.text()).toBe("second");
		});
	});
});
