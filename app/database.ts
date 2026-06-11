import type { JGVGallery } from "./gallery-dom";
import { uuid, uuidtime, type UUIDTime } from "./util";

type MediaDatabaseConstructorParameter = {
    db: IDBDatabase
    transaction: IDBTransaction
}

namespace MediaDatabase {
    export namespace media {
        export type entry = {
            blob: File | Blob,
            collection: UUIDTime,
            id: UUIDTime
        }
    }
}

// "The pain and anguish of using IndexedDB: problems, bugs and oddities" https://gist.github.com/pesterhazy/4de96193af89a6dd5ce682ce2adff49a
// Additionally, Firefox Private Browsing Mode, if it does support IndexedDB, does not save it to local storage, which would make sense, if it weren't for the dev tools then failing to detect any existence of IndexedDB!!

/**
 * This is supposed to be called by the MediaDatabase when it needs to save things, since Transactions are only available temporarily
 */
class MediaDatabaseDo {
    public transaction: IDBTransaction
    public objectStore: IDBObjectStore
    constructor(db: IDBDatabase) {
        this.transaction = db.transaction("media", "readwrite");
        this.objectStore = this.transaction.objectStore("media");
    }
    /**
     * Adds a new Media entry to database. It's usually more useful to get the new UUID back, so this is the return value instead of the IDBRequest.
     * @param blob Binary Data
     * @param other.collection Collection ID
     * @param other.id Media ID (optional)
     * @returns UUIDTime of result
     */
    add (blob: File | Blob, other: { collection: UUIDTime, id?: UUIDTime }): Promise<UUIDTime> {
        return new Promise((resolve, reject) => {
            const id = other.id ?? uuidtime();
            const req = this.objectStore.add({
                blob: blob,
                collection: other.collection,
                id: id
            });
            req.onsuccess = () => {
                resolve(id);
            }
            req.onerror = (ev) => {
                reject(ev)
            }
        })
    }
    /**
     * Edit an ID. Requires collection and Blob specified, as it overwrites the entry.
     * @param id 
     * @param other 
     */
    edit (id: UUIDTime, other: { blob: File | Blob, collection: UUIDTime}): IDBRequest<IDBValidKey> {
        return this.objectStore.put({
            blob: other.blob,
            collection: other.collection,
            id: id
        })
    }
    /**
     * The same as the normal `edit` function, but without needing to specify the collection ID or a new blob. It still allows it to be specified, just to provide an easier implementation.
     * @param blob 
     * @param other 
     * @returns 
     */
    async editPartially (id: UUIDTime, other: { blob?: File | Blob, collection?: UUIDTime }): Promise<IDBRequest<IDBValidKey>> {
        if (!other.collection || !other.blob) { // when there's no collection defined... get the object, define it, move on.
            const entry = new Promise((resolve: (value: MediaDatabase.media.entry) => void, reject: (reason: Error) => void) => {
                const req = this.getSingle(id);
                req.onsuccess = () => {
                    resolve(req.result);
                };
                req.onerror = () => {
                    reject(new Error("Unable to get collection while editing object. Is the ID valid?", { cause: id }));
                }
            })
            !other.collection ? other.collection = (await entry).collection : null;
            !other.blob ? other.blob = (await entry).blob : null;
        }
        return this.objectStore.put({
            blob: other.blob,
            collection: other.collection,
            id: id
        });
    }
    /**
     * 
     * @param id Media ID
     * @returns 
     */
    getSingle (id: UUIDTime): IDBRequest<MediaDatabase.media.entry> {
        return this.objectStore.get(id);
    }
    /**
     * 
     * @param id Collection ID
     * @returns 
     */
    getCollection (id: UUIDTime): IDBRequest<MediaDatabase.media.entry[]> {
        return this.objectStore.index("collection").getAll(id);
    }
    /**
     * 
     * @param id Media ID
     * @returns 
     */
    deleteSingle (id: UUIDTime): IDBRequest<undefined> {
        return this.objectStore.delete(id);
    }
    /**
     * 
     * @param id Collection ID
     * @returns 
     */
    deleteCollection (id: UUIDTime): Promise<void> {
        return new Promise((resolve, reject) => {
            const keysReq = this.objectStore.index("collection").openKeyCursor(id);
            keysReq.onsuccess = () => {
                const cursor = keysReq.result;
                if (cursor) {
                    this.objectStore.delete(cursor.primaryKey);
                    cursor.continue();
                } else {
                    resolve();
                }
            }
            keysReq.onerror = (ev) => {
                reject(new Error("Opening cursor for collection deletion failed.", { cause: ev }));
            }
        });
    }
    clear (): IDBRequest<undefined> {
        return this.objectStore.clear();
    }
}

/**
 * This is supposed to manage getting data to and from the Database in a Media oriented manner.
 * 
 * **It does NOT mess with the DOM.**
 * 
 * It does not directly manage Collections either. This is to support storage with other methods (like RAM), without rewriting the whole app. Use `MediaCollection` and `MediaCollectionsManager` for this.
 */
export class MediaDatabase {
    protected db: IDBDatabase;
    // protected transaction: IDBTransaction;
    constructor(preparedClassVariables: MediaDatabaseConstructorParameter) {
        this.db = preparedClassVariables.db;
    }
    /**
     * Functions for creating Tables. Automatically deletes the table if it already exists, unless specified otherwise. If specified to not delete no matter what, expect errors to be thrown.
     * 
     * **WARNING: DO NOT USE THIS TO DELETE THE CONTENTS!** Use `objectStore.clear()` instead. It avoids recreating the table.
     */
    protected static tableInit: { ["media"]: (db: IDBDatabase, removeIfExists?: boolean) => void } = {
        media: (db: IDBDatabase, removeIfExists: boolean = true) => {
            if (db.objectStoreNames.contains("media") && removeIfExists) db.deleteObjectStore("media");

            // Setup media table. columns: id (unique), collection (not unique, associative to multiple entries), blob (binary image/video data)
            const table = db.createObjectStore("media", { keyPath: "id", autoIncrement: false });
            table.createIndex("collection", "collection", { unique: false });
            // For now not unique. In the future we can avoid duplicates by reusing IDs multiple times and checking if they're unused before deleting them.
            table.createIndex("blob", "blob", { unique: false });
        }
    }
    /**
     * Does all the async stuff before the database is really available. Also sets up the Database with the needed tables.
     */
    static async init() {
        const preparedClassVariables: Partial<MediaDatabaseConstructorParameter> = {}
        const finishedPrep: Promise<void> = new Promise((resolve: () => void, reject: (reason: any) => void) => {
            const dbreq = indexedDB.open('media', 1);
            dbreq.onsuccess = () => {
                preparedClassVariables.db = dbreq.result;
                preparedClassVariables.transaction = preparedClassVariables.db.transaction("media", "readwrite");
                resolve();
            };
            dbreq.onupgradeneeded = () => {
                // Setup Database Tables
                const db = dbreq.result;
                MediaDatabase.tableInit.media(db);
            }
            dbreq.onerror = (reason) => {
                reject(reason);
            }
        });
        finishedPrep.catch((reason) => {
            throw new Error("Something went wrong while preparing the init variables.", { cause: reason })
        })
        await finishedPrep;
        if ( // ensure variables are defined
            preparedClassVariables.db !== undefined
            && preparedClassVariables.transaction !== undefined
        ) {
            // TypeScript, trust me bro
            return new MediaDatabase(preparedClassVariables as unknown as MediaDatabaseConstructorParameter);
        } else {
            throw new Error("Init failed: Some variables were undefined during creation. Something went terribly wrong.", { cause: preparedClassVariables });
        }
    }
    /**
     * Do actions in the database. Do not do asynchronous tasks inside, as the Transaction may be invalid by the time they complete. 
     * @param func Function that receives a MediaDatabaseDo as its only parameter. This is run within the database.
     * @returns Return value is the same as the `func`s return value 
     */
    do<T>(func: (actions: MediaDatabaseDo) => T): T {
        return func(new MediaDatabaseDo(this.db));
    }
}

// GLOBAL VARIABLES
var mediadb = MediaDatabase.init();
// END OF GLOBAL VARIABLES

namespace MediaCollection {
    export type collectionMetadata = {
        name: string
    }
}

/**
 * This manages a single collection: saving and fetching data to and from the database (or holding it only in memory) and localStorage. It loads and unloads blobs.
 */
export class MediaCollection {
    /**
     * Load an existing collection from the Database
     * @param id Collection ID
     * @returns 
     */
    static async load(id: UUIDTime): Promise<MediaCollection> {
        const collectionPromise = (await mediadb).do(async (actions): Promise<MediaDatabase.media.entry[]> => new Promise((resolve, reject) => {
            const req = actions.getCollection(id)
            req.onsuccess = () => {
                resolve(req.result);
            }
            req.onerror = () => {
                reject(new Error("Failed getting collection"));
            }
        }));
        const collection = await collectionPromise;
        const blobs = collection.reduce((prev, current) => {
            prev[current.id] = current.blob;
            return prev;
        }, {} as { [key: UUIDTime]: (File | Blob) });
        const order: UUIDTime[] = JSON.parse(localStorage.getItem("mediaOrder_" + id) ?? "[]");
        const collectionMetadata: MediaCollection.collectionMetadata = JSON.parse(localStorage.getItem("collectionMetadata_" + id) ?? "null") ?? {
            name: "Unnamed Collection " + uuid(6)
        };
        return new this({
            order: order,
            blobs: blobs,
            id: id,
            metadata: collectionMetadata
        })
    }
    /**
     * Create a brand new Collection with no contents
     * @param type 
     * @returns 
     */
    static async create(type: "database" | "temporary"): Promise<MediaCollection> {
        if (type === "temporary") {
            return new this({
                order: [],
                id: null,
                blobs: {},
                metadata: {
                    name: "Temporary Collection " + uuid(6)
                }
            });
        } else if (type === "database") {
            return new this({
                order: [],
                id: uuidtime(),
                blobs: {},
                metadata: {
                    name: "Unnamed Collection " + uuid(6)
                }
            });
        } else {
            throw new Error("Invalid Type", { cause: type });
        }
    }
    /** Order of blobs, based on ID. Please Read Only. Can be modified by talking to this Collection directly, which is preferred, as it takes care of the saving process. */
    public order: UUIDTime[];
    /** ID of collection. Only relevant for saving. If `null` this collection will not be saved. Will be changed to `null` after wipe to effectively disable any useful saving functionality. */
    public id: UUIDTime | null;
    /** Name of Collection. User defined. */
    public name: string;
    /** Blobs */
    public blobs: { [key: UUIDTime]: (File | Blob)};
    constructor(preparedVars: {order: UUIDTime[], id: UUIDTime | null, metadata: MediaCollection.collectionMetadata, blobs: { [key: UUIDTime]: (File | Blob)}}) {
        // DATA INTEGRITY - Make sure nothing is lost
        const orderSet = new Set(preparedVars.order)
        const blobsIdSet = new Set(Object.keys(preparedVars.blobs));
        /** Contains all IDs found in "blobs" that are not in "order" */
        const diff = Array.from(blobsIdSet.difference(orderSet));
        if (diff.length > 0) {
            preparedVars.order.push(...diff);
        }

        // Setup rest of instance
        this.order = preparedVars.order;
        this.blobs = preparedVars.blobs;
        this.name = preparedVars.metadata.name;
        this.id = preparedVars.id;
    
    }
    /** Appends a new Media blob to the collection */
    async append(blob: File | Blob): Promise<UUIDTime> {
        let mediaId: UUIDTime;
        // save to database if needed + make UUID
        if (this.id) {
            const collectionId = this.id; // explicitly define to make TypeScript know its defined cross-scope
            mediaId = await (await mediadb).do((actions) => {
                return actions.add(blob, { collection: collectionId });
            });
        } else {
            mediaId = uuidtime();
        }
        // Save in collection
        this.blobs[mediaId] = blob;
        this.order.push(mediaId);

        return mediaId;
    }
    /**
     * Delete one or more Media elements depending on ID
     * @param id 
     */
    delete(...id: UUIDTime[]) {
        for (const thisId of id) {
            try {
                delete this.blobs[thisId];
            } catch {
                console.warn("Couldn't delte ID", thisId, "from Collection", this.id);
            }
        }
        this.order = this.order.filter(val => !id.includes(val));
    }
    /** Delete the entire collection */
    async wipe(): Promise<void> {
        if (this.id) {
            const collectionId = this.id;
            await (await mediadb).do(actions => {
                return actions.deleteCollection(collectionId);
            });
        }
        this.blobs = {};
        this.order = [];
        this.id = null;
    }
}

/**
 * This manages collections: loads on startup, switches between them, tells the UI to do things (UI being managed by `JGVGallery`). Has functions for listing currently available collections, and more.
 * It does not manage the media in collections themselves. This is done by the `MediaCollection` class.
 * 
 * This also means it writes to `localStorage`, saves the data frequently and reloads it whenver it's written, so all tabs are up-to-date.
 */
class MediaCollectionsManager {
    static collectionIdToUrl(id: UUIDTime): URL { // https://stackoverflow.com/a/41542008
        const url = new URL(window.location.toString());
        url.searchParams.set("collection", id.toString());
        return url;
    }
    /** Collections found in store. Only IDs are stored */
    available: UUIDTime[];
    current: MediaCollection;
    static async init() {
        // TODO: There is probably a better way than spamming if else statements and relying on the programmer to understand when what should be defined.

        // load available collections
        const available = JSON.parse(localStorage.getItem("mediaCollections") ?? "[]");
        let updateUrl: null | URL = null;
        /** Collection ID to load. If null, a new will be created */
        let collectionId: null | UUIDTime;

        // Figure out what collection to load or if we should make a new one
        if (available.length === 0) {
            // well shit there's nothing to load. Time to make a new collection!
            collectionId = null;
        } else {
            // a few collections are available. Let's get the current one from the URL
            const params = new URLSearchParams(window.location.search);
            const grabbedCollectionId: UUIDTime | null = params.get("collection");
            if (!grabbedCollectionId) {
                // User opened a new tab, while collections are available
                // Let's get the first we can find, then change the URL to it
                collectionId = available[0]!;
                updateUrl = MediaCollectionsManager.collectionIdToUrl(collectionId!);
            } else {
                // Nice we got an ID! is it real though?
                if (available.includes(grabbedCollectionId)) {
                    collectionId = grabbedCollectionId;
                } else {
                    // the user lied to us >:C
                    collectionId = available[0]!;
                    updateUrl = MediaCollectionsManager.collectionIdToUrl(collectionId!);
                }
            }
        }
        // In case there is no collectionId defined, this means we couldn't find ANYTHING.
        // Let's create a new collection, and update the URL
        if (!collectionId) {
            collectionId = uuidtime();
            updateUrl = MediaCollectionsManager.collectionIdToUrl(collectionId);
        }
        if (updateUrl) {
            window.history.pushState({}, "", updateUrl);
        }

        // Finally, load the collection
        const current = await MediaCollection.load(collectionId);
        (document.getElementById("jgv-gallery") as JGVGallery).switchCollection(current);
        return new this({ available: available, current: current});
    }
    constructor(preparedVars: {available: UUIDTime[], current: MediaCollection}) {
        this.available = preparedVars.available;
        this.current = preparedVars.current;
    }
    switchCollection(id: UUIDTime) {

    }
}
