import * as zip from "../zip.js"
import { getMimeType } from "../zip.js/mime-types.js";
import { MediaCollection, type MediaDatabase } from "./database.js";
import { collectionManager } from "./globals.js";
import { reloadSettings, settings } from "./settings.js";
import { confirmation, downloadURI, revokeBlobSoonTM, type UUIDTime } from "./util.js";

// General Types
export type JGVDBMediaCollection = {
    name: string,
    data: UUIDTime[]
}
export type JGVDBConf = {
    type: number,
    version: number
}

/** **Legacy Config - Version 0** */
export namespace JGVDBConf0 {
    export type DBDataParsed = {
        mediaOrder: UUIDTime[],
        mediaCollections: {
            current: UUIDTime,
            collections: UUIDTime[],
        } & {
            [key: UUIDTime]: JGVDBMediaCollection
        },
        settings: typeof settings
    }
    export type DB = {
        type: 0,
        version: 0,
        data: {
            // This JGVDB system took the `localStorage` contents as-is and threw it in here. Use DBDataParsed once you have taken care of this.
            mediaOrder: string,
            mediaCollections: string,
            settings: string
        }
    }
    export type MC = {
        type: 1,
        version: 0,
        data: JGVDBMediaCollection
    }
    export type SG = {
        type: 2,
        version: 0,
        data: typeof settings
    }
}

/**
 * **Current Config - Version 1**
 * 
 * Differences from V0 to V1
 * 
 * DB:
 * - localStorage Data is saved as actual JSON, not as the raw strings found in localStorage
 *   - this affects mediaCollections and settings
 * - "mediaOrder", "current (collection)", and "collections" does not exist anymore
 * - mediaCollections is just an object containing the collections, their metadata, key'ed by ID.
 *   - having a list of collections when you can just iterate over the keys/entries of an object is unecessary data, since the order of collections doesn't matter
 * 
 * MC:
 * *None*
 * 
 * SG:
 * *None*
 */
export namespace JGVDBConf1 {
    /** Database JGVDB conf.json */
    export type DB = { // note: compared to Version 0, the properties "mediaCollections.current" and "mediaOrder" have been removed.
        type: 0,
        version: 1,
        data: {
            mediaCollections: {
                [key: UUIDTime]: JGVDBMediaCollection
            },
            settings: typeof settings;
        }
    }
    
    /** Media Collection JGVDB conf.json */
    export type MC = {
        type: 1,
        version: 1,
        data: JGVDBMediaCollection
    }

    /** Settings JGVDB conf.json */
    export type SG = {
        type: 2,
        version: 1,
        data: typeof settings
    }
}

/*

Because this stuff is getting complicated, I'll just write down how it works:

JGVDB is the reference class. Contains a few functions too

anyways

IMPORTING:
static unzip the file -> creates instance -> import on instance to initiate import (will auto-import or request user input for confirmation)

EXPORTING
static generate -> creates instance -> export on instance to initiate export (will generate zip and download it)

GENERAL
static updateFromX -> Updates config file from older version. Usually, may take the given Files too.

OTHER NOTES
The files ON the JGVDB class (blobsInZip) are FINISHED and can be found as-is in the exported zip files.
When the zip is made, these are taken as-is, so any IDs needed in them are in them.
When the zip is extracted, these are presented there as-is. so any function importing them needs to extract the IDs first.

*/

/**
 * Represents a JGVDB file. Allows zipping it up again, or loading one into it.
 */
export class JGVDB {
    /** Reference for export function what to name the file (in both downloadURI and when creating the File blob) */
    filename: string = "";
    /** Returns new JGVDB Element with the requested configs. Calls the constructor with the config and the files. */
    static async generate(...args: any): Promise<JGVDB>
    static async generate(): Promise<JGVDB> {
        throw new Error("Implementation must provide this");
    }
    /**
     * Exports the configuration to the User's Downloads folder. Calls `JGVDB.zip()` and automatically downloads it.
     * @returns Promise resolves when exported (when download starts), or rejects, if something went wrong.
     */
    export(): Promise<void> {
        throw new Error("Implementation must provide this");
    }
    /**
     * Imports the configuration into the User's Browser. Calls necessary classes and functions and user confirmations automatically.
     * @returns Promise resolves when imported, and rejects if user cancels or something went wrong.
     */
    import(): Promise<void> {
        throw new Error("Implementation must provide this");
    }
    /** Takes a ZIP and unzips it, and automatically delegates it to the right class extension. */
    static async unzip(file: File): Promise<{ config: JGVDBConf, files: File[] }> {
        const zipEntries: zip.Entry[] = await (new zip.ZipReader(new zip.BlobReader(file))).getEntries();
        const filesPromised = zipEntries.map(async v => {
            const data = await v.getData?.(new zip.BlobWriter());
            if (data) {
                return new File([data], v.filename, { lastModified: Number(v.rawLastModDate), type: getMimeType(v.filename)});
            }
        });
        const files: File[] = [];
        for (const f of filesPromised) {
            // Ensure we do this without going into an async function so we stall the main execution
            const solved = await f;
            if (solved) files.push(solved);
        }
        
        // Seperate config from the rest
        let configFile: File
        const filteredFiles: File[] = [];
        files.forEach(f => {
            if (f.name == "conf.json") {
                configFile = f;
            } else {
                filteredFiles.push(f);
            }
        });

        const config: JGVDBConf = JSON.parse(await file.text());

        return {
            config: config,
            files: filteredFiles
        };
    }
    static import(config: JGVDBConf, files: File[]) {
        // Figure out what type it is, then send it all to the right class.
        switch (config.type) {
            case 0: // Database
                if (config.version === 0) {
                    new JGVDB_DB(JGVDB_DB.updateFrom0(config as JGVDBConf0.DB), files);
                } else {
                    new JGVDB_DB(config as JGVDBConf1.DB, files);
                }
                break;
            case 1: // Media Collections
                if (config.version === 0) {
                    new JGVDB_MC(JGVDB_MC.updateFrom0(config as JGVDBConf0.MC), files);
                } else {
                    new JGVDB_MC(config as JGVDBConf1.MC, files);
                }
                break;
            case 2: // Settings
                if (config.version === 0) {
                    new JGVDB_SG(JGVDB_SG.updateFrom0(config as JGVDBConf0.SG));
                } else {
                    new JGVDB_SG(config as JGVDBConf1.SG);
                }
                break;
        
            default:
                const errmsg = `JGVDB type is unknown: ${config.type}. Must be one of 0, 1, or 2.`;
                alert(errmsg + " See console for more info about the config element found/given.");
                throw new Error(errmsg, { cause: config });
        }
    }
    /** Make JGVDB File and return it */
    static async zip(contents: File[], filename: string): Promise<File> {
        const zipper = new zip.BlobWriter("application/zip");
        const writer = new zip.ZipWriter(zipper);

        // Add all contents to zip
        const promises = contents.map(f => {
            return writer.add(f.name, new zip.BlobReader(f), { lastModDate: new Date(f.lastModified)});
        })
        await Promise.all(promises);
        return new File([await writer.close()], filename, { type: "application/zip" });
    }
    /** Standard procedure for downloading */
    static download(file: File, filename: string): void {
        const u = URL.createObjectURL(file);
        downloadURI(u, filename);
        revokeBlobSoonTM(u);
    }
    readonly version = 1;
    /** These Files are finished for zipping up. This means their name includes the ID. */
    blobsInZip: File[] = [];
    config: JGVDBConf = {
        type: -1,
        version: -1
    };
    constructor() {}
}

/** Database JGVDB */
export class JGVDB_DB extends JGVDB {
    filename = "Database.jgvdb";
    config: JGVDBConf1.DB;
    blobsInZip: File[];
    constructor(config: JGVDBConf1.DB, blobs: File[]) {
        super();
        this.config = config;
        this.blobsInZip = blobs;
    }
    async export() {
        const files = Array.from(this.blobsInZip); // copy
        files.push(new File([JSON.stringify(this.config)], "conf.json"));
        const result = await JGVDB.zip(files, this.filename);
        JGVDB.download(result, this.filename);
    }
    async import(overwriteSettings: boolean = false) {
        // NOTE: we do not delete the Database, we merge.

        // convert blobsInZip to object with ID as key and blob as value
        const blobs: { [key: UUIDTime]: File } = this.blobsInZip.reduce((prev, file) => {
            const [id, ...filename] = file.name.split("__");
            if (!id) return prev; // just return umodified value and continue || no filename.length === 0 since it is valid to just be "ID__"
            return {...prev, [id]: new File([file], filename.join("__"), { lastModified: file.lastModified, type: file.type })};
        }, {});
        // iterate over media collections, get the blobs, and import.
        Object.entries(this.config.data.mediaCollections).map(async (val) => {
            // Basics
            // const id: UUIDTime = val[0];
            const metadata = val[1];

            // Prepare collection and appending files
            const collectionPromise = collectionManager.newCollection("database"); // we let this be a promise so we can already grab the blobs for later
            const filteredBlobs: File[] = metadata.data.map(id => blobs[id]!);
            const collection = await collectionPromise; // now we wait so we can mod it

            // Setup collection
            collection.rename(metadata.name);
            collection.append(...filteredBlobs);
        });
        if (overwriteSettings) {
            settings.replaceObject(this.config.data.settings);
            reloadSettings();
        }
    }
    static async generate(): Promise<JGVDB_DB> {
        const dump = await collectionManager.dump();
        const blobsInZip = dump.blobs.map(blob => {
            if (blob.blob instanceof File) {
                return new File([blob.blob], blob.id + "__" + (blob.blob.name ?? ""), { lastModified: blob.blob.lastModified, type: blob.blob.type });
            } else {
                return new File([blob.blob], blob.id + "__" + "No Name");
            }
        });
        return new JGVDB_DB({
            type: 0,
            version: 1,
            data: {
                mediaCollections: Object.entries((dump.collections)).reduce((prev, c) => ({
                    ...prev,
                    [c[0]]: {
                        name: c[1].metadata.name,
                        data: c[1].order
                    }
                }), {}),
                settings: settings
            }
        }, blobsInZip);
    }
    /**
     * Update old config version from 0 to 1
     */
    static updateFrom0(config: JGVDBConf0.DB): JGVDBConf1.DB {
        function fixUpMC(data: JGVDBConf0.DB["data"]): JGVDBConf1.DB["data"] {
            const parsed: { // we skip MediaOrder as it no longer exists
                mediaCollections: JGVDBConf0.DBDataParsed["mediaCollections"],
                settings: JGVDBConf0.DBDataParsed["settings"]
            } = {
                mediaCollections: JSON.parse(data.mediaCollections),
                // mediaOrder: JSON.parse(data.mediaOrder),
                settings: JSON.parse(data.mediaOrder)
            };
            const newData: JGVDBConf1.DB["data"] = {
                settings: parsed.settings,
                mediaCollections: Object.entries(parsed.mediaCollections).map((v) => {
                    if (v[0] === "collections" || v[0] === "current") { // filter out those keys
                        return undefined
                    } else {
                        return Object.fromEntries([v]); // if ANYTHING else, just put it in
                    }
                }).filter(v => v !== undefined) as unknown as { [key: UUIDTime]: JGVDBMediaCollection} // TS, trust me, even though I don't trust myself
            };
            return newData;
        }
        return {
            type: 0,
            version: 1,
            data: fixUpMC(config.data)
        }
    }
}

/** Media Collection JGVDB */
export class JGVDB_MC extends JGVDB {
    filename: string;
    config: JGVDBConf1.MC;
    blobsInZip: File[];
    constructor(config: JGVDBConf1.MC, blobsInZip: File[]) {
        super();
        this.config = config;
        this.filename = config.data.name + ".jgvdb";
        this.blobsInZip = blobsInZip;
    }
    async export() {
        const files = Array.from(this.blobsInZip);
        files.push(new File([JSON.stringify(this.config)], "conf.json", { type: "application/zip" }));

        const final = await JGVDB.zip(files, this.filename);
        const u = URL.createObjectURL(final);
        downloadURI(u, this.filename);
        revokeBlobSoonTM(u);
    }
    async import(temporarily: boolean = false) {
        const collectionPromise = collectionManager.newCollection(temporarily ? "temporary" : "database"); // create now, let it be a promise so we can fetch other stuff in the mean time
        const blobs: { [key: UUIDTime]: File } = this.blobsInZip.reduce((prev, file) => {
            const [id, ...filename] = file.name.split("__");
            if (!id) return prev; // see in DB why no filename.length === 0
            return { ...prev, [id]: new File([file], filename.join("__"), { lastModified: file.lastModified, type: file.type }) };
        }, {});
        const orderedBlobs = this.config.data.data.map(id => blobs[id]).filter(v => v !== undefined);
        const collecion = await collectionPromise;
        collecion.append(...orderedBlobs);
    }
    static async generate(mediaCollection: UUIDTime | MediaCollection) {
        // get collection
        let collection: MediaCollection;
        if (!(mediaCollection instanceof MediaCollection)) {
            collection = await MediaCollection.load(mediaCollection);
        } else {
            collection = mediaCollection;
        }
        // Setup blobs names
        const blobsInZip: File[] = Object.entries(collection.blobs).map(v => new File([v[1]], v[0] + "__" + ((v[1] as File).name ?? ""), { lastModified: (v[1] as File).lastModified, type: v[1].type }));
        return new this({
            type: 1,
            version: 1,
            data: {
                name: collection.name,
                data: collection.order
            }
        }, blobsInZip);
    }
    static updateFrom0(config: JGVDBConf0.MC): JGVDBConf1.MC {
        return {
            type: 1,
            version: 1,
            data: config.data
        }
    }
}

/**
 * Implementation to export a collection as a zip file. Since this is a non-jgvdb file, it will just be done through this singular function.
 * @param mediaCollection 
 */
export async function exportMCAsZip(mediaCollection: UUIDTime | MediaCollection) {
    // get collection
    let collection: MediaCollection;
    if (!(mediaCollection instanceof MediaCollection)) {
        collection = await MediaCollection.load(mediaCollection);
    } else {
        collection = mediaCollection;
    }
    // create zip with media
    const filename = collection.name + ".zip";
    const zip = await JGVDB.zip(Object.values(collection.blobs).map(f => {
        if (f instanceof File) return f;
        return new File([f], "Unknown File", { type: f.type })
    }), filename);
    
    JGVDB.download(zip, filename);
}

/** Settings JGVDB */
export class JGVDB_SG extends JGVDB {
    filename = "settings.jgvdb";
    config: JGVDBConf1.SG;
    constructor(config: JGVDBConf1.SG) {
        super();
        this.config = config;
    }
    async export() {
        const final = await JGVDB.zip(
            [ new File([JSON.stringify(this.config)], "conf.json", { type: "application/json" }) ],
            this.filename
        );
        const u = URL.createObjectURL(final);
        downloadURI(u, this.filename);
        revokeBlobSoonTM(u);
    }
    async import() {
        return new Promise((resolve: (value: void) => void, reject: () => void) => {
            confirmation("This will overwrite your current settings. Are you sure?", () => {
                settings.replaceObject(this.config.data);
                reloadSettings();
                resolve();
            }, reject);
        });
    }
    static async generate(): Promise<JGVDB> {
        return new Promise((resolve) => {
            resolve(new JGVDB_SG({
                type: 2,
                version: 1,
                data: settings
            }))
        });
    }
    static updateFrom0(config: JGVDBConf0.SG): JGVDBConf1.SG {
        return {
            type: 2,
            version: 1,
            data: config.data
        }
    }
}
