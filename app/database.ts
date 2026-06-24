import { getLogger, type Logger } from "@logtape/logtape";
import type { JGVGallery } from "./gallery-dom";
import { updateStorageInfo } from "./other-ui";
import { arrayInvertAxis, uuid, uuidtime, type UUIDTime } from "./util";

type MediaDatabaseConstructorParameter = {
    db: IDBDatabase
    transaction: IDBTransaction
}

export namespace MediaDatabase {
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
    protected logger: Logger;
    constructor(db: IDBDatabase, mainLogger: Logger) {
        this.logger = mainLogger;
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
        this.logger.debug("Adding Media {*}", { collection: other.collection, id: other.id});
        return new Promise((resolve, reject) => {
            const id = other.id ?? uuidtime();
            const req = this.objectStore.add({
                blob: blob,
                collection: other.collection,
                id: id
            });
            req.onsuccess = () => {
                resolve(id);
                updateStorageInfo();
            }
            req.onerror = (ev) => {
                reject(ev)
            }
        });
    }
    /**
     * Edit an ID. Requires collection and Blob specified, as it overwrites the entry.
     * @param id 
     * @param other 
     */
    edit (id: UUIDTime, other: { blob: File | Blob, collection: UUIDTime}): IDBRequest<IDBValidKey> {
        this.logger.debug("Editing Media {*}", { collection: other.collection, id: id });
        const req = this.objectStore.put({
            blob: other.blob,
            collection: other.collection,
            id: id
        });
        req.addEventListener("success", () => { updateStorageInfo(); });
        return req;
    }
    /**
     * The same as the normal `edit` function, but without needing to specify the collection ID or a new blob. It still allows it to be specified, just to provide an easier implementation.
     * @param blob 
     * @param other 
     * @returns 
     */
    async editPartially (id: UUIDTime, other: { blob?: File | Blob, collection?: UUIDTime }): Promise<IDBRequest<IDBValidKey>> {
        this.logger.debug("Editing Media (partially) {*}", { collection: other.collection, id: id, editsBlob: !!other.blob });
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
        const req = this.objectStore.put({
            blob: other.blob,
            collection: other.collection,
            id: id
        });
        req.addEventListener("success", () => { updateStorageInfo(); });
        return req;
    }
    /**
     * Get Media by ID
     * @param id Media ID
     * @returns 
     */
    getSingle (id: UUIDTime): IDBRequest<MediaDatabase.media.entry> {
        return this.objectStore.get(id);
    }
    /**
     * Get collection by ID
     * @param id Collection ID
     * @returns 
     */
    getCollection (id: UUIDTime): IDBRequest<MediaDatabase.media.entry[]> {
        return this.objectStore.index("collection").getAll(id);
    }
    /**
     * Delete Media by ID
     * @param id Media ID
     * @returns 
     */
    deleteSingle (id: UUIDTime): IDBRequest<undefined> {
        this.logger.debug("Deleting Media {id}", { id: id });
        const req = this.objectStore.delete(id);
        req.addEventListener("success", () => { updateStorageInfo(); });
        return req;
    }
    /**
     * Delete Collection by ID
     * @param id Collection ID
     * @returns 
     */
    deleteCollection (id: UUIDTime): Promise<void> {
        this.logger.debug("Deleting Collection {id}", { id: id });
        return new Promise((resolve, reject) => {
            const keysReq = this.objectStore.index("collection").openKeyCursor(id);
            keysReq.onsuccess = () => {
                const cursor = keysReq.result;
                if (cursor) {
                    this.objectStore.delete(cursor.primaryKey);
                    cursor.continue();
                } else {
                    resolve();
                    updateStorageInfo();
                }
            }
            keysReq.onerror = (ev) => {
                reject(new Error("Opening cursor for collection deletion failed.", { cause: ev }));
            }
        });
    }
    /**
     * Delete everything in the Database
     * @returns 
     */
    clear (): IDBRequest<undefined> {
        this.logger.debug("Deleting Media Table");
        const req = this.objectStore.clear();
        req.addEventListener("success", () => { updateStorageInfo(); });
        return req;
    }
    /**
     * Dump the database
     */
    dump(): IDBRequest<MediaDatabase.media.entry[]> {
        return this.objectStore.getAll();
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
    protected logger: Logger;
    // protected transaction: IDBTransaction;
    constructor(preparedClassVariables: MediaDatabaseConstructorParameter) {
        this.db = preparedClassVariables.db;
        this.logger = getLogger("MediaDatabase");
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
    public do<T>(func: (actions: MediaDatabaseDo) => T): T {
        return func(new MediaDatabaseDo(this.db, this.logger));
    }
}

// GLOBAL VARIABLES
export var mediadb = MediaDatabase.init();
// END OF GLOBAL VARIABLES

export class MediaCollectionMediaEvent extends Event {
    /**
     * @param type `collectionmedia[...]` events are events happening to the media inside a collection. These are dispatched at `this.events`.
     * These are triggered in groups, which is why the `this.affected` property is an ordered list of data.
     * - `collectionmediaappended` - a new Media Element was added to the end of the collection
     * - `collectionmediaremoved` - a Media Element was removed
     * - `collectionmediareordered` - the order of the Media Elements changed
     * 
     * @param target data associated with this specific event
     */
    constructor(type: "collectionmediaappended", target: { blob: File | Blob, id: UUIDTime }[]);
    constructor(type: "collectionmediaremoved", target: { id: UUIDTime }[]);
    constructor(type: "collectionmediareordered");
    constructor(
        type: "collectionmediaappended" | "collectionmediaremoved" | "collectionmediareordered",
        target?: { collection?: MediaCollection, blob?: File | Blob, id: UUIDTime | null }[]
    ) {
        super(type, { bubbles: false, cancelable: false, composed: false });
        this.affected = target;
    }
    public readonly affected: { id: UUIDTime | null | undefined, collection?: MediaCollection | undefined, blob?: File | Blob | undefined }[] | undefined
}

export class MediaCollectionEvent extends Event {
    /**
     * @param type `collection[...]` are events that happen to the collection itself. These are dispatched at `window`.
     * These are triggered individually, unlike `collectionmedia[...]` events, as it's not possible to otherwise do it, without making the programmer go through the `MediaCollectionManager`.
     * Considering the rarity of collection modifications compared to Media, it's safe to assume that this is "good enough".
     * - `collectionadded` - a new collection was created. Fires after `collectionloaded`.
     * - `collectionremoved` - a collection was deleted
     * - `collectionloaded` - a collection was loaded. Fired after a new "MediaCollection" element is created, and before it is returned to the calling process.
     * - `collectionrenamed` - a collection was renamed.
     * 
     * Overview about properties:
     * - `id` - Colleciton ID
     * - `newName` - If renamed, the new name
     * - `alreadyBroadcast` - If this event is a redispatch of the same event from another tab
     * - `collection` - MediaCollection associated to the Collection ID
     * 
     * Additional Infos:
     * - `alreadyBroadcast` was made since renaming is at a weird place: Not quite for the `MediaCollectionsManager` as the renaming is something collections have and the class is only *about* collections, but also not quite for `MediaCollection` since the name must be changed in the UI while they're not loaded.
     * It's technically possible to run all added, renamed, removed operations through this exact "Event replication" system, and it would be inherently cleaner. But I wrote the reload function first and that is going to stay until I refactor that again.
     * ALSO IMPORTANT if you decide to refactor this: Cross-tab DB wipe only works because `this.save()` makes all other tabs (where the deletion wasn't initialized) delete the collections cleanly. So beware, you need to make sure this still works.
     * @param target data related to the collection on which the event triggered
     */
    constructor(type: "collectionadded",   target: { id: UUIDTime | null });
    constructor(type: "collectionrenamed", target: { newName: string, id: UUIDTime | null, alreadyBroadcast?: boolean });
    constructor(type: "collectionloaded",  target: { collection: MediaCollection, id: UUIDTime | null });
    constructor(type: "collectionremoved", target: { id: UUIDTime | null });
    constructor(type: "collectionadded" | "collectionremoved" | "collectionloaded" | "collectionrenamed", target: { collection?: MediaCollection, id: UUIDTime | null, newName?: string, alreadyBroadcast?: boolean }) {
        super(type, { bubbles: false, cancelable: false, composed: false });
        this.id = target.id;
        this.collection = target.collection;
        this.newName = target.newName;
        this.alreadyBroadcast = target.alreadyBroadcast ?? false;
    }
    public readonly id: UUIDTime | null;
    public readonly collection: MediaCollection | undefined;
    public readonly newName: string | undefined;
    public readonly alreadyBroadcast: boolean;
}

export namespace MediaCollection {
    export type collectionMetadata = {
        name: string
    }
    export type broadcastMessage = {
        type: "reordered",
        target: UUIDTime[]
    } | {
        type: "added",
        target: {
            blob: File | Blob,
            id: UUIDTime
        }[]
    } | {
        type: "removed",
        target: UUIDTime[]
    }
}

const MediaCollectionLogger = getLogger(["MediaCollection"]);

/**
 * Temporary collections need to be hacked into the Database heavy system. If you fetch a MediaCollection from the DB, check if it exists here first.
 */
const temporaryCollectionsCache: Record<UUIDTime, MediaCollection> = {};

/**
 * This manages a single collection: saving and fetching data to and from the database (or holding it only in memory) and localStorage. It loads and unloads blobs.
 */
export class MediaCollection {
    static metadataPrefix = "collectionMetadata_";
    static mediaOrderPrefix = "mediaOrder_";
    static boardcastPrefix = "mediaCollectionUpdates_";
    /**
     * Load an existing collection from the Database or Cache
     * @param id Collection ID
     * @returns 
     */
    static async load(id: UUIDTime): Promise<MediaCollection> {
        if (temporaryCollectionsCache[id]) return temporaryCollectionsCache[id];
        // setup new collection
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
        // get blobs and order
        const blobs = collection.reduce((prev, current) => {
            prev[current.id] = current.blob;
            return prev;
        }, {} as { [key: UUIDTime]: (File | Blob) });
        const knownBlobIds = Object.keys(blobs);
        const order: UUIDTime[] = (JSON.parse(localStorage.getItem(MediaCollection.mediaOrderPrefix + id) ?? "[]") as UUIDTime[]).filter((itemId: UUIDTime) => {
            // fix invalid IDs in order
            if (knownBlobIds.includes(itemId)) {
                return true;
            } else {
                console.warn(`MediaCollection: ${itemId} went missing in DB of collection ${id}! Discarding to avoid unexpected issues.`);
                return false;
            }
        });

        // fix unassigned but known IDs
        const knownBlobIdsSet = new Set(knownBlobIds);
        const orderSet = new Set(order);
        const unassignedBlobs = knownBlobIdsSet.difference(orderSet);
        if (unassignedBlobs.size > 0) {
            order.push(...unassignedBlobs);
            // print the problem to console
            Array.from(unassignedBlobs).map(v => console.warn(`MediaCollection: Found ${v} in collection ${id}, but it was not in order. Adding it to the order. lost+found.`))
        }
        // get metadata
        const collectionMetadata: MediaCollection.collectionMetadata = JSON.parse(localStorage.getItem(MediaCollection.metadataPrefix + id) ?? "null") ?? {
            name: "Unnamed Collection " + id
        };
        // return new collection
        return new this({
            order: order,
            blobs: blobs,
            temporary: false,
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
            const id = uuidtime();
            const result = new this({
                order: [],
                id: id,
                temporary: true,
                blobs: {},
                metadata: {
                    name: "Temporary Collection " + uuid(6)
                }
            });
            temporaryCollectionsCache[id] = result;
            window.dispatchEvent(new MediaCollectionEvent("collectionadded", { id: id }));
            return result;
        } else if (type === "database") {
            const id = uuidtime();
            const result = new this({
                order: [],
                id: id,
                temporary: false,
                blobs: {},
                metadata: {
                    name: "Unnamed Collection " + id
                }
            });
            window.dispatchEvent(new MediaCollectionEvent("collectionadded", { id: id }));
            return result;
        } else {
            throw new Error("Invalid Type", { cause: type });
        }
    }
    /** Order of blobs, based on ID. Please Read Only. Can be modified by talking to this Collection directly, which is preferred, as it takes care of the saving process. */
    public order: UUIDTime[];
    /** ID of collection. Will be changed to `null` after wipe to effectively disable any useful saving functionality. */
    public id: UUIDTime | null;
    /** If the collection is temporary. If true, saving will be disabled. */
    public temporary: boolean;
    /** Name of Collection. User defined. */
    public name: string;
    /** Blobs */
    public blobs: { [key: UUIDTime]: (File | Blob)};
    /**
     * Events fired when something happens
     */
    public events: EventTarget = new EventTarget();
    /** If this collection was wiped */
    public wiped: boolean = false;
    /** Broadcast Channel used for duplicating changes across tabs. Does the exact same things as the events. */
    public broadcast: BroadcastChannel;
    logger: Logger;

    constructor(preparedVars: {order: UUIDTime[], id: UUIDTime | null, temporary: boolean, metadata: MediaCollection.collectionMetadata, blobs: { [key: UUIDTime]: (File | Blob)}}) {
        // DATA INTEGRITY - Make sure nothing is lost
        const orderSet = new Set(preparedVars.order)
        const blobsIdSet = new Set(Object.keys(preparedVars.blobs));
        /** Contains all IDs found in "blobs" that are not in "order" */
        const diff = Array.from(blobsIdSet.difference(orderSet));
        if (diff.length > 0) {
            preparedVars.order.push(...diff);
        }

        this.logger = MediaCollectionLogger.getChild(String(preparedVars.id));

        // Setup rest of instance
        this.order = preparedVars.order;
        this.blobs = preparedVars.blobs;
        this.name = preparedVars.metadata.name;
        this.id = preparedVars.id;
        this.temporary = preparedVars.temporary;

        this.save();

        // add broadcast stuff
        this.broadcast = new BroadcastChannel(MediaCollection.boardcastPrefix + preparedVars.id);
        this.broadcast.addEventListener("message", this.broadcastDealer.bind(this));
        
        // Dispatch Event
        window.dispatchEvent(new MediaCollectionEvent("collectionloaded", { id: this.id, collection: this }));
    }
    /** Appends one or more new Media blobs to the collection — Order dependant */
    async append(...blob: (File | Blob)[]): Promise<UUIDTime[]> {
        return this.appendWithDetail(blob.map(v => ({
            blob: v,
            id: uuidtime()
        })));
    }
    /** same as append, but with more detail. Better suited for specific scenarios. */
    async appendWithDetail(entries: {blob: (File | Blob), id: UUIDTime}[], options?: { skipDatabase?: boolean, dispatchEvent?: boolean, sendBroadcast?: boolean }): Promise<UUIDTime[]> {
        options = {
            skipDatabase: options?.skipDatabase ?? false,
            dispatchEvent: options?.dispatchEvent ?? true,
            sendBroadcast: options?.sendBroadcast ?? true,
        };
        // get rid of non-media types.
        entries = entries.filter(v => v.blob.type.includes("image") || v.blob.type.includes("video"))
        if (entries.length === 0) return new Promise((resolve) => resolve([]));
        
        // Save to DB if necessary
        if (this.id && !this.temporary && !options.skipDatabase) {
            const collectionId = this.id; // explicitly define to make TypeScript know its defined cross-scope
            const promises: Promise<UUIDTime>[] = (await mediadb).do(actions => entries.map(v => {
                return actions.add(v.blob, { collection: collectionId, id: v.id });
            }));
            await Promise.all(promises);
        }
        // Save in collection
        entries.forEach(item => {
            this.blobs[item.id] = item.blob;
        });
        const mediaIds = entries.map(v => v.id);
        this.order.push(...mediaIds);
        this.save();

        // Dispatch Event
        if (options.dispatchEvent) this.events.dispatchEvent(new MediaCollectionMediaEvent("collectionmediaappended", entries));
        if (options.sendBroadcast) this.broadcast.postMessage({
            type: "added",
            target: entries
        } as MediaCollection.broadcastMessage);

        return mediaIds;
    }
    /**
     * Delete one or more Media elements depending on ID
     * @param id 
     */
    delete(...id: UUIDTime[]) {
        return this.deleteWithDetail(id);
    }
    /**
     * Delete one or more Media elements depending on ID
     * @param ids 
     */
    async deleteWithDetail(ids: UUIDTime[], options?: { dispatchEvent?: boolean, sendBroadcast?: boolean }) {
        options = {
            dispatchEvent: options?.dispatchEvent ?? true,
            sendBroadcast: options?.sendBroadcast ?? true
        }
        for (const thisId of ids) {
            try {
                delete this.blobs[thisId];
            } catch {
                console.warn("Couldn't delte ID", thisId, "from Collection", this.id);
            }
        }
        if (this.id && !this.temporary) {
            const mediadbnow = await mediadb;
            const promises = ids.map(v => {
                return mediadbnow.do(actions => {
                    return new Promise((resolve, reject) => {
                        const req = actions.deleteSingle(v);
                        req.addEventListener("success", resolve);
                        req.addEventListener("error", reject);
                    });
                });
            });
            await Promise.allSettled(promises);
        }
        this.order = this.order.filter(val => !ids.includes(val));
        this.save();
        // Dispatch Event
        if (options.dispatchEvent) this.events.dispatchEvent(new MediaCollectionMediaEvent("collectionmediaremoved", ids.map(v => ({id: v}))));
        if (options.sendBroadcast) this.broadcast.postMessage({
            type: "removed",
            target: ids
        } as MediaCollection.broadcastMessage);
    }
    /**
     * Delete the entire collection, without loading it
     * @param id ID of collection
     * @param skipDatabase If database deletion should be skipped. The only good reason to do so is if you delete everything anyways and just don't want to deal with localStorage.
     */
    static async wipe(id: UUIDTime, skipDatabase: boolean = false) {
        if (id) {
            if (!skipDatabase) await (await mediadb).do(actions => {
                return actions.deleteCollection(id);
            });
            localStorage.removeItem(MediaCollection.mediaOrderPrefix + id);
            localStorage.removeItem(MediaCollection.metadataPrefix + id);
        }
        MediaCollectionLogger.debug("Wiped {id}", { id: id });
        // Dispatch Event
        window.dispatchEvent(new MediaCollectionEvent("collectionremoved", { id: id }));
    }
    /** Delete the entire collection */
    async wipe(): Promise<void> {
        if (this.id) {
            await MediaCollection.wipe(this.id, this.temporary); // skip db if temporary
        }
        this.wiped = true;
        this.id = null;
        this.blobs = {};
        this.order = [];
        this.logger.debug("Wiped myself");
        this.unload();
    }
    /** Change order */
    reorder(newOrder: UUIDTime[]): void {
        return this.reorderWithDetail(newOrder);
    }
    /** Change order */
    reorderWithDetail(newOrder: UUIDTime[], options?: { dispatchEvent?: boolean, sendBroadcast?: boolean }): void {
        options = {
            dispatchEvent: options?.dispatchEvent ?? true,
            sendBroadcast: options?.sendBroadcast ?? true,
        };
        this.order = newOrder;
        this.save();

        // Dispatch Event
        if (options.dispatchEvent) this.events.dispatchEvent(new MediaCollectionMediaEvent("collectionmediareordered"));
        if (options.sendBroadcast) this.broadcast.postMessage({
            type: "reordered",
            target: newOrder
        } as MediaCollection.broadcastMessage);
        this.logger.debug("Reordered");
    }
    /**
     * Rename collection (note: empty names will be subset with "Unnamed Collection \<ID\>")
     * @param newName 
     */
    rename(newName: string): void {
        this.name = newName;
        if (this.name === "") this.name = "Unnamed Collection " + this.id;
        this.save();

        // Dispatch Event
        window.dispatchEvent(new MediaCollectionEvent("collectionrenamed", { id: this.id, newName: this.name }));
    }
    /** Saves some additional Metadata about the collection: Media Order and Metadata (Name) */
    save() {
        if (this.id && !this.temporary) {
            localStorage.setItem(MediaCollection.mediaOrderPrefix + this.id, JSON.stringify(this.order));
            localStorage.setItem(MediaCollection.metadataPrefix + this.id, JSON.stringify({name: this.name}));
            this.logger.debug("Saved");
        } else {
            this.logger.debug("Skipped Save");
        }
    }
    /**
     * Switches collection to temporary collection. Throws Exception if already Temporary.
     * @param deleteDB If the contents should be wiped from disk. Does not throw an error if ID is null.
     */
    switchToTemporary(deleteDB = false) {
        if (this.temporary) throw new Error("Collection already Temporary.");
        this.temporary = true;
        if (deleteDB && this.id) {
            MediaCollection.wipe(this.id);
        }
    }
    /**
     * Switches collection to database collection. Throws Exception if already Database.
     */
    async switchToDatabase(saveDB = false) {
        if (!this.temporary) throw new Error("Collection already Database.");
        this.temporary = false;
        if (saveDB && this.id) {
            // Now we have to do some fun shenanigans...
            /**
             * Following questions need to be answered and handled accordingly:
             * 1. Does collection already exist in DB? If not, create it. ()
             * 2. If yes, which elements already exist? Which need to be created? (we cannot use this.append())
             * 3. create all needed entries in DB
             * 3. run this.save()
             */
            const metadata = MediaCollection.dumpStorage(this.id);
            let filteredBlobs: MediaDatabase.media.entry[];
            if (metadata.order) {
                // Step 1, Case: Exists.
                // Step 2: Filter out all IDs that are known to be in the DB.
                const dbCollection = await (await mediadb).do(actions => {
                    return new Promise((resolve: (result: MediaDatabase.media.entry[]) => void, reject) => {
                        const req = actions.getCollection(this.id!);
                        req.onsuccess = () => {
                            resolve(req.result);
                        };
                        req.onerror = () => {
                            reject(new Error("Failed to get collection (while converting TEMP to DB)"));
                        };
                    });
                });
                const knownIds = dbCollection.map(v => v.id);
                filteredBlobs = Object.entries(this.blobs).map((v) => {
                    if (knownIds.includes(v[0])) return undefined;
                    return { id: v[0], blob: v[1], collection: this.id! };
                }).filter(v => v !== undefined);
            } else {
                // Step 1, Case: DB does not Exist.
                // Step 2 is skipped
                filteredBlobs = Object.entries(this.blobs).map(v => {
                    return { id: v[0], blob: v[1], collection: this.id! };
                }).filter(v => v !== undefined);
            }
            // Step 3: Add everything to DB
            const promises = (await mediadb).do(actions => {
                return filteredBlobs.map(v => {
                    return actions.add(v.blob, { collection: v.collection, id: v.id });
                });
            });
            await Promise.all(promises);
            // Step 4: save
            this.save();
        }
    }
    broadcastDealer(e: MessageEvent) {
        // note to dev: ALWAYS double check if it already exists/is already taken care of, otherwise you will accidentally create a feedback loop.
        // reason for feedback loop: an event and a broadcast message is dispatched when adding, removing or reordering. (unless you disable it)
        // If you check if nothing changed BEFORE the message is sent, another Event won't be sent, which is cheaper on processing power.
        const data: MediaCollection.broadcastMessage = e.data;
        this.logger.debug("Received Broadcast - {type}", { type: data.type });
        const knownBlobs = Object.keys(this.blobs);
        switch (data.type) {
            case "added":
                const newlyAdded = data.target.filter(v => !knownBlobs.includes(v.id));
                if (newlyAdded.length > 0) {
                    this.appendWithDetail(newlyAdded, { skipDatabase: true, sendBroadcast: false });
                }
                break;
            case "removed":
                const toBeRemoved = data.target.filter(v => knownBlobs.includes(v));
                if (toBeRemoved.length > 0) {
                    this.deleteWithDetail(toBeRemoved, { sendBroadcast: false });
                }
                break;
            case "reordered":
                const doubleCheckOrder = data.target.every((v, i) => v === this.order[i]);
                if (!doubleCheckOrder) {
                    this.reorderWithDetail(data.target, { sendBroadcast: false });
                }
                break;
        
            default:
                break;
        }
    }
    /**
     * Unloads collection.
     */
    unload() {
        this.broadcast.close();
    }
    /**
     * Dump data stored in localStorage
     * @param id 
     */
    static dumpStorage(id: UUIDTime) {
        return {
            order: localStorage.getItem(MediaCollection.mediaOrderPrefix + id),
            metadata: localStorage.getItem(MediaCollection.metadataPrefix + id)
        }
    }
    /**
     * Get `localStorage` Metadata of a collection, without loading it
     * @param id 
     * @returns 
     */
    static getMetadata(id: UUIDTime): MediaCollection.collectionMetadata {
        return JSON.parse(localStorage.getItem(MediaCollection.metadataPrefix + id) ?? "{}");
    }
}

export namespace MediaCollectionsManager {
    export type broadcastMessage = {
        type: "localStorageSave"
    } | {
        type: "collectionRename",
        target: {
            id: UUIDTime,
            newName: string
        }
    }
    export type preparedVars = {available: UUIDTime[], current: MediaCollection, gallery: JGVGallery, logger: Logger}
}

/**
 * This manages collections: loads on startup, switches between them, tells the UI to do things (UI being managed by `JGVGallery`). Has functions for listing currently available collections, and more.
 * It does not manage the media in collections themselves. This is done by the `MediaCollection` class.
 * 
 * This also means it writes to `localStorage`, saves the data frequently and reloads it whenver it's written, so all tabs are up-to-date.
 */
export class MediaCollectionsManager {
    static collectionsLocalStorageKey = "mediaCollections";
    static collectionIdToUrl(id: UUIDTime): URL { // https://stackoverflow.com/a/41542008
        const url = new URL(window.location.toString());
        url.searchParams.set("collection", id.toString());
        return url;
    }
    static collectionNoIdToUrl(): URL { // https://stackoverflow.com/a/41542008
        const url = new URL(window.location.toString());
        url.searchParams.delete("collection");
        return url;
    }
    static pushHistory(updateUrl: URL) {
        window.history.pushState({}, "", updateUrl)
    }
    static getAlphabeticalFirstCollection(list: [UUIDTime, ...UUIDTime[]]): UUIDTime {
        const metadata: Record<UUIDTime, MediaCollection.collectionMetadata> = list.reduce((prev, id) => {
            const data = MediaCollection.getMetadata(id);
            return {...prev, [id]: data.name}
        }, {});
        const sorted = list.toSorted((a, b) => {
            if (!(metadata[a]) || !(metadata[b])) return 0;
            const nameA = metadata[a]?.name?.toLocaleLowerCase();
            const nameB = metadata[b]?.name?.toLocaleLowerCase();
            if (nameA < nameB) return -1;
            if (nameA > nameB) return 1;
            return 0;
        });
        return sorted[0]!;
    }
    /** Collections found in store. Only IDs are stored */
    available: UUIDTime[];
    /** What collections NOT to save, since they're temporary */
    temporary: UUIDTime[] = [];
    current: MediaCollection;
    gallery: JGVGallery;
    broadcast: BroadcastChannel;
    logger: Logger;
    static async init(gallery: JGVGallery, returnPreparedVars: true): Promise<MediaCollectionsManager.preparedVars>
    static async init(gallery: JGVGallery, returnPreparedVars?: false): Promise<MediaCollectionsManager>
    static async init(gallery: JGVGallery, returnPreparedVars: boolean = false): Promise<MediaCollectionsManager | MediaCollectionsManager.preparedVars> {
        // TODO: There is probably a better way than spamming if-else statements and relying on the programmer to understand when what should be defined.
        // TODO: cannot manage multiple galleries due to URL dependancy
        
        const loggerMain = getLogger("MediaCollectionsManager");
        const logger = loggerMain.getChild("Init");

        // load available collections
        let available: UUIDTime[] = JSON.parse(localStorage.getItem(MediaCollectionsManager.collectionsLocalStorageKey) ?? "[]");
        if (!Array.isArray(available)) { // deal with legacy version - JGVDB Version 0
            // Originally "mediaCollections" was an object containing a key "collections" and other IDs which were IDs.
            // No more.
            localStorage.setItem("mediaCollections_LegacyV0_Backup", JSON.stringify(available));
            available = [];
        }
        let updateUrl: null | URL = null;
        /** Collection ID to load. If null, a new will be created */
        let collectionId: null | UUIDTime;
        /** Current MediaCollection */
        let current: MediaCollection | undefined = undefined;

        // Figure out what collection to load or if we should make a new one
        if (available.length === 0) {
            // well shit there's nothing to load. Time to make a new collection!
            collectionId = null;
            logger.debug("No collections available.");
        } else {
            // a few collections are available. Let's get the current one from the URL
            const params = new URLSearchParams(window.location.search);
            const grabbedCollectionId: UUIDTime | null = params.get("collection");
            if (!grabbedCollectionId) {
                // User opened a new tab, while collections are available
                // Let's get the first in alphabetical order, then change the URL to it
                collectionId = MediaCollectionsManager.getAlphabeticalFirstCollection(available as [UUIDTime, ...UUIDTime[]]);
                updateUrl = MediaCollectionsManager.collectionIdToUrl(collectionId!);
                logger.debug("Collections available. No collection ID provided.");
            } else {
                // Nice we got an ID! is it real though?
                if (available.includes(grabbedCollectionId)) {
                    collectionId = grabbedCollectionId;
                    logger.debug("Collections available. Valid Collection ID provided.");
                } else {
                    // the user lied to us >:C
                    collectionId = MediaCollectionsManager.getAlphabeticalFirstCollection(available as [UUIDTime, ...UUIDTime[]]);
                    updateUrl = MediaCollectionsManager.collectionIdToUrl(collectionId!);
                    logger.debug("Collections available. Invalid Collection ID provided (ignoring).");
                }
            }
        }
        // In case there is no collectionId defined, this means we couldn't find ANYTHING.
        // Let's create a new collection, and update the URL
        if (!collectionId) {
            current = await MediaCollection.create("database");
            available.push(current.id!);
            updateUrl = MediaCollectionsManager.collectionIdToUrl(current.id!);
        } else {
            // otherwise, we DO have an ID and can load a collection
            current = await MediaCollection.load(collectionId);
        }
        if (updateUrl) {
            MediaCollectionsManager.pushHistory(updateUrl);
        }

        logger.debug("Completed Init", {
            url: updateUrl,
            currentId: collectionId
        })

        // Finally, load the collection
        gallery.switchCollection(current);
        const preparedVars = { available: available, current: current, gallery: gallery, logger: loggerMain};
        if (returnPreparedVars) {
            return preparedVars;
        } else {
            return new this(preparedVars);
        }
    }
    constructor(preparedVars: MediaCollectionsManager.preparedVars) {
        this.logger = preparedVars.logger;
        this.available = preparedVars.available;
        this.current = preparedVars.current;
        this.gallery = preparedVars.gallery;
        this.broadcast = new BroadcastChannel("mediaCollectionsManager");
        this.broadcast.addEventListener("message", this.broadcastDealer.bind(this));
        window.addEventListener("collectionrenamed", (e) => {
            if (e instanceof MediaCollectionEvent && !e.alreadyBroadcast) {
                this.broadcast.postMessage({
                    type: "collectionRename",
                    target: {
                        id: e.id,
                        newName: e.newName
                    }
                } as MediaCollectionsManager.broadcastMessage);
            }
        });
    }
    /**
     * Create a new collection, but don't switch to it immediately
     * @param type 
     */
    async newCollection(type: "database" | "temporary") {
        const newCollection = await MediaCollection.create(type);
        if (newCollection.id) {
            this.available.push(newCollection.id);
            if (newCollection.temporary) this.temporary.push(newCollection.id);
            this.save();
        }
        return newCollection;
    }
    /**
     * Switch to a known collection
     * @param idOrMC ID or a MediaCollection
     */
    async switchCollection(idOrMC: UUIDTime | MediaCollection) {
        this.current.save();
        this.current.unload();
        if (typeof idOrMC === "string") {
            if (!this.available.includes(idOrMC)) throw new Error("ID is not a known collection");
            this.current = await MediaCollection.load(idOrMC);
        } else if (idOrMC instanceof MediaCollection) {
            this.current = idOrMC;
        }
        this.gallery.switchCollection(this.current);
        if (this.current.id) {
            MediaCollectionsManager.pushHistory(MediaCollectionsManager.collectionIdToUrl(this.current.id));
        } else {
            MediaCollectionsManager.pushHistory(MediaCollectionsManager.collectionNoIdToUrl());
        }
    }
    async deleteCurrentCollection() {
        this.available = this.available.filter(v => v !== this.current.id);
        await this.current.wipe();
        this.save();
        this.ensureCollectionInGallery();
    }
    async deleteCollection(id: UUIDTime) {
        if (this.available.includes(id)) {
            this.available = this.available.filter(v => v !== id);
            await MediaCollection.wipe(id);
            this.save();
        } else {
            throw new Error("Collection is unknown (existence debatable)", { cause: id });
        }
    }
    ensureCollectionInGallery() {
        if (this.gallery.collection?.wiped === false) return;
        if (this.available[0]) {
            const metadata = this.available.map(id => ({id: id, metadata: MediaCollection.getMetadata(id)}))
            metadata.sort((a, b) => {
                const alow = a.metadata.name.toLocaleLowerCase();
                const blow = b.metadata.name.toLocaleLowerCase();
                if (alow < blow) return -1;
                if (alow > blow) return 1;
                return 0;
            });
            this.switchCollection(metadata[0]!.id);
        } else {
            this.newCollection("database").then(c => this.switchCollection(c));
        }
    }
    /**
     * Wipes everything, cleanly.
     * 
     * - Database is fully deleted
     * - Collections each individually delete their localStorage things.
     * - `this.save()` dispatches changes across tabs
     * - re-initializes for the tab where the deletion occured
     */
    async deleteEverything() {
        const localStorageWipes = this.available.map(id => MediaCollection.wipe(id, true));
        const clearResult = (await mediadb).do(actions => {
            return actions.clear();
        });
        const clearPromise = new Promise((resolve, reject) => {clearResult.onsuccess = resolve; clearResult.onerror = reject});
        this.available = [];
        this.save();
        MediaCollectionsManager.pushHistory(MediaCollectionsManager.collectionNoIdToUrl());
        await Promise.all([...localStorageWipes, clearPromise]);
        // window.location.reload(); // TODO: get rid off
        // Redo the constructor
        const newThis = await MediaCollectionsManager.init(this.gallery, true);
        this.logger = newThis.logger;
        this.available = newThis.available;
        this.current = newThis.current;
        this.gallery = newThis.gallery;
    }
    /**
     * Save current states
     */
    save() {
        localStorage.setItem(MediaCollectionsManager.collectionsLocalStorageKey, JSON.stringify(this.available.filter(id => !this.temporary.includes(id))));
        this.gallery.collection?.save();
        this.logger.debug("Saved state")
        this.broadcast.postMessage({
            type: "localStorageSave"
        } as MediaCollectionsManager.broadcastMessage);
        this.logger.info("Saved");
    }
    /**
     * Reloads current states and dispatch events
     */
    reload() {
        const newAvailableNoSet = JSON.parse(localStorage.getItem(MediaCollectionsManager.collectionsLocalStorageKey) ?? "[]") as UUIDTime[];
        const newAvailable = new Set(newAvailableNoSet);
        const oldAvailable = new Set(this.available.filter(id => !this.temporary.includes(id)));

        // remove deleted collections
        const onlyInOld = Array.from(oldAvailable.difference(newAvailable));
        onlyInOld.forEach(id => {
            if (this.current.id === id) {
                this.current.id = null; // idk if necessary, but just to make sure
                this.current.wiped = true;
                this.current.unload();
            }
            MediaCollection.wipe(id, true);
        });

        // add newly created collections
        const onlyInNew = Array.from(newAvailable.difference(oldAvailable));
        onlyInNew.forEach(id => {
            // this is a bit unclean, but all we really need is to tell everyone that there is a new collection
            // there's no need to create a new MediaCollection instance, as it already (kind of) exists
            // and there's no proper way to create a media collection while avoiding everything only to dispatch the event of it being created.
            // so, we're doing it ourselves
            window.dispatchEvent(new MediaCollectionEvent("collectionadded", {
                id: id
            }));
        });

        this.available = [...newAvailableNoSet, ...this.temporary];

        // finally: DO NOT SAVE otherwise we have another broadcast
        // we also don't need to save, as everything was already saved by the other window

        this.ensureCollectionInGallery();
        this.logger.info("Reloaded");
    }
    broadcastDealer(e: MessageEvent) {
        const data: MediaCollectionsManager.broadcastMessage = e.data;
        this.logger.debug("Received Broadcast - {type}", { type: data.type });
        switch (data.type) {
            case "localStorageSave":
                this.reload();
                break;
            case "collectionRename":
                if (this.current.id === data.target.id) {
                    this.current.name = data.target.newName;
                }
                window.dispatchEvent(new MediaCollectionEvent("collectionrenamed", {
                    id: data.target.id,
                    newName: data.target.newName,
                    alreadyBroadcast: true
                }));
                break;
        
            default:
                break;
        }
    }
    /**
     * Dump everything about collections
     */
    async dump(): Promise<{
        available: UUIDTime[],
        collections: { [key: UUIDTime]: {
            order: UUIDTime[],
            metadata: MediaCollection.collectionMetadata
        } },
        blobs: MediaDatabase.media.entry[]
    }> {
        const available = this.available; // TODO: how to copy, to avoid a TOCTOU
        const dataDump: { [key: UUIDTime]: {
            order: UUIDTime[],
            metadata: MediaCollection.collectionMetadata
        } } = available.map(id => ({
                id: id,
                data: MediaCollection.dumpStorage(id)
        })).reduce((prev, c) => ({
            ...prev, [c.id]: c.data
        }), {});
        const blobsReq = (await mediadb).do(actions => actions.dump());
        const blobs: MediaDatabase.media.entry[] = await new Promise((resolve, reject) => {
            blobsReq.onsuccess = () => {
                resolve(blobsReq.result);
            }
            blobsReq.onerror = reject;
        });
        return {
            available: available,
            collections: dataDump,
            blobs: blobs
        }
    }
    async switchCollectionToType(id: UUIDTime, type: "database" | "temporary") {
        throw new Error("TODO: Implement.");
        // This will switch collections to their new type, and update this.temporary accordingly.
    }
}
