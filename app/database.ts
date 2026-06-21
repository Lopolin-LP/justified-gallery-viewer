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
                updateStorageInfo();
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
    public do<T>(func: (actions: MediaDatabaseDo) => T): T {
        return func(new MediaDatabaseDo(this.db));
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
     * @param target data related to the collection on which the event triggered
     */
    constructor(type: "collectionadded" | "collectionloaded" | "collectionrenamed", target: { collection: MediaCollection, id: UUIDTime | null });
    constructor(type: "collectionremoved", target: { id: UUIDTime | null});
    constructor(type: "collectionadded" | "collectionremoved" | "collectionloaded" | "collectionrenamed", target: {collection?: MediaCollection, id: UUIDTime | null}) {
        super(type, { bubbles: false, cancelable: false, composed: false });
        this.id = target.id;
        this.collection = target.collection;
    }
    public readonly id: UUIDTime | null;
    public readonly collection: MediaCollection | undefined;
}

export namespace MediaCollection {
    export type collectionMetadata = {
        name: string
    }
}

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
    /**
     * Load an existing collection from the Database or Cache
     * @param id Collection ID
     * @returns 
     */
    static async load(id: UUIDTime): Promise<MediaCollection> {
        if (temporaryCollectionsCache[id]) return temporaryCollectionsCache[id];
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
        const order: UUIDTime[] = JSON.parse(localStorage.getItem(MediaCollection.mediaOrderPrefix + id) ?? "[]");
        const collectionMetadata: MediaCollection.collectionMetadata = JSON.parse(localStorage.getItem(MediaCollection.metadataPrefix + id) ?? "null") ?? {
            name: "Unnamed Collection " + id
        };
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
            window.dispatchEvent(new MediaCollectionEvent("collectionadded", { collection: result, id: id }));
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
            window.dispatchEvent(new MediaCollectionEvent("collectionadded", { collection: result, id: id }));
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

    constructor(preparedVars: {order: UUIDTime[], id: UUIDTime | null, temporary: boolean, metadata: MediaCollection.collectionMetadata, blobs: { [key: UUIDTime]: (File | Blob)}}) {
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
        this.temporary = preparedVars.temporary;

        this.save();

        // Dispatch Event
        window.dispatchEvent(new MediaCollectionEvent("collectionloaded", { collection: this, id: this.id }));
    }
    /** Appends one or more new Media blobs to the collection — Order dependant */
    async append(...blob: (File | Blob)[]): Promise<UUIDTime[]> {
        let mediaIds: UUIDTime[] = [];
        // save to database if needed + make UUID
        if (this.id && !this.temporary) {
            const collectionId = this.id; // explicitly define to make TypeScript know its defined cross-scope
            const mediaIdsPromises = (await mediadb).do((actions) => {
                return blob.map(b => 
                    actions.add(b, { collection: collectionId })
                );
            });
            for (const idpromise of mediaIdsPromises) {
                mediaIds.push(await idpromise)
            }
        } else {
            mediaIds = Array(blob.length).fill(null).map(() => { return uuidtime() });
        }
        // Save in collection
        const objectEntriesBlobAndId = arrayInvertAxis([mediaIds, blob]) as unknown as [UUIDTime, File | Blob][];
        this.blobs = {...this.blobs, ...Object.fromEntries(objectEntriesBlobAndId)}
        this.order.push(...mediaIds);
        this.save();

        const eventEntries = objectEntriesBlobAndId.map(v => ({ id: v[0], blob: v[1]}))

        // Dispatch Event
        this.events.dispatchEvent(new MediaCollectionMediaEvent("collectionmediaappended", eventEntries));

        return mediaIds;
    }
    /**
     * Delete one or more Media elements depending on ID
     * @param id 
     */
    async delete(...id: UUIDTime[]) {
        for (const thisId of id) {
            try {
                delete this.blobs[thisId];
            } catch {
                console.warn("Couldn't delte ID", thisId, "from Collection", this.id);
            }
        }
        if (this.id && !this.temporary) {
            const mediadbnow = await mediadb;
            const promises = id.map(v => {
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
        this.order = this.order.filter(val => !id.includes(val));
        this.save();
        // Dispatch Event
        this.events.dispatchEvent(new MediaCollectionMediaEvent("collectionmediaremoved", id.map(v => ({id: v}))));
    }
    /**
     * Delete the entire collection, without loading it
     * @param id ID of collection
     * @param skipDatabase If database deletion should be skipped. The only good reason to do so is if you delete everything anyways and just don't want to deal with localStorage.
     */
    static async wipe(id: UUIDTime, skipDatabase?: boolean) {
        if (id) {
            if (!skipDatabase) await (await mediadb).do(actions => {
                return actions.deleteCollection(id);
            });
            localStorage.removeItem(MediaCollection.mediaOrderPrefix + id);
            localStorage.removeItem(MediaCollection.metadataPrefix + id);
        }
        // Dispatch Event
        window.dispatchEvent(new MediaCollectionEvent("collectionremoved", { id: id }));
    }
    /** Delete the entire collection */
    async wipe(): Promise<void> {
        if (this.id) {
            await MediaCollection.wipe(this.id, !this.temporary); // skip db if temporary
        }
        this.blobs = {};
        this.order = [];
        this.id = null;
        this.wiped = true;
    }
    /** Change order */
    reorder(newOrder: UUIDTime[]): void {
        this.order = newOrder;
        this.save();

        // Dispatch Event
        this.events.dispatchEvent(new MediaCollectionMediaEvent("collectionmediareordered"));
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
        window.dispatchEvent(new MediaCollectionEvent("collectionrenamed", { collection: this, id: this.id }));
    }
    /** Saves some additional Metadata about the collection: Media Order and Metadata (Name) */
    save() {
        if (this.id && !this.temporary) {
            localStorage.setItem(MediaCollection.mediaOrderPrefix + this.id, JSON.stringify(this.order));
            localStorage.setItem(MediaCollection.metadataPrefix + this.id, JSON.stringify({name: this.name}));
        }
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
    static getMetadata(id: UUIDTime): MediaCollection.collectionMetadata {
        return JSON.parse(localStorage.getItem(MediaCollection.metadataPrefix + id) ?? "{}");
    }
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
    static async init(gallery: JGVGallery) {
        // TODO: There is probably a better way than spamming if-else statements and relying on the programmer to understand when what should be defined.
        // TODO: cannot manage multiple galleries due to URL dependancy

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
            console.debug("DB START: No collections available.");
        } else {
            // a few collections are available. Let's get the current one from the URL
            const params = new URLSearchParams(window.location.search);
            const grabbedCollectionId: UUIDTime | null = params.get("collection");
            if (!grabbedCollectionId) {
                // User opened a new tab, while collections are available
                // Let's get the first in alphabetical order, then change the URL to it
                collectionId = MediaCollectionsManager.getAlphabeticalFirstCollection(available as [UUIDTime, ...UUIDTime[]]);
                updateUrl = MediaCollectionsManager.collectionIdToUrl(collectionId!);
                console.debug("DB START: Collections available. No collection ID provided.");
            } else {
                // Nice we got an ID! is it real though?
                if (available.includes(grabbedCollectionId)) {
                    collectionId = grabbedCollectionId;
                    console.debug("DB START: Collections available. Valid Collection ID provided.");
                } else {
                    // the user lied to us >:C
                    collectionId = MediaCollectionsManager.getAlphabeticalFirstCollection(available as [UUIDTime, ...UUIDTime[]]);
                    updateUrl = MediaCollectionsManager.collectionIdToUrl(collectionId!);
                    console.debug("DB START: Collections available. Invalid Collection ID provided (ignoring).");
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

        // Finally, load the collection
        gallery.switchCollection(current);
        return new this({ available: available, current: current, gallery: gallery});
    }
    constructor(preparedVars: {available: UUIDTime[], current: MediaCollection, gallery: JGVGallery}) {
        this.available = preparedVars.available;
        this.current = preparedVars.current;
        this.gallery = preparedVars.gallery;
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
        window.location.reload(); // TODO: get rid off
    }
    /**
     * Save current states
     */
    save() {
        localStorage.setItem(MediaCollectionsManager.collectionsLocalStorageKey, JSON.stringify(this.available.filter(id => !this.temporary.includes(id))));
        this.gallery.collection?.save();
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
}
