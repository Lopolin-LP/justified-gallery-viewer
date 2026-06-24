import { settings } from "./settings";

// /**
//  * Scan for files given via `DataTransferItem`. Returns list of Files.
//  * @param item FileSystemEntry
//  * @param callback 
//  * @param ignoreDontImportSubfoldersFor 
//  * @returns 
//  * @deprecated needs a rewrite
//  */
// async function scanFiles(item: FileSystemEntry | null, callback: Function, ignoreDontImportSubfoldersFor: number = 0) {
//     // item type: DataTransferItem
//     // Scan folders, callback if not directory anymore.
//     // returns a promise
//     // https://developer.mozilla.org/en-US/docs/Web/API/DataTransferItem/webkitGetAsEntry
//     if (item === null) {
//         return;
//     }
//     return new Promise<void>(async (resolveThisShit) => { 
//         if (item instanceof FileSystemDirectoryEntry && (settings.dontImportSubfolders === false || ignoreDontImportSubfoldersFor > 0)) {
//             let directoryReader = item.createReader();
//             directoryReader.readEntries(async (entries) => {
//                 for (let entry of entries) {
//                     await scanFiles(entry, callback, ignoreDontImportSubfoldersFor-1); // wait for the inner children to fix themselves
//                 }
//                 resolveThisShit();
//             });
//         } else if (item instanceof FileSystemFileEntry) {
//             let file = await new Promise((resolve, reject) => item.file(resolve, reject)); // this has to be a promise
//             await callback(file);
//             resolveThisShit();
//             // let promising = new Promise((resolve) => { // this doesn't
//             //     callback(new Blob([file], {type: zip.getMimeType(item.name)})); // Okay so apparently I have trust issues with the data I'm given... so I create a new File
//             //     resolve();
//             // });
//             // promising.then(() => {resolveThisShit()});
//         } else {
//             resolveThisShit();
//         }
//     })
// }
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
// export function getDontImportSubfolders(length: number) {
//     let ignoreDontImportSubfoldersFor = 0;
//     if (settings.dontImportSubfolders === true && length == 1) {
//         ignoreDontImportSubfoldersFor = 1;
//     }
//     return ignoreDontImportSubfoldersFor;
// }
