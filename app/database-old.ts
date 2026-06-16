// // Image Database - https://dev.to/tqbit/how-to-use-indexeddb-to-store-images-and-other-files-in-your-browser-51fm
// // https://www.javascripttutorial.net/web-apis/javascript-indexeddb/

// import { mediaCollections, mediaOrder } from "./collections-old";
// import { revokeAllOBJURLS } from "./globals";
// import { refreshGallery, updateStorageInfo } from "./other-ui";
// import { uuidtime, type UUIDTime } from "./util";

// /**
//  * Makes Database available for use.
//  * @param whenOpen Function to run with the database open.
//  * @returns 
//  */
// export function useImageDB(whenOpen: (db: IDBDatabase) => any | void) {
//     return new Promise<void>((resolve, reject) => {
//         const request: IDBOpenDBRequest = indexedDB.open('images', 1);
//         request.onerror = (event) => {
//             console.error(`Database error: ${request.error, event}`);
//             reject();
//         };
    
//         // initialize Database, when created for the first time
//         request.onupgradeneeded = (event) => {
//             let db = request.result;
    
//             // create the saved object store 
//             // with auto-increment id
//             let store: IDBObjectStore[] = [];
//             ['img', 'vid'].forEach(type => {
//                 store.push(db.createObjectStore(type, {
//                     autoIncrement: true
//                 }));
//             })
    
//             // create an index on the imgblob property
//             store.forEach(st => {
//                 let index = st.createIndex('id', 'id', {
//                     unique: true
//                 });
//             })
//             resolve();
//         };
        
//         request.onsuccess = (event) => {
//             whenOpen(request.result);
//             resolve();
//             request.result.close();
//         };
//     })
// };

// type mediaTypes = "img" | "vid"

// // DATABASE
// export async function media2db(type: mediaTypes, imgblob: Blob | File, id: string | undefined = undefined) {
//     // WARNING! Implement your own call to mediaCollectionsSave(), as mediaOrder.push(mediaID) WILL NOT trigger the save.
//     let mediaID;
//     let resolveIt: Function | undefined = undefined;
//     let rejectIt: Function | undefined = undefined;
//     let promising = new Promise((resolve, reject) => {
//         resolveIt = resolve;
//         rejectIt = reject;
//     })
//     let todo = function(db: IDBDatabase){
//         const trans = db.transaction(type, "readwrite");
//         const store = trans.objectStore(type);
//         mediaID = id ? String(id) : uuidtime();
//         let query = store.put(imgblob, mediaID);
//         mediaOrder.push(mediaID);
//         // here would be a mediaCollectionsSave(), but JSON.parse is slow... luckily media2db is only used in create*() funcs, which are only used in the loadNewPics func, so we can simply implement the call there instead.
//         // handle success case
//         query.onsuccess = function (event) {
//             resolveIt?.();
//         };
    
//         // handle the error case
//         query.onerror = function (event) {
//             console.error((event.target as IDBRequest)?.error); // was originally event.target.errorCode, but it doesn't exist on any IDB Related object I could find
//             rejectIt?.();
//         };
//     }
//     useImageDB(todo);
//     await promising;
//     updateStorageInfo();
//     return mediaID;
// }

// export async function grabMedia() {
//     let mediaBlobs: Record<string, File | Blob> = {};
//     const types: mediaTypes[] = ["img", "vid"];
//     let promises: { "img"?: Function, "vid"?: Function } = {};
//     let promises_arr: Promise<any>[] = [];
//     types.forEach((type: mediaTypes) => {
//         let newprom = new Promise((resolve) => {promises[type] = resolve;});
//         promises_arr.push(newprom);
//     })
//     let todo = async function(db: IDBDatabase){
//         for (const type of types) {
//             const typer = type; // Because it accidentally likes to replace itself lmao
//             const trans = db.transaction(typer, "readonly");
//             const store = trans.objectStore(typer);
//             const theCursor = store.openCursor();
//             theCursor.onsuccess = (event) => {
//                 let cursor = (event.target as IDBRequest).result;
//                 if (cursor) {
//                     mediaBlobs[cursor.primaryKey] = cursor.value;
//                     cursor.continue();
//                 } else {
//                     promises[typer]?.(); // Solve the promise when reaching the end
//                 }
//             };
//             theCursor.onerror = (event) => {
//                 promises[type]?.();
//             }
//         }
//     }
//     useImageDB(todo);
//     await Promise.all(promises_arr); // i love code that's sonic
//     return mediaBlobs;
// }
// export async function yeetAllMedia(userOptions: { dontreload?: boolean, onlyDeleteDB?: boolean } ={}, whenDeleted=function(e: Event ){}) {
//     return new Promise((resolve, reject) => {
//         const { dontreload = false, onlyDeleteDB = false} = userOptions;
//         // Delete Database
//         const request = indexedDB.deleteDatabase('images');
//         request.onerror = (event) => {
//             console.error(`Database error: ${(event.target as IDBOpenDBRequest).error, event}`);
//             reject();
//         };
//         request.onsuccess = (event) => {
//             whenDeleted(event);
//             resolve(undefined);
//         };

//         if (onlyDeleteDB != true) {
//             // Delete Collections
//             mediaCollections.replaceObject({});
    
//             // Prevent entries from the now deleted database to be loaded
//             localStorage.removeItem("mediaOrder");
//         }

//         // And free the RAM
//         revokeAllOBJURLS()

//         // Proceed to hell :3
//         if (dontreload != true) {
//             window.location.reload(); // originally had a reload(true) as firefox does that. No more.
//         }
//     })
// }

// /** @deprecated Use new Media Collections class */
// export var tempListOfYeetedMedia: UUIDTime[] = [];
// /**
//  * Delete multiple Media entries. Deletes them from the current collection, database, and DOM.
//  * @param ids ID
//  * @param whenDeleted Callback after deletion
//  * @returns Promise that is fulfilled on completion.
//  * @deprecated Use new Media Collections class
//  */
// export async function yeetMedia(ids: UUIDTime[] | UUIDTime, whenDeleted = function() {}) {
//     // ids can be a single id (string) or an array of IDs
//     ids = typeof ids !== "string" ? ids : Array(ids); // turn ID into array if string
//     let ids_processed = ids.length;
//     let listOfYeetedMedia: UUIDTime[] = [];
//     const promising = new Promise((resolve: Function, reject: Function) => {
//         let types = ["img", "vid"];
//         // let types_remaining = types.length;
//         types.forEach((type: string) => {
//             let todo = function(db: IDBDatabase) {
//                 const trans = db.transaction([type], 'readwrite');
//                 const store = trans.objectStore(type);
//                 if (ids.length === 0) { // if there is nothing to delete anyways
//                     mediaOrder.replaceArray([]);
//                     refreshGallery();
//                     whenDeleted();
//                     resolve();
//                 } else {
//                     ids.forEach(id => {
//                         const cursor = store.openCursor(IDBKeyRange.only(id));
//                         cursor.onsuccess = (event) => {
//                             const cursor = (event.target as IDBRequest<IDBCursorWithValue>).result;
//                             if (cursor) {
//                                 cursor.delete();
//                                 cursor.continue();
//                             } else {
//                                 // Remove the media ID from the mediaOrder array
//                                 if (!listOfYeetedMedia.includes(id)) { // Only when we actually finished them all
//                                     listOfYeetedMedia.push(id);
//                                     ids_processed -= 1;
//                                     mediaOrder.replaceArray(mediaOrder.filter(mId => mId !== id));
//                                     let elm = document.querySelector(`[data-media-id=\"${id}\"]`) as HTMLImageElement;
//                                     try {
//                                         URL.revokeObjectURL(elm.src);
//                                     } catch (error) {
//                                         console.log("whoops, seems like the object wasn't ever a url!", error);
//                                     }
//                                     try {
//                                         elm.parentElement?.remove(); // yeet it from zhe dom
//                                     } catch (error) {
//                                         console.log("whoops, seems like the object wasn't ever in the dom!", error);
//                                     }
//                                     if (ids_processed == 0) {
//                                         refreshGallery();
//                                         // Notify about deletion
//                                         whenDeleted();
//                                         resolve();
//                                     }
//                                 }
//                             }
//                         }
//                         cursor.onerror = (event) => {
//                             console.error("Database entry deletion failed:", (event.target as IDBRequest<IDBCursorWithValue>).error);
//                             reject();
//                         }
//                     });
//                 }
//             };
//             useImageDB(todo);
//         })
//     });
//     promising.finally(() => {
//         // Add the deleted IDs to the bunch
//         // Why can't we directly add it to tempListOfYeetedMedia? Well, if an image of a collection was already deleted,
//         // and we then try to delete the entire collection, we get an already deleted id. It assumes we already deleted it,
//         // as it is in tempListOfYeetedMedia, and doesn't decrease ids_processed, leaving the promise to be never fulfilled, nor rejected.
//         tempListOfYeetedMedia.push(...listOfYeetedMedia.filter(v => !tempListOfYeetedMedia.includes(v)));
//     });
//     return promising;
// }

// /** @deprecated Use new Media Collections class */
// /**
//  * Delete a whole collection. Removes images from DOM and database as well.
//  * @param idOfCollection ID of the collection found on `mediaCollections`.
//  * @param callback Function to call after deletion.
//  * @returns Deletes IDs.
//  */
// export async function yeetMediaCollection(idOfCollection: UUIDTime, callback: Function=function(){}) {
//     let ids = mediaCollections[idOfCollection]?.data ?? [];
//     let othercallback;
//     let otherpromise = new Promise(resolve => {othercallback = resolve});
//     yeetMedia(ids, othercallback)
//     await otherpromise;
//     callback();
//     return ids;
// }
