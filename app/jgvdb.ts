import * as zip from "../zip.js/index.js";
import { getMimeType } from "../zip.js/mime-types.js";
import type { MediaCollection, MediaDatabase } from "./database.js";
import { collectionManager } from "./globals.js";
import { settings } from "./settings.js";
import type { UUIDTime } from "./util.js";

// General Types
type JGVDBMediaCollection = {
    name: string,
    data: UUIDTime[]
}
type JGVDBConf = {
    type: number,
    version: number
}

// Legacy Config
namespace JGVDBConf0 {
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

// Current Config
namespace JGVDBConf1 {
    /** Database JGVDB conf.json */
    export type DB = { // note: compared to Version 0, the properties "mediaCollections.current" and "mediaOrder" have been removed.
        type: 0,
        version: 1,
        data: {
            collections: UUIDTime[],
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

    /**  */
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
static unzip the file -> creates instance -> import on instance to initiate import

EXPORTING
static generateConfig -> creates instance -> export on instance to initiate export

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
class JGVDB {
    /** Returns new JGVDB Element with the requested configs */
    static async generateConfig(): Promise<JGVDB> {
        throw new Error("Implementation must provide this");
    }
    static async unzip(file: File) {
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
        const blobs: File[] = [];
        files.forEach(f => {
            if (f.name == "conf.json") {
                configFile = f;
            } else {
                blobs.push(f);
            }
        });

        // Figure out what type it is, then send it all to the right class.
        const config: JGVDBConf = JSON.parse(await file.text());

        switch (config.type) {
            case 0: // Database
                if (config.version === 0) {
                    new JGVDB_DB(JGVDB_DB.updateFrom0(config as JGVDBConf0.DB), blobs);
                } else {
                    new JGVDB_DB(config as JGVDBConf1.DB, blobs);
                }
                break;
        
            default:
                break;
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
    readonly version = 1;
    /** These Files are finished for zipping up. This means their name includes the ID. */
    blobsInZip: File[] = [];
    config: JGVDBConf = {
        type: -1,
        version: -1
    };
    constructor() {}
}

class JGVDB_DB extends JGVDB {
    config: JGVDBConf1.DB;
    blobsInZip: File[];
    constructor(config: JGVDBConf1.DB, blobs: File[]) {
        super();
        this.config = config;
        this.blobsInZip = blobs;
    }
    export() {

    }
    static async generateConfig(): Promise<JGVDB_DB> {
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
                collections: dump.available,
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
                collections: parsed.mediaCollections.collections,
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