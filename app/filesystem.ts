import { settings } from "./settings";

export function getFSFiles(item: FileSystemEntry): Promise<File[]> {
    return new Promise<File[]>(async (resolve, reject) => {
        // If file
        if (item instanceof FileSystemFileEntry) {
            item.file((f) => resolve([f]), reject);
            return;
        }
        // If directory
        // NOTE: We do not check here if we should import subfolders or not, as it's probably very intentional
        //       to import the folder given but not any other folders inside them.
        if (item instanceof FileSystemDirectoryEntry) {

            /**
             * 1. Iterate through all entries, flatten the directory tree. Only FileSystemFileEntry[] should be left
             * 2. Get the file of all of them
             * 3. Return
             */

            async function iterate(items: FileSystemEntry[]): Promise<FileSystemFileEntry[]> {
                const files: FileSystemFileEntry[] = [];
                for (const item of items) {
                    if (item instanceof FileSystemDirectoryEntry && !settings.dontImportSubfolders) {
                        const reader = item.createReader();
                        const entries = await new Promise((resolve: FileSystemEntriesCallback, reject: ErrorCallback) => reader.readEntries(resolve, reject));
                        files.push(...await iterate(entries));
                    } else if (item instanceof FileSystemFileEntry) {
                        files.push(item);
                    }
                }
                return files;
            }
            const fileEntries = await iterate([item]);

            const filePromises = fileEntries.map(file => new Promise((res: FileCallback, rej: ErrorCallback) => file.file(res, rej)));

            const files: File[] = [];
            for (const filePromise of filePromises)  {
                files.push(await filePromise);
            }

            resolve(files);
            return;
        }
        throw new Error("How do you have NEITHER a file NOR a directory, what the FUCK bro", { cause: item });
    })
}
