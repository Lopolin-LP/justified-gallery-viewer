// // import { yeetMediaCollection } from "./database-old";
// import { galleryElm, type mediaOrdered } from "./globals";
// // import { refreshGallery } from "./other-ui";
// import { removeFromArray, uuidtime, type UUIDTime } from "./util";
// import * as zip from "../zip.js";
// import { getMimeType } from "../zip.js/mime-types.js";
// // import { createIMG, createVID } from "./gallery-dom-old.js";
// import { settings } from "./settings";

// // LEGACY CODE: Saving the order of the images and videos
// let LOCAL_FOR_ARRAY_ONLY_mediaOrder: string[] = (function(){
//     let item = localStorage.getItem("mediaOrder");
//     return item ? JSON.parse(item) : []
// })();

// type mediaOrderArray = string[];
// type mediaOrderObject = { replaceArray: Function };

// /** @deprecated Use new Media Collections class */
// let mediaOrder = new Proxy(LOCAL_FOR_ARRAY_ONLY_mediaOrder as unknown as mediaOrderArray & mediaOrderObject , {
//     get(target, prop, receiver) {
//         if (prop === "replaceArray") {
//             // Provide a function to replace the underlying array
//             return (newArray: mediaOrderArray) => {
//                 if (!Array.isArray(newArray)) {
//                     throw new TypeError("Expected an array");
//                 }
//                 // Clear the target array and copy newArray's contents
//                 (target as mediaOrderArray).length = 0;
//                 (target as mediaOrderArray).push(...newArray);
//                 // Sync with localStorage
//                 localStorage.setItem("mediaOrder", JSON.stringify(target));
//             };
//         }
//         // Allow normal array-like behavior
//         return Reflect.get(target, prop, receiver);
//     },
//     set(target, prop, value) {
//         // Update the target array
//         const result = Reflect.set(target, prop, value);
//         // Update Collection
//         mediaCollectionsSetToMediaOrder();
//         // Sync with localStorage
//         localStorage.setItem("mediaOrder", JSON.stringify(target));
//         return result;
//     }
// });

// // Collections management
// type mediaCollection = { name: string, data: UUIDTime[] }
// type mediaCollectionsType = Record<UUIDTime, mediaCollection> & { current: UUIDTime, collections: UUIDTime[], replaceObject: (object: object) => void };

// let LOCAL_FOR_OBJECT_ONLY_mediaCollections = (function(){
//     let item = localStorage.getItem("mediaCollections");
//     return item ? JSON.parse(item) : new Object()
// })();

// /** @deprecated Use new Media Collections class */
// var mediaCollections: mediaCollectionsType = new Proxy(LOCAL_FOR_OBJECT_ONLY_mediaCollections, {
//     get(target, prop, receiver) {
//         if (prop === "replaceObject") {
//             // Provide a function to replace the underlying object
//             return (newObject: mediaCollectionsType) => {
//                 // Clear the target object and copy newObject's contents
//                 for (let variableKey in target) {
//                     if (target.hasOwnProperty(variableKey)){
//                         delete target[variableKey];
//                     }
//                 }
//                 for (let variableKey in newObject) {
//                     target[variableKey] = newObject[variableKey];
//                 }
//                 LOCAL_FOR_OBJECT_ONLY_mediaCollections = newObject;
//                 // Sync with localStorage
//                 localStorage.setItem("mediaCollections", JSON.stringify(target));
//             };
//         }
//         // Allow normal object-like behavior
//         return Reflect.get(target, prop, receiver);
//     },
//     set(target, prop, value) {
//         // console.log(target, prop, value)
//         // Update the target object
//         const result = Reflect.set(target, prop, value);
//         // Sync with localStorage
//         localStorage.setItem("mediaCollections", JSON.stringify(target));
//         return result;
//     },
//     deleteProperty(target, prop) {
//         const result = Reflect.deleteProperty(target, prop);
//         localStorage.setItem("mediaCollections", JSON.stringify(target));
//         return result;
//     }
// });
// /** @deprecated Use new Media Collections class */
// function mediaCollectionsSetToMediaOrder() {
//     (mediaCollections?.[mediaCollections.current] as mediaCollection).data = mediaOrder as mediaOrderArray;
// }
// /** @deprecated Use new Media Collections class */
// function mediaCollectionsSave() { // BECAUSE PROXY DOESN'T WORK ALL THE TIME QwQ
//     // Sync with localStorage
//     localStorage.setItem("mediaCollections", JSON.stringify(mediaCollections));
//     console.debug("Manual Safe triggered");
// }

// /** @deprecated Use new Media Collections class */
// function newCollection(name?: string) {
//     let id: UUIDTime = uuidtime();
//     mediaCollections[id] = {
//         name: typeof name === "undefined" ? "Unnamed Collection " + id : name,
//         data: []
//     };
//     mediaCollections.collections.push(id);
//     return id;
// }
// /** @deprecated Use new Media Collections class */
// function switchCollections(id: UUIDTime, options: { dontreload?: boolean } = {}) {
//     const { dontreload = false } = options;
//     mediaCollections.current = id;
//     (mediaOrder as mediaOrderObject).replaceArray((mediaCollections[id] as mediaCollection).data);
//     dontreload ? null : window.location.reload(); // originally had argument true. Why would I like to bypass the cache in firefox?
// }
// /** @deprecated Use new Media Collections class */
// async function deleteCollection(id: UUIDTime, deleteEntryToo=false) {
//     // Delete the images in the DB
//     await new Promise((resolve) => {
//         yeetMediaCollection(id, resolve);
//     });
//     // Clean up entries
//     if (deleteEntryToo) {
//         mediaCollections.collections = removeFromArray(mediaCollections.collections, id);
//         delete mediaCollections[mediaCollections.current];
//     }
//     // Remove last references
//     (mediaOrder as mediaOrderObject).replaceArray([]);
//     if (!deleteEntryToo) mediaCollectionsSetToMediaOrder();
//     mediaCollectionsSave(); // Locked in with manual gear because the proxy just doesn't proxy
//     // Reload
//     window.location.reload();
// }

// /** @deprecated Use new Media Collections class */
// const mediaCollectionsSort = (a: UUIDTime, b: UUIDTime) => { // We only need to sort on reload of the page, it's not really necessary to save it after we change the name
//     if (!(mediaCollections[a] && mediaCollections[b])) return 0;
//     if (mediaCollections[a].name.toLocaleLowerCase() < mediaCollections[b].name.toLocaleLowerCase()) {
//         return -1;
//     } else if (mediaCollections[a].name.toLocaleLowerCase() > mediaCollections[b].name.toLocaleLowerCase()) {
//         return 1;
//     }
//     return 0;
// }

// /** @deprecated Use new Media Collections class */
// function mediaCollectionsSelectionCreation(selcol: HTMLSelectElement) {
//     mediaCollections.collections.sort(mediaCollectionsSort);
//     for (const id of mediaCollections.collections) {
//         let opt = document.createElement("option");
//         opt.value = id;
//         opt.innerText = mediaCollections[id]?.name ?? "Invalid Collection Name — Something went terribly wrong.";
//         if (id === mediaCollections.current) {
//             opt.setAttribute("selected", "");
//         }
//         selcol.append(opt);
//     }
// }

// /**
//  * Save mediaOrder to storage.
//  * @returns 
//  * @deprecated Use new Media Collections class
//  */
// function updateMediaOrder() {
//     let newOrder = []
//     for (const image of galleryElm.children) {
//         newOrder.push(image.querySelector("img, video")?.getAttribute("data-media-id")) ?? new Error("the fuck");
//     }
//     if (galleryElm.getAttribute("reversed") == "true") {
//         newOrder.reverse();
//     }
//     mediaOrder.replaceArray(newOrder);
//     mediaCollectionsSave();
//     return newOrder;
// }

// // Adding new images

// /**
//  * Load new images into the gallery. This is the only function that adds them to the gallery.
//  * @param fileListToProcess Array of Files 
//  * @param saveMedia If brand new entries should be created in the DB
//  * @param respectiveIDs The IDs given to the files, both at the same index. Used when adding a picture to the gallery that is already in the DB
//  * @returns 
//  */
// function loadNewPics(fileListToProcess: mediaOrdered | undefined = undefined, saveMedia: boolean = true, respectiveIDs: string[] = []) {
//     // fileListToProcess: Array of Files
//     // saveMedia: If brand new entries should be created in the DB
//     // respectiveIDs: The IDs given to the files, both at the same index. Used when adding a picture to the gallery that is already in the DB
//     // addToDBbyID: ...except when that previous statement isn't true and we want to add them to the DB using the given IDs
//     return new Promise(async (resolve: Function, reject: Function) => {
//         if (!fileListToProcess) {
//             console.warn("loadNewPics was supplied with no file list, skipping...");
//             fileListToProcess = [];
//             reject();
//         }
//         let promiseMeTheFuckingImagesAreLoaded: Promise<any>[] = [];
//         for (let i = 0; i < fileListToProcess.length; i++) { // so we can use respectiveIDs
//             let currentFile = fileListToProcess[i];
//             if (currentFile === undefined) { // In case the file went missing from the database
//                 mediaOrder.replaceArray(mediaOrder.filter((faultyId) => faultyId != respectiveIDs[i]));
//                 console.log("faulty image!: ", respectiveIDs[i]);
//                 continue;
//             }
//             if (currentFile.type === "") { // the .file() method of FileSystemFileEntry doesn't create a damn type!
//                 currentFile = new File([currentFile], (currentFile as File).name, { lastModified: (currentFile as File).lastModified, type: getMimeType((currentFile as File).name) });
//             }
//             let imgBlobs = []; // Contains only one blob if it's not a zip
//             if (currentFile.type.match(/(image|video)\//)) {
//                 imgBlobs.push(currentFile);
//             } else if (currentFile.type.match(/application\/(x-zip-compressed|zip)/g)) {
//                 // Deal with ZIP
//                 let reader = new zip.ZipReader(new zip.BlobReader(currentFile));
//                 const zipFiles = await reader.getEntries(); // TODO: getEntries originally had `{"utf-8":""}` as the only parameter. Not sure what it did of this was the work of some machine generator.
//                 async function zipJSgetFile(item: zip.Entry, blobby_type: string) { // Originally this function didn't even have blobby_type, and expected it to be available to the scope where this function was run in. I'm genuinely baffled by the design decisions I made.
//                     let blobby = await item.getData!(new zip.BlobWriter()); // TODO: Assert that there is a getData function. the .d.ts file oddly enough says it may not be defined, as this entry could also be a directory.
//                     blobby = new File([blobby], item.filename, {type: blobby_type}); // recreate cuz zip.js stupid
//                     return blobby;
//                 }
//                 for await (let item of zipFiles) {
//                     const blobby_type = getMimeType(item.filename);
//                     if (!blobby_type.match(/(image|video)\//)) {
//                         if (blobby_type.match(/application\/(x-zip-compressed|zip)/g)) {
//                             await loadNewPics([await zipJSgetFile(item, blobby_type)]);
//                         }
//                     } else {
//                         imgBlobs.push(await zipJSgetFile(item, blobby_type));
//                     }
//                 }
//             }
//             // Required vars here are: imgBlobs
//             /*
//             Three step process:
//             1. Figure out if it's a video or an image
//             2. create according element
//             3. add it to chronological list
//             */
//             const categorizedBlobs = imgBlobs.map((blobby) => {
//                 if (blobby.type.includes("image/")) {
//                     return {
//                         type: "image",
//                         blob: blobby
//                     }
//                 } else if (blobby.type.includes("video/")) {
//                     return {
//                         type: "video",
//                         blob: blobby
//                     }
//                 } else {
//                     return {
//                         type: "invalid",
//                         blob: blobby
//                     }
//                 }
//             });
//             const finishedElmsPromise = categorizedBlobs.map(async (obj) => {
//                 switch (obj?.type) {
//                     case "image":
//                         return await createIMG(obj.blob, respectiveIDs[i], saveMedia);
//                     case "video":
//                         return await createVID(obj.blob, respectiveIDs[i], saveMedia);
                
//                     default:
//                         console.warn("Given object was neither image nor video.", obj)
//                         break;
//                 }
//             });
//             // Await the elements
//             const finishedElms: HTMLAnchorElement[] = [];
//             for (const prom of finishedElmsPromise) {
//                 const elm = await prom
//                 if (elm !== undefined) finishedElms.push(elm)
//             }
//             // Handle reversed case - TODO: shortway doesn't work due to "Uncaught (in promise) TypeError: 'append' called on an object that does not implement interface Element." - probably a TypeScript issue, as directly calling them works
//             // let galleryElmAppendOrPrependFunction = galleryElm.getAttribute("reversed") == "true" ? galleryElm.prepend : galleryElm.append
//             // galleryElmAppendOrPrependFunction(...finishedElms);
//             if (galleryElm.getAttribute("reversed") == "true") {
//                 galleryElm.prepend(...finishedElms);
//             } else {
//                 galleryElm.append(...finishedElms);
//             }
//             // let imgURLs = [];
//             // let videoURLs = [];
//             // for await (const blobby of imgBlobs) {
//             //     if (blobby.type.includes("image/")) {
//             //         imgURLs.push(blobby);
//             //     } else if (blobby.type.includes("video/")) {
//             //         videoURLs.push(blobby);
//             //     }
//             // }
//             // // TODO: Temporary fix to load stalling: Create all images first in parallel, and THEN append, instead of waiting for each one..
//             // for (const img of imgURLs) {
//             //     let currentPromise = new Promise(async (resolve: Function) => {
//             //         if (galleryElm.getAttribute("reversed") == "true") {
//             //             galleryElm.prepend(await createIMG(img, respectiveIDs[i], saveMedia));
//             //         } else {
//             //             galleryElm.append(await createIMG(img, respectiveIDs[i], saveMedia));
//             //         }
//             //         resolve();
//             //     });
//             //     promiseMeTheFuckingImagesAreLoaded.push(currentPromise);
//             //     await currentPromise;
//             // }
//             // for (const vid of videoURLs) {
//             //     let currentPromise = new Promise(async (resolve: Function) => {
//             //         if (galleryElm.getAttribute("reversed") == "true") {
//             //             galleryElm.prepend(await createVID(vid, respectiveIDs[i], saveMedia))
//             //         } else {
//             //             galleryElm.append(await createVID(vid, respectiveIDs[i], saveMedia))
//             //         }
//             //         resolve();
//             //     });
//             //     promiseMeTheFuckingImagesAreLoaded.push(currentPromise);
//             //     await currentPromise;
//             // }
//         }
//         await Promise.all(promiseMeTheFuckingImagesAreLoaded);
//         // Refresh gallery
//         refreshGallery();
//         // This is very important! Objects within mediaCollections don't trigger its built-in save! Only top-level objects do!
//         // With media2db we push the elements to mediaOrder, however as mediaOrders set() func sets the new data only for mediaCollection[id].data, the auto-save isn't triggered.
//         if (saveMedia) mediaCollectionsSave(); // Async won't fuck it up, because when the last element finishes, the newest state is saved.
//         // And remove the selection
//         resolve();
//     });
// }

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
// function getDontImportSubfolders(length: number) {
//     let ignoreDontImportSubfoldersFor = 0;
//     if (settings.dontImportSubfolders === true && length == 1) {
//         ignoreDontImportSubfoldersFor = 1;
//     }
//     return ignoreDontImportSubfoldersFor;
// }

// export {
//     mediaCollectionsSetToMediaOrder,
//     mediaCollectionsSave,
//     newCollection,
//     switchCollections,
//     updateMediaOrder,
//     deleteCollection,
//     mediaCollectionsSort,
//     mediaCollectionsSelectionCreation,
//     mediaCollections,
//     mediaOrder,
//     loadNewPics,
//     scanFiles,
//     getDontImportSubfolders
// }
// export type {
//     mediaCollection,
//     mediaOrderArray,
//     mediaCollectionsType,
//     mediaOrderObject 
// }