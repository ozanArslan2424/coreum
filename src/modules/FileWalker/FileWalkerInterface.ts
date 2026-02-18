import type { FileWalkerFile } from "@/modules/FileWalker/types/FileWalkerFile";

export interface FileWalkerInterface {
	find(address: string): Promise<FileWalkerFile | null>;
	read(address: string): Promise<string | null>;
	getExtension(address: string): string;
	exists(address: string): Promise<boolean>;
}
