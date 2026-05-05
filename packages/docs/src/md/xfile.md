# XFile

The `XFile` class provides a unified interface for file system operations with automatic MIME type detection. It wraps the underlying platform file implementation with a consistent API for checking existence, reading and writing content, streaming, and deletion.

<section class="table-of-contents">

##### Contents

1. [Usage](#usage)
2. [Constructor Parameters](#constructor-parameters)
3. [Properties and getters](#properties)
4. [Methods](#methods)

</section>

## Usage

### Basic file operations

```ts
import { X } from "@ozanarslan/corpus";

const file = new X.File("assets/document.txt");

// Check existence
if (await file.exists()) {
	const content = await file.text();
	console.log(content);
}
```

### Writing files

```ts
const file = new X.File("output/report.txt");
await file.write("Generated at " + new Date().toISOString());
// Parent directories are created automatically
const nested = new X.File("output/2024/q4/summary.txt");
await nested.write("Quarterly summary");
```

### Streaming files

```ts
const video = new X.File("assets/video.mp4");
// Stream for responses
return X.Res.streamFile(video);
```

### MIME type detection

```ts
const css = new X.File("styles/main.css");
console.log(css.mimeType); // "text/css"
const unknown = new X.File("data.xyz", "json");
console.log(unknown.mimeType); // "application/json" (from fallback)
```

## Constructor Parameters

### path

The file system path to the file.

### fallbackExtension (optional)

Extension to use for MIME type detection when the path has no extension.

## Properties and getters

| Property   | Type       | Description                                                                                    |
| ---------- | ---------- | ---------------------------------------------------------------------------------------------- |
| path       | `string`   | The path from constructor.                                                                     |
| name       | `string`   | The name of the file without the extension.                                                    |
| extension  | `string`   | The file extension (e.g., "html", "md"), excluding the leading dot.                            |
| fullname   | `string`   | The full name of the file, including the extension.                                            |
| mimeType   | `string`   | The standard MIME type associated with the file's extension.                                   |
| parentDirs | `string[]` | Gets the parent directory names as an array, ordered from the immediate parent up to the root. |

## Methods

### exists

`exists(): Promise<boolean>`
Checks if the file exists on the file system.

```ts
const file = new X.File("assets/data.json");
const ok = await file.exists(); // boolean
```

### text

`text(encoding?): Promise<string>`
Reads the entire file contents as a string. Defaults to UTF-8.

```ts
const file = new X.File("assets/template.html");
const html = await file.text();
```

### stream

`stream(): Promise<ReadableStream<Uint8Array>>`
Returns a readable stream for the file. Useful for piping file contents into responses or other consumers without holding the full payload in application logic.

```ts
const file = new X.File("assets/video.mp4");
const stream = await file.stream();
// Use with Res or pipe elsewhere
```

### write

`write(data): Promise<void>`
Writes data to the file, overwriting any existing content. Accepts a string, `ArrayBuffer`, or `Uint8Array`. Parent directories are created automatically if they do not exist.

```ts
const file = new X.File("output/log.txt");
await file.write("entry written at " + Date.now());
const binary = new X.File("output/data.bin");
await binary.write(new Uint8Array([0xde, 0xad, 0xbe, 0xef]));
```

### unlink

`unlink(): Promise<void>`
Removes the file from the file system. Throws if the file does not exist; guard with [`exists`](#exists) when this is a possibility.

```ts
const file = new X.File("tmp/cache.json");
if (await file.exists()) {
	await file.unlink();
}
```
