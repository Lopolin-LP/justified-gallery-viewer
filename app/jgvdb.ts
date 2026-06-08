import * as zip from "../zip.js";
import { mediaCollections, mediaCollectionsSave, switchCollections, newCollection, mediaOrder, loadNewPics } from "./collections-old";
import { grabMedia, yeetAllMedia } from "./database-old";
import { reloadSettings, settings } from "./settings";
import { confirmation, downloadURI, uuidtime, uuid, arrayInvertAxis, type UUIDTime } from "./util";

// Exporting & Importing
let localStoragesToExport: ("mediaOrder" | "mediaCollections" | "settings")[] = ["mediaOrder", "mediaCollections", "settings"];

// jgvdb files
/*
all contain at the root a "conf.json" file
In that file is defined which type it is:
0 - Database
1 - Collection
2 - Settings

in the data entry, all data is preserved.
the version entry tells which version the database was made for.

and it also contains a few other things in the data entry, depending on type
0 - Database
- (strings) contains the exported localStorage

1 - Collection
- (various) simply contains the collections data.

2 - Settings
- (strings) simply contains the settings

3 - Raw Images
- Just exports the images from a collection and bundles them in a zip, nothing fancy

*/

export declare namespace jgvdbTypes {
    type files = [string, File | Blob][];
    /** Object representation of data saved in localStorage */
    type localStorages = {
        mediaOrder: string
        mediaCollections: string
        settings: string
    }
}

export interface jgvdb {
    /**
     * Export something from the Media Database
     * @param type 
     * @param info 
     */
    export(type: number, info?: UUIDTime): Promise<void>
    export(type: 0): Promise<void>
    export(type: 1, info: UUIDTime): Promise<void>
    export(type: 2): Promise<void>
    export(type: 3, info: UUIDTime): Promise<void>
    import(inputFileList: Blob | FileList | Blob[]): void

    /** Database actions */
    db: {
        /**
         * Export the Database
         */
        export(): Promise<Blob>
        /**
         * Import a database, replacing the existing one
         * @param conf 
         * @param files 
         * @param importSettings 
         */
        import(conf: jgvdbConfig.type0, files: jgvdbTypes.files, importSettings: boolean): void
    }
    /** Media Collections actions */
    mc: {
        export(id: UUIDTime): Promise<Blob>
        import(conf: jgvdbConfig.type1, files: jgvdbTypes.files): void
    }
    /** Settings actions */
    sg: {
        export(): Promise<Blob>
        import(conf: jgvdbConfig.type2): void
    }
    /** Raw Media Collection actions */
    rm: {
        export(id: UUIDTime): Promise<Blob>
    }
    /** Functions */
    f: {
        /** Makes a UUID */
        id(): void
        download(blob: File | Blob, name?: string): void
        properFileNameAppending(name: string, appendix: string): string
        makezip(files: {
            data: Blob | File | string,
            name: string,
            lastModified?: number | Date
        }[]): Promise<Blob>
        importmedia(files: jgvdbTypes.files): Promise<any>
        importlocalstorage(confdata: jgvdbTypes.localStorages): void
        exportlocalstorage(): jgvdbTypes.localStorages
    }
    /** Variables */
    v: {
        version: number
    }
}
export declare namespace jgvdbConfig {
    type type1 = {
        type: 1,
        version: number,
        data: {
            name: string,
            data: string[]
        }
    }
    type type0 = {
        type: 0,
        version: number,
        data: jgvdbTypes.localStorages
    }
    type type2 = {
        type: 2,
        version: number,
        data: typeof settings
    }
    type all = type0 | type1 | type2;
}

const jgvdb_local: jgvdb = {
    import: async (inputFileList) => { // Import, automatically dealing with the unzipping process and delegating it to the correct importer
        let file: Blob | File;
        if (inputFileList instanceof Blob) {
            file = inputFileList;
        } else if (inputFileList instanceof FileList || inputFileList instanceof Array) {
            file = inputFileList[0]!;
        } else {
            throw new Error("Supplied jgvdb file is not: Blob/File, FileList or Array. Cannot cope, must die.");
        }
        let imp = await (new zip.ZipReader(new zip.BlobReader(file))).getEntries();
        let properFiles: [string, File][] = [];
        let conf = undefined;
        for (let i = 0; i < imp.length; i++) {
            const zipJSblob = imp[i] as zip.Entry;
            if (zipJSblob.filename == "conf.json") {
                conf = JSON.parse(await zipJSblob.getData!(new zip.TextWriter()));
                continue;
            }
            let [idname, ...filenameOopsThisShouldNotBeAList] = zipJSblob.filename.split("__");
            const filename: string = filenameOopsThisShouldNotBeAList.join("__");
            // console.log(idname, filename)
            properFiles.push([idname!, new File([await zipJSblob.getData!(new zip.BlobWriter())], filename, { type: zip.getMimeType(zipJSblob.filename), lastModified: Number(zipJSblob.lastModDate) })]);
            // TODO: does this `idname!` syntax work?
        }
        // let conf = JSON.parse(properFiles.filter(obj => {return obj.name == "conf.json"})[0]);
        switch (conf.type) {
            case 0:
                confirmation(`You're importing a Database. This will OVERWRITE and <span style='color: red;'>DELETE EVERYTHING.</span> Are you sure you want to continue?
<br><label for="doSettingsImport">Import Settings?</label><input name="doSettingsImport" type="checkbox" checked>`, ()=>{
                    let doSettingsImport = true;
                    let doSettingsImportElm = document.querySelector("input[name=\"doSettingsImport\"]") as HTMLInputElement;
                    if (doSettingsImportElm) doSettingsImport = doSettingsImportElm.checked ?? doSettingsImport;
                    jgvdb_local.db.import(conf, properFiles, doSettingsImport);
                });
                break;
            case 1:
                jgvdb_local.mc.import(conf, properFiles);
                break;
            case 2:
                confirmation("This will overwrite your current settings. Are you sure?", ()=>{jgvdb_local.sg.import(conf);});
                break;
        
            default:
                break;
        }
    },
    export: async function (type: number, info?: UUIDTime): Promise<void> {
        switch (type) {
            case 0:
                jgvdb_local.f.download(await jgvdb_local.db.export(), "Database");
                break;
            case 1:
                jgvdb_local.f.download(await jgvdb_local.mc.export(info as UUIDTime), mediaCollections[info as UUIDTime]?.name);
                break;
            case 2:
                jgvdb_local.f.download(await jgvdb_local.sg.export(), "Settings");
                break;
            case 3:
                downloadURI(URL.createObjectURL(await jgvdb_local.rm.export(info as UUIDTime)), mediaCollections[info as UUIDTime]?.name + ".zip");
                break;
        
            default:
                break;
        }
    },
    db: { // Database
        export: async () => {
            mediaCollectionsSave();
            let conf = {
                type: 0,
                version: jgvdb_local.v.version,
                data: jgvdb_local.f.exportlocalstorage()
            };
            const media = await grabMedia();
            let themedia = [];
            Object.keys(media).forEach(key => {
                themedia.push({name: key + "__" + (media[key] as File).name, data: media[key] }); // TODO: Why do I not respect Blob at all? Is everything a File????
            });
            themedia.push({name: "conf.json", data: JSON.stringify(conf)});
            return await jgvdb_local.f.makezip(themedia);
        },
        import: async (conf, files, importSettings = true) => {
            await yeetAllMedia({dontreload: true, onlyDeleteDB: true});
            // Loading Media
            await jgvdb_local.f.importmedia(files);
            // Setup LocalStorage - Overwriting currently available data
            // If import settings isn't given, then filter out settings and only apply that
            let confRewritten: Record<string, any> = conf;
            if (!importSettings) confRewritten.data = Object.keys(confRewritten.data).reduce((p, c) => {if (c !== "settings") p[c] = confRewritten.data[c]; return p;}, new Object() as Record<string, any>);
            jgvdb_local.f.importlocalstorage(confRewritten.data);
            // Proceeed with finishing import.
            window.location.reload();
        }
    },
    mc: { // Media Collection
        export: async (id) => {
            if (!mediaCollections[id]) throw new Error("Invalid ID for mediaCollections", { cause: id });
            let allMedia = await grabMedia();
            let mediaExport = [];
            let conf = {
                type: 1,
                version: jgvdb_local.v.version,
                data: mediaCollections[id]
            };
            for (let i = 0; i < mediaCollections[id].data.length; i++) {
                const elmid = mediaCollections[id].data[i] as string;
                const elm = allMedia[elmid] as Blob | File;
                mediaExport.push({name: elmid + "__" + (elm as File).name, data: elm});
            }
            mediaExport.push({name: "conf.json", data: JSON.stringify(conf)});
            return await jgvdb_local.f.makezip(mediaExport);
        },
        import: async (conf, files) => {
            // files should not contain conf.json
            switchCollections(newCollection(conf.data.name), {dontreload: true});
            // Change IDs to eliminate possible conflicts.
            let oldIdToNewId: Map<UUIDTime, UUIDTime> = new Map();
            files = files.map(([oldId, file]) => {
                const newId = uuidtime();
                oldIdToNewId.set(oldId, newId);
                return [newId, file];
            });
            const futureMediaOrder = conf.data.data.map(id => oldIdToNewId.get(id));
            // Add images
            await jgvdb_local.f.importmedia(files);
            mediaOrder.replaceArray(futureMediaOrder);
            mediaCollectionsSave();
            window.location.reload(); // no firefox true
        }
    },
    sg: { // Settings
        export: async () => {
            let conf = {
                type: 2,
                version: jgvdb_local.v.version,
                data: settings
            };
            return await jgvdb_local.f.makezip([{name: "conf.json", data: JSON.stringify(conf)}]);
        },
        import: (conf) => {
            settings.replaceObject(conf.data);
            reloadSettings();
        }
    },
    rm: { // Raw Media of Collection
        export: async (id) => {
            const allMedia = await grabMedia();
            let mediaExport: {
                name: string,
                data: Blob | File
            }[] = [];
            if (!mediaCollections[id]) throw new Error("Invalid ID for mediaCollections", { cause: id });
            mediaCollections[id].data.forEach(item => {
                mediaExport.push({name: (allMedia[item] as File).name, data: allMedia[item]!});
            });
            return await jgvdb_local.f.makezip(mediaExport);
        }
    },
    f: { // Functions
        id: () => { return uuid(4) + "-"},
        download: (blob, name=undefined) => {
            if (!name) {
                name = "Untitled Download"; // This also contained .jgvdb once. Yay, "Untitled Download.jgvdb.jgvdb"!!
            }
            downloadURI(URL.createObjectURL(blob), name + ".jgvdb");
        },
        properFileNameAppending: (name, appendix) => {
            if (zip.getMimeType(name) == "application/octet-stream") {
                return name + "-" + appendix;
            }
            let splitname = name.split(".");
            let extension = splitname.pop();
            return splitname.join(".") + "-" + appendix + "." + extension;
        },
        makezip: async (files) => {
            // Files is an array containing Objects.
            /* {
                data: File/Blob/String,
                name: Filename -> if undefined it's taken from the file/blob if available,
                lastModified: When it was last modified - Anything that Date() can swallow is allowed -> if undefined it's taken from the file/blob if available OTHERWISE it will be the moment the file was created
            } */
            const zipper = new zip.BlobWriter("application/zip");
            const writer = new zip.ZipWriter(zipper);
            for (let i = 0; i < files.length; i++) {
                let item = files[i] as (typeof files)[number] & { datazip: zip.BlobReader };
                if (!item) throw new Error("Why did you give non-existent item??", { cause: [files, i] });
                // https://stackoverflow.com/a/45664645
                // If you want ONLY files, use item.constructor == File
                if (item.data instanceof Blob) { // True for both Blobs and Files
                    item.datazip = new zip.BlobReader(item.data);
                    if (!item.name && !(item.data as File).name) { // If there's absolutely no way I can get the name
                        console.warn("No filename supplied! Continuing without file");
                        continue;
                    }
                    item.name = item.name ?? (item.data as File).name;
                    // item.type = item.type ?? (item.data.type ?? zip.getMimeType(item.name));
                    item.lastModified = item.lastModified ?? ((item.data as File).lastModified ?? new Date());
                } else if (typeof item.data === "string") {
                    item.datazip = new zip.TextReader(item.data);
                    if (!item.name) {
                        console.warn("No name or type supplied! Continuing without text file");
                        continue;
                    }
                    item.lastModified = item.lastModified ?? new Date();
                } else {
                    console.warn("Data is invalid! Continuing without entry");
                    continue;
                }
                async function attemptWrite(actualFilename: string) {
                    await writer.add(actualFilename, item.datazip, { lastModDate: new Date(item.lastModified!) });
                }
                attemptWrite(item.name).catch(async (firstR) => {
                    // Catches if something went wrong
                    if (firstR.message.includes("File already exists")) {
                        // If duplicate file issue, handle it here
                        const THEfilename = item.name;
                        let finished = false;
                        for (let attempts = 1; (attempts < 10000 && !finished); attempts++) {
                            await new Promise((resolve: Function) => {
                                let test = attemptWrite(jgvdb_local.f.properFileNameAppending(THEfilename, attempts.toString()));
                                test.then(() => {
                                    finished = true;
                                    resolve();
                                }, (r) => {
                                    if (r.message.includes("File already exists")) {
                                        resolve();
                                    } else {
                                        finished = true;
                                        resolve();
                                        throw r;
                                    }
                                });
                            });
                        }
                    } else {
                        throw firstR;
                    }
                });
            };
            await writer.close();
            return await zipper.getData();
        },
        importmedia: async (files) => {
            // Loading Media
            let filesSorted = files.filter(obj => {return obj[0] != "conf.json"});
            let picsWithIDs = arrayInvertAxis(filesSorted);
            return await loadNewPics(picsWithIDs[1], true, picsWithIDs[0]);
        },
        importlocalstorage: (confdata) => {
            // Setup LocalStorage - Overwriting currently available data
            Object.keys(confdata).forEach((entry) => {
                localStorage.setItem(entry, (confdata as {[key: string]: string})[entry] as string);
            });
            return;
        },
        exportlocalstorage: () => {
            let result: Partial<jgvdbTypes.localStorages> = {};
            localStoragesToExport.forEach(item => {
                result[item] = localStorage.getItem(item) ?? "";
            });
            return result as jgvdbTypes.localStorages;
        }
    },
    v: { // Variables
        version: 0
    }
}

export const jgvdb = new Proxy(jgvdb_local, {
    get(target, prop, receiver) {
        return Reflect.get(target, prop, receiver);
    },
    set(target, prop, receiver) {
        throw new Error("You shall not overwrite this object.");
    }
})