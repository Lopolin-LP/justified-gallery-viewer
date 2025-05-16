// https://stackoverflow.com/a/37860657
function reverseChildren(parent) {
    for (var i = 1; i < parent.childNodes.length; i++){
        parent.insertBefore(parent.childNodes[i], parent.firstChild);
    }
}
// http://stackoverflow.com/questions/805107/creating-multiline-strings-in-javascript
// function mlString(f) {
//     return f.toString().
//         replace(/^[^\/]+\/\*!?\r?/, '').
//         replace(/\*\/[^\/]+$/, '');
// }
function uuid(length) { /* https://stackoverflow.com/a/1349426 */
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
        counter += 1;
    }
    return result;
}
function uuidtime() {
    return uuid(16) + new Date().getTime();
}
function removeFromArray(arr, elm) {
    // Returns the cleaned array
    let i = arr.indexOf(elm);
    arr.splice(i, 1);
    return arr;
}
async function downloadURI(uri, name) { // https://stackoverflow.com/a/54626214
    if (!name) {
        if ((new URL(uri)).protocol === "blob:") {
            let blobby = await fetch(uri).then(r => r.blob());
            if (blobby.constructor == File) {
                name = blobby.name;
            } else {
                name = "Unnamed";
            }
        } else {
            name = "Unnamed";
        }
    }
    let link = document.createElement("a");
    link.download = name;
    link.href = uri;
    link.click();
}
function arrayInvertAxis(array) { // Self-made, not copied! You can steal it if you want to >:P
    // array: Array with arrays inside.
    // This "flips" their axis.
    let result = [];
    array.forEach((elm1, i1) => {
        elm1.forEach((elm2, i2) => {
            result[i2] = result[i2] ?? []; // If it's not there yet, set it
            result[i2][i1] = elm2;
        });
    })
    return result;
}
async function constructorPrototypeCopyNoReadOnly(obj) { // Copies object and makes it writable
    if (obj.__proto__ === ({}).__proto__) return obj; // if it's already an object, just return it
    let prototypes = [];
    let newobj = {};
    const callback = (item) => {
        prototypes.push(item);
    }
    async function constructorPrototypeCopyNoReadOnly_helper(obj, callback) {
        return await new Promise(async (resolve) => {
            if (!obj?.__proto__) {
                resolve();
                return;
            }
            Object.keys(obj.__proto__).forEach((val) => {
                callback(val);
            });
            if (!obj.__proto__) {
                resolve();
                return;
            }
            if (obj.__proto__.__proto__ !== obj.__proto__) {
                await constructorPrototypeCopyNoReadOnly_helper(obj.__proto__, callback);
                resolve();
            } else {
                resolve();
            }
        })
    }
    await constructorPrototypeCopyNoReadOnly_helper(obj, callback);
    prototypes.forEach((val) => {
        newobj[val] = obj[val];
    })
    return newobj;
}

// Confirmation Dialogs
function confirmation(msg, callback) {
    let popupid = uuidtime();
    let parent = document.createElement("div");
    parent.classList.add("confirmation");
    parent.id = popupid;
    let child = document.createElement("div");
    let alt_cancel = document.createElement("div");
    alt_cancel.classList.add("confirmation-bg-cancel");
    alt_cancel.onclick = ()=>{
        document.getElementById(popupid).remove();
    };

    let header = document.createElement("h1");
    header.innerHTML = msg;
    let cancel = document.createElement("button");
    cancel.innerText = "Cancel";
    cancel.classList.add("confirmation-cancel")
    cancel.onclick = ()=>{
        document.getElementById(popupid).remove();
    };
    let confirm = document.createElement("button");
    confirm.innerText = "Confirm";
    confirm.classList.add("confirmation-confirm")
    confirm.onclick = ()=>{
        callback();
        document.getElementById(popupid).remove();
    };

    child.append(header, cancel, confirm);
    parent.append(child, alt_cancel);
    document.body.append(parent);
}

// Manual Download
var manualdl = {
    init: function(url) {
        let id = uuidtime();
        let html = new DOMParser().parseFromString(`<div id="${id}" class="manualdl">
    <div>
        <div class="manualdl-instruction">
            <h1>Manually copy + paste this image.</h1>
            <div>
                <ol>
                    <li>Right Click Image</li>
                    <li>Pres copy image</li>
                    <li>Ctrl + V outside of it</li>
                </ol>
                <img src="./assets/how to import external link when cors is stupid.gif">
            </div>
        </div>
        <iframe class="manualdl-todo"></iframe>
        <button onclick="()=>{manualdl.exit('${id}')}" class="manualdl-exit">X</button>
    </div>
    <div onclick="()=>{manualdl.exit('${id}')}" class="manualdl-alt-exit"></div>
</div>`, "text/html").body.firstChild;
        let iframe = html.querySelector(".manualdl-todo");
        iframe.src = url;
        html.addEventListener("paste", (e) => {
            generalPastingMediaDealer(e);
            manualdl.exit(id);
        })
        html.querySelector(".manualdl-exit").addEventListener("click", ()=>{manualdl.exit(id)});
        html.querySelector(".manualdl-alt-exit").addEventListener("click", ()=>{manualdl.exit(id)});
        document.body.append(html);
        return id;
    },
    exit: function(id) {
        document.getElementById(id).remove();
    }
}

function getDataMediaId(node, returnNode=false) {
    let finalnode = undefined;
    if (node.querySelector("[data-media-id]") && node.querySelectorAll("[data-media-id]").length == 1) {
        finalnode = node.querySelector("[data-media-id]");
    } else if (node.getAttribute("data-media-id")) {
        finalnode = node;
    }
    if (returnNode) {
        return finalnode;
    }
    return finalnode ? finalnode.getAttribute("data-media-id") : null;
}

async function createIMG(blob, id=undefined, save=true) {
    // blob: image data
    // id: the ID as which the Media should be identified as.
    // save: if we should save the media to the DB. If an ID is given it will be saved with that ID.
    // console.log(blob, id, save);
    if (save) {
        if (id) {
            id = await media2db("img", blob, id); // media2db returns uuid
        } else {
            id = await media2db("img", blob);
        }
    }
    if (id === undefined) {
        throw new Error("ID cannot be undefined!");
    }
    let img_c = document.createElement("a");
    img_c.classList.add("image");

    let img = document.createElement("img");
    img.src = URL.createObjectURL(blob);
    img.setAttribute("data-media-id", id);
    
    let padder = document.createElement("i");
    
    img_c.appendChild(padder);
    img_c.appendChild(img);
    let solver = undefined;
    let onScrewed = function() { // because sometimes it doesn't want to decode
        solver();
        yeetMedia(id);
        return undefined;
    }
    await new Promise(resolve => {
        solver = resolve;
        img.onload = resolve; // wait for image to get attributes
        img.onerror = onScrewed;
        if (img.complete) {
            resolve();
        }
    });
    return img_c;
}
async function createVID(blob, id=undefined, save=true) { // dumbass look at this https://www.lightgalleryjs.com/demos/video-gallery/
    // blob: video data
    // id: the ID as which the Media should be identified as.
    // save: if we should save the media to the DB. If an ID is given it will be saved with that ID.
    if (save) {
        if (id) {
            id = await media2db("img", blob, id); // media2db returns uuid
        } else {
            id = await media2db("img", blob);
        }
    }
    if (id === undefined) {
        throw new Error("ID cannot be undefined!");
    }
    let vid_c = document.createElement("a");
    vid_c.classList.add("video");

    let vid = document.createElement("video");
    vid.setAttribute("controls", "");
    vid.setAttribute("data-media-id", id);

    let vid_s = document.createElement("source");
    vid_s.src = URL.createObjectURL(blob);
    vid_s.type = blob.type;

    let vid_x = document.createElement("div");
    vid_x.innerText = "X";
    vid_x.classList.add("closer");
    vid_x.onclick = function (e) {
        yeetMedia(e.target.parentElement.querySelector("video").getAttribute("data-media-id"));
    }

    let padder = document.createElement("i");

    vid.appendChild(vid_s);
    vid_c.appendChild(padder);
    vid_c.appendChild(vid);
    vid_c.appendChild(vid_x);
    let solver = undefined;
    let onScrewed = function() { // because sometimes it doesn't want to decode
        solver();
        yeetMedia(id);
        return undefined;
    }
    await new Promise(resolve => {
        solver = resolve;
        vid.onloadedmetadata = resolve;
        vid.onerror = onScrewed;
        vid_s.onerror = onScrewed;
        if (vid.readyState > 0) {
            resolve();
        }
    });
    return vid_c;
}

// because sometimes unexpected things happen
var importantLoadPromises = [];
var ILP_solver = {};
function addILP(codename) {
    // makes a new promise to be resolved later by something
    if (ILP_solver[codename]) {
        throw new Error("Codename already in use.");
    }
    prom = new Promise((resolve, reject) => {
        ILP_solver[codename] = {
            resolve: resolve,
            reject: reject
        }
    })
    importantLoadPromises.push(prom);
    return {promise: prom, solver: ILP_solver[codename]};
}
function solveILP(codename, isrejected=false) {
    // solve the promise, given you know its super secret codename
    if (isrejected == true) {
        ILP_solver[codename].reject();
    } else {
        ILP_solver[codename].resolve();
    }
}

function bytesToText(num, depth=0) {
    for (; String(Math.round(num)).length > 3 && depth < 5; depth++) {
        num /= 1024;
    }
    let append = "";
    switch (depth) {
        case 0:
            append = "B"
            break;
        case 1:
            append = "KB"
            break;
        case 2:
            append = "MB"
            break;
        case 3:
            append = "GB"
            break;
        case 4:
            append = "TB"
            break;
            
        default:
            append = "PB" // I think we're beyond reason now
            break;
    }
    // if (Math.round(num*10) != 10) append += "s"; // Used if text were "Megabyte" and stuff
    return num.toFixed(1) + " " + append;
}

async function updateStorageInfo() {
    // As we may call this in a function where we SHOULDN'T error, we'll play it safe.
    try {
        const result = await navigator.storage.estimate();
        document.getElementById("storageinfo").innerText = `${bytesToText(result.usage)} (${(result.usage/result.quota*100).toFixed(1)}%) / ${bytesToText(result.quota)}`;
    } catch (error) {
        console.error(error);
    }
}

// Image Database - https://dev.to/tqbit/how-to-use-indexeddb-to-store-images-and-other-files-in-your-browser-51fm
// https://www.javascripttutorial.net/web-apis/javascript-indexeddb/

function useImageDB(whenOpen) {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open('images', 1);
        request.onerror = (event) => {
            console.error(`Database error: ${event.target.errorCode, event}`);
            reject();
        };
    
        // initialize Database, when created for the first time
        request.onupgradeneeded = (event) => {
            let db = event.target.result;
    
            // create the saved object store 
            // with auto-increment id
            let store = [];
            ['img', 'vid'].forEach(type => {
                store.push(db.createObjectStore(type, {
                    autoIncrement: true
                }));
            })
    
            // create an index on the imgblob property
            store.forEach(st => {
                let index = st.createIndex('id', 'id', {
                    unique: true
                });
            })
            resolve();
        };
        
        request.onsuccess = (event) => {
            whenOpen(event);
            resolve();
            event.target.result.close();
        };
    })
};
(function(){
    // Init database
    useImageDB(()=>{});
})();

// Collections management
let LOCAL_FOR_OBJECT_ONLY_mediaCollections = JSON.parse(localStorage.getItem("mediaCollections")) ?? new Object();

let mediaCollections = new Proxy(LOCAL_FOR_OBJECT_ONLY_mediaCollections, {
    get(target, prop) {
        if (prop === "replaceObject") {
            // Provide a function to replace the underlying object
            return (newObject) => {
                // Clear the target object and copy newObject's contents
                for (let variableKey in target) {
                    if (target.hasOwnProperty(variableKey)){
                        delete target[variableKey];
                    }
                }
                for (let variableKey in newObject) {
                    target[variableKey] = newObject[variableKey];
                }
                LOCAL_FOR_OBJECT_ONLY_mediaCollections = newObject;
                // Sync with localStorage
                localStorage.setItem("mediaCollections", JSON.stringify(target));
            };
        }
        // Allow normal object-like behavior
        return Reflect.get(...arguments);
    },
    set(target, prop, value) {
        // console.log(target, prop, value)
        // Update the target object
        const result = Reflect.set(target, prop, value);
        // Sync with localStorage
        localStorage.setItem("mediaCollections", JSON.stringify(target));
        return result;
    },
    deleteProperty(target, prop) {
        const result = Reflect.deleteProperty(target, prop);
        localStorage.setItem("mediaCollections", JSON.stringify(target));
        return result;
    }
});
function mediaCollectionsSetToMediaOrder() {
    mediaCollections[mediaCollections.current].data = mediaOrder;
}
function mediaCollectionsSave() { // BECAUSE PROXY DOESN'T WORK ALL THE TIME QwQ
    // Sync with localStorage
    localStorage.setItem("mediaCollections", JSON.stringify(mediaCollections));
    console.debug("Manual Safe triggered");
}

function newCollection(name) {
    let id = uuidtime();
    mediaCollections[id] = {
        name: typeof name === "undefined" ? "Unnamed Collection " + id : name,
        data: []
    };
    mediaCollections.collections.push(id);
    return id;
}
function switchCollections(id, options={}) {
    const { dontreload = false } = options;
    mediaCollections.current = id;
    mediaOrder.replaceArray(mediaCollections[id].data);
    dontreload ? null : window.location.reload(true);
}
async function deleteCollection(id, deleteEntryToo=false) {
    // Delete the images in the DB
    await new Promise((resolve) => {
        yeetMediaCollection(id, resolve);
    });
    // Clean up entries
    if (deleteEntryToo) {
        mediaCollections.collections = removeFromArray(mediaCollections.collections, id);
        delete mediaCollections[mediaCollections.current];
    }
    // Remove last references
    mediaOrder.replaceArray([]);
    if (!deleteEntryToo) mediaCollectionsSetToMediaOrder();
    mediaCollectionsSave(); // Locked in with manual gear because the proxy just doesn't proxy
    // Reload
    window.location.reload();
}

// Saving the order of the images and videos
let LOCAL_FOR_ARRAY_ONLY_mediaOrder = JSON.parse(localStorage.getItem("mediaOrder")) ?? [];

let mediaOrder = new Proxy(LOCAL_FOR_ARRAY_ONLY_mediaOrder, {
    get(target, prop) {
        if (prop === "replaceArray") {
            // Provide a function to replace the underlying array
            return (newArray) => {
                if (!Array.isArray(newArray)) {
                    throw new TypeError("Expected an array");
                }
                // Clear the target array and copy newArray's contents
                target.length = 0;
                target.push(...newArray);
                // Sync with localStorage
                localStorage.setItem("mediaOrder", JSON.stringify(target));
            };
        }
        // Allow normal array-like behavior
        return Reflect.get(target, prop);
    },
    set(target, prop, value) {
        // Update the target array
        const result = Reflect.set(target, prop, value);
        // Update Collection
        mediaCollectionsSetToMediaOrder();
        // Sync with localStorage
        localStorage.setItem("mediaOrder", JSON.stringify(target));
        return result;
    }
});

// Alternative that ChatGPT gave me as well
// const mediaOrder = new Proxy(LOCAL_FOR_OBJECT_ONLY_mediaOrder, {
//     get(target, prop) {
//         return target[prop];
//     },
//     set(target, prop, value) {
//         target[prop] = value; // Update the target array
//         localStorage.setItem("mediaOrder", JSON.stringify(target)); // Sync with localStorage
//         return true; // Indicate success
//     },
//     apply(target, thisArg, argumentsList) {
//         Reflect.apply(target, thisArg, argumentsList);
//         localStorage.setItem("mediaOrder", JSON.stringify(target));
//     }
// });

// Setup for Collections
if (!("current" in mediaCollections)) {
    // If setting up for first time
    mediaCollections.collections = [];
    mediaCollections.current = newCollection("Default");
    console.log("Setup first collection");
    // Migrate old users - ToDo: REMOVE AFTER A WHILE
    if (mediaOrder.length !== 0) {
        mediaCollectionsSetToMediaOrder();
        mediaCollectionsSave();
        console.log("Migrating old user!");
    }
    switchCollections(mediaCollections.current, {dontreload: true});
} else if (!mediaCollections.collections.includes(mediaCollections.current)) {
    // If the current collection disappeared
    console.log("Last collection was invalid...");
    if (mediaCollections.collections.length == 0) {
        // ...and there aren't any others
        console.log("Making new one");
        switchCollections(newCollection("Default"), {dontreload: true});
    } else {
        // If there's still one left
        console.log("Fallback collection found");
        switchCollections(mediaCollections.collections[0], {dontreload: true});
    }
    // No need to reload, nothing is executing as the DOM is not loaded yet and this is the first code to not be a function definition
    mediaCollectionsSave(); // Handle weird edge cases
}

const mediaCollectionsSort = (a, b) => { // We only need to sort on reload of the page, it's not really necessary to save it after we change the name
    if (mediaCollections[a].name.toLocaleLowerCase() < mediaCollections[b].name.toLocaleLowerCase()) {
        return -1;
    } else if (mediaCollections[a].name.toLocaleLowerCase() > mediaCollections[b].name.toLocaleLowerCase()) {
        return 1;
    }
    return 0;
}

function mediaCollectionsSelectionCreation(selcol) {
    mediaCollections.collections.sort(mediaCollectionsSort);
    for (const id of mediaCollections.collections) {
        let opt = document.createElement("option");
        opt.value = id;
        opt.innerText = mediaCollections[id].name;
        if (id === mediaCollections.current) {
            opt.setAttribute("selected", "");
        }
        selcol.append(opt);
    }
}

// Setup UI for Collections
window.addEventListener("load", () => {
    // document.getElementById("collectionName").innerText = mediaCollections[mediaCollections.current].name;
    document.getElementById("changeCollectionName").value = mediaCollections[mediaCollections.current].name;
    document.getElementById("changeCollectionName").addEventListener("input", (e) => {
        mediaCollections[mediaCollections.current].name = e.target.value == "" ? "Unnamed Collection " + mediaCollections.current : e.target.value; // Save an unnamed variant, because no empty collection!
        mediaCollectionsSave();
        // document.getElementById("collectionName").innerText = e.target.value;
        document.querySelector("#selectCollection > option[value=\"" + mediaCollections.current + "\"]").innerText = e.target.value;
        mediaCollections.collections.sort(mediaCollectionsSort);
        document.getElementById("selectCollection").innerHTML = "";
        mediaCollectionsSelectionCreation(document.getElementById("selectCollection"));
    })
    // Give Collections as options
    let selcol = document.getElementById("selectCollection");
    mediaCollectionsSelectionCreation(selcol);
    selcol.addEventListener("change", (e) => {
        switchCollections(e.target.value);
    })
});

// DATABASE
async function media2db(type, imgblob, id=undefined) {
    // WARNING! Implement your own call to mediaCollectionsSave(), as mediaOrder.push(mediaID) WILL NOT trigger the save.
    let mediaID;
    let resolveIt = undefined;
    let rejectIt = undefined;
    let promising = new Promise((resolve, reject) => {
        resolveIt = resolve;
        rejectIt = reject;
    })
    let todo = function(e){
        let db = e.target.result;
        const trans = db.transaction(type, "readwrite");
        const store = trans.objectStore(type);
        mediaID = id ? String(id) : uuidtime();
        let query = store.put(imgblob, mediaID);
        mediaOrder.push(mediaID);
        // here would be a mediaCollectionsSave(), but JSON.parse is slow... luckily media2db is only used in create*() funcs, which are only used in the loadNewPics func, so we can simply implement the call there instead.
        // handle success case
        query.onsuccess = function (event) {
            resolveIt();
        };
    
        // handle the error case
        query.onerror = function (event) {
            console.error(event.target.errorCode);
            rejectIt();
        };
    }
    useImageDB(todo);
    await promising;
    updateStorageInfo();
    return mediaID;
}

async function grabMedia() {
    let mediaBlobs = {};
    const types = ["img", "vid"];
    let promises = {};
    let promises_arr = [];
    types.forEach(type => {
        let newprom = new Promise((resolve) => {promises[type] = resolve;});
        promises_arr.push(newprom);
    })
    let todo = async function(e){
        for (const type of types) {
            const typer = type; // Because it accidentally likes to replace itself lmao
            let db = e.target.result;
            const trans = db.transaction(typer, "readonly");
            const store = trans.objectStore(typer);
            theCursor = store.openCursor();
            theCursor.onsuccess = (event) => {
                let cursor = event.target.result;
                if (cursor) {
                    mediaBlobs[cursor.primaryKey] = cursor.value;
                    cursor.continue();
                } else {
                    promises[typer](); // Solve the promise when reaching the end
                }
            };
            theCursor.onerror = (event) => {
                promises[type]();
            }
        }
    }
    useImageDB(todo);
    await Promise.all(promises_arr); // i love code that's sonic
    return mediaBlobs;
}
async function yeetAllMedia(userOptions={}, whenDeleted=function(e){}) {
    return new Promise((resolve, reject) => {
        const { dontreload = false, onlyDeleteDB = false} = userOptions;
        // Delete Database
        const request = indexedDB.deleteDatabase('images');
        request.onerror = (event) => {
            console.error(`Database error: ${event.target.errorCode, event}`);
            reject();
        };
        request.onsuccess = (event) => {
            whenDeleted(event);
            resolve();
        };

        if (onlyDeleteDB != true) {
            // Delete Collections
            mediaCollections.replaceObject({});
    
            // Prevent entries from the now deleted database to be loaded
            localStorage.removeItem("mediaOrder");
        }

        // And free the RAM
        revokeAllOBJURLS()

        // Proceed to hell :3
        if (dontreload != true) {
            window.location.reload(true);
        }
    })
}

function revokeAllOBJURLS() {
    galleryElm.querySelectorAll("a:not(#placeholderImage) > img, a > video > source").forEach((elm) => {
        URL.revokeObjectURL(elm.src);
    })
}
window.addEventListener("beforeunload", (e) => {
    revokeAllOBJURLS();
})

var tempListOfYeetedMedia = [];
async function yeetMedia(ids, whenDeleted = function(e) {}) {
    // ids can be a single id (string) or an array of IDs
    ids = typeof ids !== "string" ? ids : Array(ids); // turn ID into array if string
    let ids_processed = ids.length;
    let listOfYeetedMedia = [];
    const promising = new Promise((resolve, reject) => {
        let types = ["img", "vid"];
        // let types_remaining = types.length;
        for (let i = 0; i < types.length; i++) {
            const type = types[i];
            let todo = function(event) {
                const db = event.target.result;
                const trans = db.transaction([type], 'readwrite');
                const store = trans.objectStore(type);
                ids.forEach(id => {
                    const cursor = store.openCursor(IDBKeyRange.only(id));
                    cursor.onsuccess = (event) => {
                        const cursor = event.target.result;
                        if (cursor) {
                            cursor.delete(cursor.primaryKey);
                            cursor.continue();
                        } else {
                            // Remove the media ID from the mediaOrder array
                            if (!listOfYeetedMedia.includes(id)) { // Only when we actually finished them all
                                listOfYeetedMedia.push(id);
                                ids_processed -= 1;
                                mediaOrder.replaceArray(mediaOrder.filter(mId => mId !== id));
                                let elm = document.querySelector(`[data-media-id=\"${id}\"]`);
                                try {
                                    URL.revokeObjectURL(elm.src);
                                } catch (error) {
                                    console.log("whoops, seems like the object wasn't ever a url!", error);
                                }
                                try {
                                    elm.parentElement.remove(); // yeet it from zhe dom
                                } catch (error) {
                                    console.log("whoops, seems like the object wasn't ever in the dom!", error);
                                }
                                if (ids_processed == 0) {
                                    refreshGallery();
                                    // Notify about deletion
                                    whenDeleted();
                                    resolve();
                                }
                            }
                        }
                    }
                    cursor.onerror = (event) => {
                        console.error("Database entry deletion failed:", event.target.errorCode);
                        reject();
                    }
                });
            };
            useImageDB(todo);
        }
    });
    promising.finally(() => {
        // Add the deleted IDs to the bunch
        // Why can't we directly add it to tempListOfYeetedMedia? Well, if an image of a collection was already deleted,
        // and we then try to delete the entire collection, we get an already deleted id. It assumes we already deleted it,
        // as it is in tempListOfYeetedMedia, and doesn't decrease ids_processed, leaving the promise to be never fulfilled, nor rejected.
        tempListOfYeetedMedia.push(...listOfYeetedMedia.filter(v => !tempListOfYeetedMedia.includes(v)));
    });
    return promising;
}

async function yeetMediaCollection(idOfCollection, callback=function(){}) {
    let ids = mediaCollections[idOfCollection].data;
    let othercallback;
    let otherpromise = new Promise(resolve => {othercallback = resolve});
    yeetMedia(ids, othercallback)
    await otherpromise;
    callback();
    return ids;
}

// FOLDER_CONTENTS_ARRAY = mlString(FOLDER_CONTENTS).match(/.*[^\r\n|\n]/gm);
var galleryElm, viewer, dragulaGallery, dragulaDragging, viewerAmIcurrentlyBeingResizedCuzIfNotImmaRescale;
var viewerIsFooterShown = false;
addILP("viewerCompletion");

function resizeViewerSetup(thisVar) {
    // Make transitions less shit
    thisVar.viewer.viewer.addEventListener('pointerdown', (event) => {
        thisVar.viewer.image.classList.remove("viewer-special-transition");
    })
    thisVar.viewer.viewer.addEventListener('pointerup', (event) => {
        thisVar.viewer.image.classList.add("viewer-special-transition");
    })
}
async function resizeViewer(thisVar) {
    if (!thisVar.viewer.isShown) {
        return;
    }
    thisVar.viewer.image.classList.remove("viewer-special-transition");
    let footer_no_title_height, image_height, image_width, screen_height, screen_width, scale_to_width, scale_to_height, zoomy;
    if (viewerIsFooterShown == true) {
        footer_no_title_height = thisVar.viewer.footer.clientHeight - thisVar.viewer.footer.querySelector(".viewer-title").clientHeight;
        image_height = thisVar.viewer.image.naturalHeight;
        image_width = thisVar.viewer.image.naturalWidth;
        screen_height = thisVar.viewer.viewer.clientHeight - (footer_no_title_height*2);
        screen_width = thisVar.viewer.viewer.clientWidth;
        scale_to_width = screen_width/image_width;
        scale_to_height = screen_height/image_height;
        zoomy = scale_to_height;
    } else {
        image_height = thisVar.viewer.image.naturalHeight;
        image_width = thisVar.viewer.image.naturalWidth;
        screen_height = thisVar.viewer.viewer.clientHeight;
        screen_width = thisVar.viewer.viewer.clientWidth;
        scale_to_width = screen_width/image_width;
        scale_to_height = screen_height/image_height;
        zoomy = scale_to_height;
    }
    if (scale_to_width < scale_to_height) {
        zoomy = scale_to_width;
    }
    thisVar.viewer.zoomTo(zoomy);
    // Change to Element size, as we now deal with the positioning, not the zoom.
    image_height = thisVar.viewer.image.height;
    image_width = thisVar.viewer.image.width;
    if (viewerIsFooterShown == true) {
        thisVar.viewer.move(0, thisVar.viewer.footer.querySelector(".viewer-title").clientHeight);
    } else {
        thisVar.viewer.moveTo((screen_width-image_width)/2, (screen_height-image_height)/2);
    }
    // Give it time to render
    setTimeout(() => {
        thisVar.viewer.image.classList.add("viewer-special-transition");
    }, 100);
}

function createGalleryViewer() { // look into other viewers: https://www.reddit.com/r/webdev/comments/15c1xvc/whats_your_goto_gallerylightbox_library/
    return new Viewer(galleryElm, {
        transition: false,
        tooltip: false,
        slideOnTouch: false, // Allow mobile users to move images
        ready() {
            let beMyGuest = this;
            window.addEventListener("resize", ()=>{
                clearTimeout(viewerAmIcurrentlyBeingResizedCuzIfNotImmaRescale);
                viewerAmIcurrentlyBeingResizedCuzIfNotImmaRescale = setTimeout(()=>{
                    resizeViewer(beMyGuest);
                }, 100)
            });
            resizeViewerSetup(this);
        },
        shown() {
            if (document.querySelector("#contextmenu.visible")) {
                viewer.hide();
            }
        },
        viewed() {
            resizeViewer(this);
        }
    });
}
function updateMediaOrder() {
    let newOrder = []
    for (const image of galleryElm.children) {
        newOrder.push(image.querySelector("img, video").getAttribute("data-media-id"));
    }
    if (galleryElm.getAttribute("reversed") == "true") {
        newOrder.reverse();
    }
    mediaOrder.replaceArray(newOrder);
    mediaCollectionsSave();
    return newOrder;
}
const manualOpenNavbar = {
    t: function () {
        if (manualOpenNavbar.c()) {
            document.querySelector("nav").classList.remove("active");
        } else {
            document.querySelector("nav").classList.add("active");
        }
    },
    c: function () {
        return document.querySelector("nav").classList.contains("active");
    },
    s: function (val) {
        val ? document.querySelector("nav").classList.add("active") : document.querySelector("nav").classList.remove("active");
    }
}
// Auto close Navbar
window.addEventListener("mouseup", (e) => {
    if (!document.querySelector("nav").contains(e.target) && document.querySelector("nav").classList.contains("active")) manualOpenNavbar.s(false);
});

// Important first loads
window.addEventListener("load", async () => {
    galleryElm = document.getElementById("gallery");
    // Legacy code for loading images
    // FOLDER_CONTENTS_ARRAY.forEach(item => {
    //     document.querySelector("main").appendChild(createIMG("./album/" + item));
    // });
    // let thegallery = $("#gallery");
    viewer = createGalleryViewer();
    solveILP("viewerCompletion");
    // Load images saved in database
    let allMedia = await grabMedia();
    let mediaOrdered = undefined;
    if (jQuery.isEmptyObject(allMedia)) {
        // In case no images exist
        mediaOrdered = [];
    } else {
        mediaOrdered = mediaOrder.map((id) => allMedia[id]);
    }
    // mediaOrdered = await grabMedia().then((obj) => {
    //     console.log(obj);
    //     return mediaOrder.map(id => obj[id]);
    // });
    loadNewPics(mediaOrdered, false, mediaOrder); // now that's some funky syntax!
    // Dragula
    dragulaDragging = false;
    dragulaGallery = dragula([galleryElm],{
        moves: function() {
            return settings.editorMode;
        }
    });
    dragulaGallery.on("drop", ()=>{
        updateMediaOrder();
        refreshGallery();
    });
    dragulaGallery.on("drag", (el)=>{
        // Ignore any errors caused by extremely quick cancelling. 
        if (document.querySelector("#contextmenu.visible")) {
            // dragulaGallery.cancel();
            // console.info("%cIgnore \"Uncaught TypeError: e is null\" thrown by Dragula, it's a harmless bug.\n%cSee https://github.com/bevacqua/dragula/issues/275", "font-size: 2em; color: #af1c1c; background: #000", "")
            // return false;
            closeContextMenuHelper(el);
        }
        let mmm = getDataMediaId(el);
        if (mmm) { // NOTE: Most likely legacy code, as we switched from deleting images on hold to show the context menu
            if (tempListOfYeetedMedia.includes(mmm)) {
                dragulaGallery.cancel();
                return false;
            }
        }
        dragulaDragging = true;
    });
    dragulaGallery.on("dragend", ()=>{
        dragulaDragging = false;
    });
    // Browser Information
    document.getElementById("browserinfo").innerText = `${navigator.userAgent}`;
    updateStorageInfo();
});
var mediaSizesStylesheet = document.head.appendChild(document.createElement("style"));
function resetMediaSizes(resetInlineStyles=false) { // https://github.com/xieranmaya/blog/issues/6
    let copyOfGalleryChildren = galleryElm.children; // just in case the children change in the middle of this
    let styleContent = "";
    if (settings.oldMediaHoverReorderingBehaviour) { // Written this way so we only check this once; idk if this complicated mess is worth the overhead saved
        function createEntry(i, width, grow, padding) {
            copyOfGalleryChildren[i].style.width = `${width}px`;
            copyOfGalleryChildren[i].style.flexGrow = `${grow}`;
            copyOfGalleryChildren[i].querySelector("i").style.paddingBottom = `${padding*100}%`;
        }
    } else {
        function createEntry(i, width, grow, ratioH) {
            styleContent += `#gallery > :nth-child(${i+1}) { width: ${width}px; flex-grow: ${grow}; i { padding-bottom: ${ratioH*100}%; } }\n`;
        }
    }
    for (let i = 0; i < copyOfGalleryChildren.length; i++) {
        let media = copyOfGalleryChildren[i];
        
        let mediaWidth, mediaHeight;
        // let padder = media.querySelector("i");
        let imgElm = media.querySelector("img");
        let vidElm = media.querySelector("video");
        if (imgElm) {
            mediaWidth = imgElm.naturalWidth;
            mediaHeight = imgElm.naturalHeight;
        } else if (vidElm) {
            mediaWidth = vidElm.videoWidth;
            mediaHeight = vidElm.videoHeight;
        } else {
            throw new Error("NEITHER IMAGE NOR VIDEO, CRASHING...", media);
        }
        let elmWidth = mediaWidth * settings.rowHeight / mediaHeight;
        createEntry(i, elmWidth, elmWidth, mediaHeight / mediaWidth);
    }
    mediaSizesStylesheet.innerText = styleContent;
    if (resetInlineStyles) {
        for (let media of copyOfGalleryChildren) {
            // media.style.removeProperty("width");
            // media.style.removeProperty("flex-grow");
            // media.style.removeProperty("aspect-ratio");
            // media.querySelector("i").style.removeProperty("padding-bottomw");
            // This is the weirdest bug I've seen: trying to remove all the properties above like that makes the padding be the height of the image, while when we remove the style attribute entirely (instead of leaving it empty) the image respects the height imposed by the padding. WHY?!
            media.removeAttribute("style");
            media.querySelector("i").removeAttribute("style");
        }
    }
}
async function refreshGallery() {
    await Promise.all(importantLoadPromises);
    function actualRefresh() {
        // Actually refreshing the gallery
        resetMediaSizes();
        viewer.update();
    }
    let waitWithRefresh = false;
    // Placeholder stuff
    if (galleryElm.childElementCount !== 1 && document.getElementById("placeholderImage")) {
        document.getElementById("placeholderImage").remove();
    }
    if (galleryElm.childElementCount === 0 && !document.getElementById("placeholderImage")) {
        waitWithRefresh = true;
        galleryElm.prepend(new DOMParser().parseFromString(`<a id="placeholderImage" class="image"><i></i><img src="placeholder.svg"></a>`, "text/html").body.firstChild);
        let img = document.getElementById("placeholderImage").querySelector("img");
        if (img.complete) {
            actualRefresh();
        } else {
            img.addEventListener('load', function() {
                actualRefresh();
            })
            img.addEventListener('error', function(e) {
                console.error(e);
                actualRefresh();
            })
        }
    }
    if (!waitWithRefresh) {
        actualRefresh();
    }
}

// Settings management
let LOCAL_FOR_OBJECT_ONLY_settings = JSON.parse(localStorage.getItem("settings")) ?? new Object();

let settings = new Proxy(LOCAL_FOR_OBJECT_ONLY_settings, {
    get(target, prop) {
        if (prop === "replaceObject") {
            // Provide a function to replace the underlying object
            return (newObject) => {
                // Clear the target object and copy newObject's contents
                for (let variableKey in target) {
                    if (target.hasOwnProperty(variableKey)){
                        delete target[variableKey];
                    }
                }
                for (let variableKey in newObject) {
                    target[variableKey] = newObject[variableKey];
                }
                LOCAL_FOR_OBJECT_ONLY_settings = newObject;
                // Sync with localStorage
                localStorage.setItem("settings", JSON.stringify(target));
            };
        }
        // Allow normal object-like behavior
        return Reflect.get(...arguments);
    },
    set(target, prop, value) {
        // console.log(target, prop, value)
        // Update the target object
        const result = Reflect.set(target, prop, value);
        // Sync with localStorage
        localStorage.setItem("settings", JSON.stringify(target));
        return result;
    }
    // Note: Implementation of "deleteProperty" is not necessary, because we don't delete settings.
});
addILP("loadingSettings");
const settings_valid = ["rowHeight", "bgColor", "bgColor-txt", "textColor", "textColor-txt", "imgMargin", "imgReverse", "zoomRatio", "mouseActionDelay",
    "accentColor", "accentColor-txt", /*"disableFullscreenB",*/ "kivbbo", "dontImportSubfolders", "editorMode", "oldMediaHoverReorderingBehaviour", "emergencyURL",
    "emergencyTitle", "emergencyIcon", "emergencyOverride", "widthForFill", "emergencyContextmenu", "rtlGallery"];
const settings_no_display_val = ["imgReverse", /*"disableFullscreenB",*/ "kivbbo", "dontImportSubfolders", "editorMode", "oldMediaHoverReorderingBehaviour", "emergencyURL",
    "emergencyTitle", "emergencyIcon", "emergencyOverride", "emergencyContextmenu", "rtlGallery"];
let settings_first_load = true;
async function reloadSettings() {
    haveWeFinishedProcessingYet = [];
    // Specific fixes for some settings
    // galleryElm.children[0].setAttribute("data-first", "");
    // load all settings
    settings_valid.forEach((id) => {
        haveWeFinishedProcessingYet.push(new Promise((resolve) => {
            try {
                let elm = document.getElementById(id);
                let elmType = elm.getAttribute("type");
                // when a different value is used instead of value
                let valToCheckTMP = "value";
                if (elmType == "checkbox") {
                    valToCheckTMP = "checked";
                }
                const valToCheck = valToCheckTMP;
                // When the value has to be processed a bit
                let doFunction = function (e) {
                    settingsDo(id, e.target[valToCheck]);
                }
                if (id.match(/(accent|text|bg)color(-txt|)/gi)) {
                    doFunction = function (e) {
                        settingsDo(id, standardize_color(e.target[valToCheck]));
                    }
                }
                settings_first_load ? elm.addEventListener("input", doFunction) : null;
                // set settings
                // document.getElementById(id).dispatchEvent(new InputEvent("input"));
                settingsDo(id, elm[valToCheck], {load: true, elm: elm, elmValToCheck: valToCheck});
                resolve();
            } catch (error) {
                console.error(error);
                resolve();
            }
        }));
    });
    await Promise.all(haveWeFinishedProcessingYet);
    if (settings_first_load) {
        solveILP("loadingSettings");
        settings_first_load = false;
    }
}
window.addEventListener("load", () => {
    reloadSettings();
});
function settingsDo(id, val, options={load: false, otherAttr: undefined, elm: undefined, elmValToCheck: undefined}) {
    // some patches
    let settingid = id.replace("-txt", "")
    // Save or Load it
    if (options.load === true) {
        val = settings[settingid] ?? val; // In case it hasn't been saved before, use default
        // Make UI respect the saved settings
        if (options.elm && options.elmValToCheck) {
            options.elm[options.elmValToCheck] = val;
        }
    }
    settings[settingid] = val;
    // console.log(val, id, settings[id]);
    changeSetting(id, val);
    updateVal(id, val, options.otherAttr);
}
function settingsReset() {
    settings.replaceObject({});
    window.location.reload(true); // -> needs true because FIREFOX
}
function updateVal(id, val, otherAttr) {
    try {
        if (settings_no_display_val.includes(id)) { // Blacklist options who don't display their value
            return;
        }
        otherAttr = otherAttr ?? "name";
        elm = document.getElementById(id);
        elmName = elm.getAttribute("name");
        status_elm = elm.parentElement.querySelector(`.input-value[data-value-of="${elmName}"]`);
        status_name = status_elm.tagName.toLowerCase();
        // Depending on what type of element we're dealing with it's different
        if (status_name == "input") {
            status_elm.value = val;
        } else {
            status_elm.innerText = val;
        }
    } catch (error) {
        console.log(error);
    }
}
async function changeSetting(id, val) {
    switch (id) {
        case "rowHeight":
            resetMediaSizes();
            break;
        case "bgColor":
        case "bgColor-txt":
        case "textColor":
        case "textColor-txt":
        case "accentColor":
        case "accentColor-txt":
            colorFunc(id, val);
            break;
        case "imgMargin":
            document.body.style.setProperty("--mediaMargin", `${val*0.5}px`) // Because they don't overlap it's halved
            break;
        case "imgReverse":
            // I DON'T KNOW WHY THIS WORKS
            if ((val == false && galleryElm.getAttribute("reversed") == "true") || (val == true && galleryElm.getAttribute("reversed") != "true")) {
                reverseChildren(galleryElm);
                refreshGallery();
            }
            if (val == true) {
                galleryElm.setAttribute("reversed", "true");
            } else if (val == false) {
                galleryElm.removeAttribute("reversed");
            }
            break;
        // case "disableFullscreenB":
        //     if (val == true) {
        //         document.documentElement.style.setProperty("--fsb-display", "none");
        //     } else if (val == false) {
        //         document.documentElement.style.setProperty("--fsb-display", "inline-block");
        //     }
        //     break;
        case "kivbbo":
            if (val == false) {
                document.documentElement.style.setProperty("--viewer-footer-not-on-hover-opacity", "0");
                document.documentElement.style.setProperty("--viewer-footer-transition", "opacity 0.3s ease-in-out");
                document.documentElement.style.setProperty("--viewer-footer-translation-of-backdrop", "0 100%");
                viewerIsFooterShown = false;
            } else if (val == true) {
                document.documentElement.style.setProperty("--viewer-footer-not-on-hover-opacity", "1");
                document.documentElement.style.setProperty("--viewer-footer-transition", "unset");
                document.documentElement.style.setProperty("--viewer-footer-translation-of-backdrop", "0 0");
                viewerIsFooterShown = true;
            }
            break;
        case "zoomRatio":
            await Promise.all(importantLoadPromises);
            viewer.options.zoomRatio = val;
            break;
        case "mouseActionDelay":
            mouseActionDelay = Number(val);
            break;
        case "dontImportSubfolders":
            dontImportSubfolders = val; // LEGACY CODE - ToDo: use settings.dontImportSubfolders instead
            break;
        case "editorMode":
            let editorModeToggledEvent = new Event("editorModeToggled");
            editorModeToggledEvent.status = val;
            window.dispatchEvent(editorModeToggledEvent);
            break;
        case "oldMediaHoverReorderingBehaviour":
            mediaSizesStylesheet.sheet.disabled = val;
            resetMediaSizes(!val);
            break;
        case "emergencyURL":
        case "emergencyTitle":
        case "emergencyIcon":
        case "emergencyOverride":
        case "emergencyContextmenu":
            break;
        case "widthForFill":
            document.body.style.setProperty("--minWidthAfterGallery", `${val}%`) // Because they don't overlap it's halved
            break;
        case "rtlGallery":
            galleryElm.style.flexDirection = val ? "row-reverse" : "row";
            break;
    
        default:
            console.warn("uknown id for settings:", id);
            break;
    }
}

function standardize_color(str){ // https://stackoverflow.com/a/47355187
    var ctx = document.createElement("canvas").getContext("2d");
    ctx.fillStyle = str;
    return ctx.fillStyle;
}
function colorFunc(which, val) {
    if (which.includes("bgColor")) {
        document.documentElement.style.setProperty("--bg-user", val);
        document.querySelector("meta[name='theme-color']").content = val;
    }
    if (which.includes("textColor")) {
        document.documentElement.style.setProperty("--text-user", val);
    }
    if (which.includes("accentColor")) {
        document.documentElement.style.setProperty("--accent-user", val);
    }
    if (which.includes("txt")) {
        whichElmVal = document.getElementById(which).value;
        // if (whichElmVal[0] != "#") {
        //     // console.log(which);
        //     document.getElementById(which).value = "#" + val;
        // }
    }
}

// File picker: If ctrl, then use dir
function toggleFilePickerDir(e) {
    attrs = ["webkitdirectory", "directory"];
    if (e.key == "Control" && e.type == "keydown") {
        attrs.forEach(attr => {
            document.getElementById("filePicker").setAttribute(attr, "");
        });
    } else if (e.type == "keyup") {
        attrs.forEach(attr => {
            document.getElementById("filePicker").removeAttribute(attr);
        });
    }
}
window.addEventListener("load", () => {
    document.body.addEventListener("keydown", (e) => {toggleFilePickerDir(e)});
    document.body.addEventListener("keyup", (e) => {toggleFilePickerDir(e)});
})

// Adding new images
function loadNewPics(fileListToProcess=undefined, saveMedia=true, respectiveIDs=[]) {
    // fileListToProcess: Array of Files
    // saveMedia: If brand new entries should be created in the DB
    // respectiveIDs: The IDs given to the files, both at the same index. Used when adding a picture to the gallery that is already in the DB
    // addToDBbyID: ...except when that previous statement isn't true and we want to add them to the DB using the given IDs
    return new Promise(async (resolve, reject) => {
        if (!fileListToProcess) {
            console.warn("loadNewPics was supplied with no file list, skipping...");
            fileListToProcess = [];
            reject();
        }
        let promiseMeTheFuckingImagesAreLoaded = [];
        for (let i = 0; i < fileListToProcess.length; i++) { // so we can use respectiveIDs
            let currentFile = fileListToProcess[i];
            if (currentFile === undefined) { // In case the file went missing from the database
                mediaOrder.replaceArray(mediaOrder.filter((faultyId) => faultyId != respectiveIDs[i]));
                console.log("faulty image!: ", respectiveIDs[i]);
                continue;
            }
            if (currentFile.type === "") { // the .file() method of FileSystemFileEntry doesn't create a damn type!
                currentFile = new File([currentFile], currentFile.name, { lastModified: currentFile.lastModified, type: zip.getMimeType(currentFile.name) });
            }
            let imgBlobs = []; // Contains only one blob if it's not a zip
            if (currentFile.type.match(/(image|video)\//)) {
                imgBlobs.push(currentFile);
            } else if (currentFile.type.match(/application\/(x-zip-compressed|zip)/g)) {
                // Deal with ZIP
                let reader = new zip.ZipReader(new zip.BlobReader(currentFile));
                zipFiles = await reader.getEntries({"utf-8":""});
                async function zipJSgetFile(item) {
                    blobby = await item.getData(new zip.BlobWriter());
                    blobby = new File([blobby], item.filename, {type: blobby_type}); // recreate cuz zip.js stupid
                    return blobby;
                }
                for await (let item of zipFiles) {
                    blobby_type = zip.getMimeType(item.filename);
                    if (!blobby_type.match(/(image|video)\//)) {
                        if (blobby_type.match(/application\/(x-zip-compressed|zip)/g)) {
                            await loadNewPics([await zipJSgetFile(item)]);
                        }
                    } else {
                        imgBlobs.push(await zipJSgetFile(item));
                    }
                }
            }
            // Required vars here are: imgBlobs
            let imgURLs = [];
            let videoURLs = [];
            for await (const blobby of imgBlobs) {
                if (blobby.type.includes("image/")) {
                    imgURLs.push(blobby);
                } else if (blobby.type.includes("video/")) {
                    videoURLs.push(blobby);
                }
            }
            for (const img of imgURLs) {
                let currentPromise = new Promise(async (resolve) => {
                    if (galleryElm.getAttribute("reversed") == "true") {
                        galleryElm.prepend(await createIMG(img, respectiveIDs[i], saveMedia));
                    } else {
                        galleryElm.append(await createIMG(img, respectiveIDs[i], saveMedia));
                    }
                    resolve();
                });
                promiseMeTheFuckingImagesAreLoaded.push(currentPromise);
                await currentPromise;
            }
            for (const vid of videoURLs) {
                let currentPromise = new Promise(async (resolve) => {
                    if (galleryElm.getAttribute("reversed") == "true") {
                        galleryElm.prepend(await createVID(vid, respectiveIDs[i], saveMedia))
                    } else {
                        galleryElm.append(await createVID(vid, respectiveIDs[i], saveMedia))
                    }
                    resolve();
                });
                promiseMeTheFuckingImagesAreLoaded.push(currentPromise);
                await currentPromise;
            }
        }
        await Promise.all(promiseMeTheFuckingImagesAreLoaded);
        // Refresh gallery
        refreshGallery();
        // This is very important! Objects within mediaCollections don't trigger its built-in save! Only top-level objects do!
        // With media2db we push the elements to mediaOrder, however as mediaOrders set() func sets the new data only for mediaCollection[id].data, the auto-save isn't triggered.
        if (saveMedia) mediaCollectionsSave(); // Async won't fuck it up, because when the last element finishes, the newest state is saved.
        // And remove the selection
        resolve();
    });
}

var dontImportSubfolders = false;
async function scanFiles(item, callback, ignoreDontImportSubfoldersFor=0) {
    // item type: DataTransferItem
    // Scan folders, callback if not directory anymore.
    // returns a promise
    // https://developer.mozilla.org/en-US/docs/Web/API/DataTransferItem/webkitGetAsEntry
    if (item === null) {
        return;
    }
    return new Promise(async (resolveThisShit) => { 
        if (item.isDirectory && (dontImportSubfolders === false || ignoreDontImportSubfoldersFor > 0)) {
            let directoryReader = item.createReader();
            directoryReader.readEntries(async (entries) => {
                for (let entry of entries) {
                    await scanFiles(entry, callback, ignoreDontImportSubfoldersFor-1); // wait for the inner children to fix themselves
                }
                resolveThisShit();
            });
        } else if (item.isDirectory == false) {
            let file = await new Promise((resolve, reject) => item.file(resolve, reject)); // this has to be a promise
            await callback(file);
            resolveThisShit();
            // let promising = new Promise((resolve) => { // this doesn't
            //     callback(new Blob([file], {type: zip.getMimeType(item.name)})); // Okay so apparently I have trust issues with the data I'm given... so I create a new File
            //     resolve();
            // });
            // promising.then(() => {resolveThisShit()});
        } else {
            resolveThisShit();
        }
    })
}
function getDontImportSubfolders(length) {
    let ignoreDontImportSubfoldersFor = 0;
    if (dontImportSubfolders === true && length == 1) {
        ignoreDontImportSubfoldersFor = 1;
    }
    return ignoreDontImportSubfoldersFor;
}
async function generalPastingMediaDealer(e) {
    if (e.target.nodeName.toLowerCase() == "input") { // allow pasting when applicable
        return;
    }
    e.stopPropagation();
    e.preventDefault();
    let promising = [];
    let listOfFiles = [];
    let addFilesArray = function(item) {
        listOfFiles.push(item);
    }
    for (let item of Object.values(e.clipboardData.items)) {
        // console.log(item);
        promising.push(scanFiles(item.webkitGetAsEntry(), addFilesArray, getDontImportSubfolders(e.clipboardData.items.length)));
    }
    await Promise.all(promising);
    loadNewPics(listOfFiles);
}
window.addEventListener("load", () => {
    let filePicker = document.getElementById("filePicker");
    filePicker.addEventListener("change", async () => {
        loadNewPics(Object.values(filePicker.files)); // Wrapped in Object.values due to CHROME
        filePicker.value = "";
    })
    if (filePicker.files.length != 0) {
        filePicker.dispatchEvent(new Event("change"));
    }
    document.body.addEventListener("dragover", (e) => {
        e.preventDefault();
    })
    document.body.addEventListener("paste", async (e) => {
        generalPastingMediaDealer(e);
    })
    document.body.addEventListener("drop", async (e) => {
        e.preventDefault();
        let listOfFiles = [];
        let addFilesArray = function(item) {
            listOfFiles.push(item);
        }
        let promising = [];
        let currentUrlBeingProcessed = "";
        async function getImageOnline(url, resolve) {
            if (!(url.startsWith("http://") || url.startsWith("https://")) || currentUrlBeingProcessed == url) {
                resolve();
                return;
            }
            currentUrlBeingProcessed = url;
            let xhr = new XMLHttpRequest();
            xhr.open("GET", url, true);
            // xhr.withCredentials = true; // I seriously don't know if this makes things worse or better q-q
            xhr.responseType = "blob";
            xhr.onload = function() {
                if (xhr.status === 200) {
                    addFilesArray(xhr.response);
                    resolve();
                } else {
                    console.error("Something went wrong trying to fetch this image (Post Download)!", xhr.status, xhr, url);
                    manualdl.init(url);
                    resolve();
                }
            }
            xhr.onerror = function() {
                console.error("Something went wrong trying to fetch this image (While sending request)!", xhr.status, xhr, url);
                manualdl.init(url);
                resolve();
            }
            xhr.send();
        }
        if (e.dataTransfer.items.length == 1) {
            if (e.dataTransfer.items[0].kind == "file") {
                if (e.dataTransfer.items[0].getAsFile().name.endsWith(".jgvdb")) {
                    jgvdb.import(e.dataTransfer.items[0].getAsFile());
                    return; // end early
                }
            }
        }
        for (let item of Object.values(e.dataTransfer.items)) { // ToDo: Change to .files
            // console.log(item)
            if (item.kind == "file") {
                promising.push(scanFiles(item.webkitGetAsEntry(), addFilesArray, getDontImportSubfolders(e.dataTransfer.items.length)));
            } else if (item.kind == "string" && (item.type == "text/x-moz-url" || item.type == "text/uri-list")) {
                let resolveItHere = undefined;
                promising.push(new Promise(resolve => {resolveItHere = resolve}));
                let promising_the_second = [];
                item.getAsString(async (urllist) => {
                    for (let url of urllist.split("\n")) {
                        promising_the_second.push(new Promise(async resolve => {getImageOnline(url, resolve);}));
                    }
                    await Promise.all(promising_the_second);
                    resolveItHere();
                });
            }
        }
        await Promise.all(promising); // otherwise shit will execute too fast
        loadNewPics(listOfFiles);
    })

    // Reordering images https://github.com/bevacqua/dragula
})

// Offset from original start
let interesting = 0;
class offsetFromOrigin {
    func (e) {
        this.absx ??= e.screenX;
        this.absy ??= e.screenY;
        this.x = e.screenX;
        this.y = e.screenY;
    }
    funcTouch (e) {
        this.absx ??= e.touches[0].screenX;
        this.absy ??= e.touches[0].screenY;
        this.x = e.touches[0].screenX;
        this.y = e.touches[0].screenY;
    }
    constructor(origin=null, touch=false) {
        this.elm = origin ? origin : document.body;
        this.x = 0;
        this.y = 0;
        this.absx = null;
        this.absy = null;
        this.i = interesting;
        interesting++;
        this.touch = touch;
        if (this.touch) {
            this.elm.addEventListener("touchmove", this.funcTouch.bind(this));
        } else {
            this.elm.addEventListener("pointermove", this.func.bind(this));
        }
        return this;
    }
    stop() {
        try {
            if (this.touch) {
                this.elm.removeEventListener("touchmove", this.funcTouch.bind(this));
            } else {
                this.elm.removeEventListener("pointermove", this.func.bind(this));
            }
        } catch (e) {}
        return {x: this.x, y: this.y};
    }
}

// Context Menu Popup
var mouseActionDelay = 300;
var ignoreContextMenuCancelOnce = false;
mouseActionLastMovement = undefined;
// var galleryMouseRelevant = undefined;
window.addEventListener("load", async () => { // https://stackoverflow.com/a/27403353
    await Promise.all(importantLoadPromises);
    var mouseTimer;
    var lastDown = 0; // use performance.now() for comparison
    function mouseDown(e, elm=null) { 
        // console.log(e);
        if (lastDown > performance.now() - 300) return;
        lastDown = performance.now();
        if (e.button === 1) { // On middle click
            e.preventDefault();
            execMouseDown(e);
            return;
        }
        mouseActionLastMovement = new offsetFromOrigin(elm ?? null, e.type.includes("touch"));
        mouseTimer = window.setTimeout(()=>{execMouseDown(e)},mouseActionDelay); //set timeout to fire in 300ms when the user presses mouse button down
    }
    
    function mouseUp(e) { 
        // console.log(e);
        if (mouseTimer) {
            window.clearTimeout(mouseTimer)
            mouseTimer = undefined; //cancel timer when mouse button is released
        }
        if (mouseActionLastMovement) {
            mouseActionLastMovement.stop();
            mouseActionLastMovement = undefined;
        }
    }
    
    async function execMouseDown(e) {
        if (/*settings.editorMode === false || */dragulaDragging === true || e.button == 2) {
            return;
        }
        if (e.button == 1) {
            if (e.target !== galleryElm && galleryElm.contains(e.target) && e.target.querySelector("[data-media-id]")) {
                yeetID = e.target.querySelector("[data-media-id]").getAttribute("data-media-id");
                if (yeetID) {
                    yeetMedia(yeetID);
                }
            }
            return;
        }
        if (zoomPincher.moved) return;
        if (distanceBetweenPoints([mouseActionLastMovement.absx, mouseActionLastMovement.absy], [mouseActionLastMovement.x, mouseActionLastMovement.y]) > 5) return;
        let eventobj = await constructorPrototypeCopyNoReadOnly(e);
        let vent = new PointerEvent("contextmenu", eventobj);
        e.target.dispatchEvent(vent);
    }
    async function touchToPointer(evt) {
        const evtCopy = await constructorPrototypeCopyNoReadOnly(evt);
        const evtTouchCopy = await constructorPrototypeCopyNoReadOnly(evtCopy.changedTouches[0]);
        return Object.assign(evtCopy, evtTouchCopy);
    }
    galleryElm.addEventListener("mousedown", e => {
        ignoreContextMenuCancelOnce = false; // It HAS to be false
        mouseDown(e);
    });
    galleryElm.addEventListener("touchstart", async e => {
        ignoreContextMenuCancelOnce = true; // It HAS to be true
        mouseDown(await touchToPointer(e));
    });
    document.body.addEventListener("mouseup", mouseUp);  //listen for mouse up event on body, not just the element you originally clicked on
    document.body.addEventListener("touchend", async e => mouseUp(await touchToPointer(e)));  //listen for mouse up event on body, not just the element you originally clicked on
    document.body.addEventListener("dragend", mouseUp);  //listen for mouse up event on body, not just the element you originally clicked on
})

// Fullscreen mode
var ourFullscreen = false; // Is our fullscreen active? - KeyF
var ourHiding = false; // Is our hiding active? - KeyH
function toggleFullscreenGallery(options = {}) { // Equivalent to {toggle:toggle=true, noFullscreen:noFullscreen=false}
    // Note: This function is using a lot of logic with bools. Be careful.
    const {toggle = true, noFullscreen = false} = options;
    const areWeAlreadyFullscreen = !!document.fullscreenElement;
    // console.log("\n")
    // console.log(ourFullscreen, ourHiding, areWeAlreadyFullscreen, noFullscreen, toggle)
    // Fullscreen Function Because ViewerJS has their own Fullscreen
    if (!noFullscreen) {
        if (areWeAlreadyFullscreen) {
            document.exitFullscreen();
        } else {
            document.documentElement.requestFullscreen().catch(err => {
                // In case ESC is used instead of F
                ourFullscreen = false;
                document.documentElement.classList.remove("fullscreen");
            })
        }
    }
    // Toggle Fullscreen Class in (non-)fullscreen mode
    if (!areWeAlreadyFullscreen || !noFullscreen) { // When in hiding mode OR when we aren't already fullscreen:
        if (document.documentElement.classList.contains("fullscreen")) {
            document.documentElement.classList.remove("fullscreen");
        } else if (!ourHiding) {
            document.documentElement.classList.add("fullscreen");
        }
        // Edge case: Switching from hiding to fullscreen
        if (!document.documentElement.classList.contains("fullscreen") && ourHiding && !noFullscreen) {
            // IF: we don't have the fullscreen class anymore (removed in if-statement earlier), Hiding mode is active and we are toggling fullscreen (not hiding mode)
            document.documentElement.classList.add("fullscreen");
            ourHiding = false; // Disable hiding mode
        }
    }
    // No extra function for Fullscreen without hiding elements needed, browser F11 can do that as well.
    // keep track if our fullscreen is active or not
    if (!noFullscreen && toggle) {
        ourFullscreen = !ourFullscreen;
    }
    if (noFullscreen && !areWeAlreadyFullscreen && toggle) {
        ourHiding = !ourHiding;
    }
    // console.log(ourFullscreen, ourHiding, areWeAlreadyFullscreen)
}
function executeEmergency() {
    // Emergency mode!
    // console.log(e);
    if (!settings.emergencyOverride) {
        // Quick! Hide it all!
        window.open(settings.emergencyURL, "_blank");
        // Change tab appearance
        let currentURL = new URL(window.location);
        currentURL.searchParams.set("iconurl", settings.emergencyIcon);
        currentURL.searchParams.set("title", settings.emergencyTitle);
        window.history.pushState({}, "", currentURL);
        switchCollections(newCollection());
    } else {
        window.location.replace(settings.emergencyURL);
    }
}
window.addEventListener("load", async () => {
    await Promise.all(importantLoadPromises);
    document.body.addEventListener("keydown", (e) => {
        // console.log(e)
        if (e.code === "KeyF" && !(e.ctrlKey || e.shiftKey || e.altKey || e.metaKey) && e.target.getAttribute("type") != "text") { // Prevent Fullscreen on typing text
            toggleFullscreenGallery();
            // console.log(e);
        }
        if (e.code === "KeyH" && !(e.ctrlKey || e.shiftKey || e.altKey || e.metaKey) && e.target.getAttribute("type") != "text") { // Prevent Fullscreen on typing text
            toggleFullscreenGallery({noFullscreen: true});
            // console.log(e);
        }
        if (e.code === "KeyU" && !(e.ctrlKey || e.shiftKey || e.altKey || e.metaKey) && e.target.getAttribute("type") != "text") {
            executeEmergency();
        }
    });
    // In case we get interrupted - i.e. pressing ViewerJS's slideshow
    document.addEventListener('fullscreenchange', exitHandler, false);
    function exitHandler() {
        if (!document.fullscreenElement && ourFullscreen == true) {
            toggleFullscreenGallery({toggle: false});
        }
    }
    document.body.addEventListener("mousemove", (e) => dragHelper(e));
    document.body.addEventListener("touchmove", (e) => dragHelper(e));
    function dragHelper(e) {
        let screenHeight = window.screen.availHeight;
        let draggedAtY;
        if ("touches" in e) {
            draggedAtY = e.touches[0].clientY;
        } else {
            draggedAtY = e.clientY;
        }
        let draggedAtFlippedY = screenHeight - draggedAtY;
        if (document.querySelector(".gu-transit")) {
            if (draggedAtFlippedY < screenHeight*0.1+64) { // Add 64px because SOMEHOW IT'S OFFSCREEN AT THE BOTTOM OF THE SCREEN OF MY PHONE WHAT THE F-
                let percentage = ((screenHeight*0.1+64) - (draggedAtFlippedY))/100;
                let toScroll = (screenHeight*0.1)*percentage;
                window.scrollBy(0, toScroll);
            } else if (draggedAtY < screenHeight*0.1) {
                let percentage = (screenHeight*0.1 - (draggedAtY))/100;
                let toScroll = screenHeight*0.1*percentage;
                window.scrollBy(0, -toScroll);
            }
        }
    }
    // Load custom icon if asked to
    let customIconURL = new URLSearchParams(window.location.search).get("iconurl");
    if (customIconURL !== null) {
        document.querySelectorAll("head link[rel*='icon']").forEach(item => {
            item.href = customIconURL;
        });
    }
    let titleURL = new URLSearchParams(window.location.search).get("title");
    if (titleURL !== null) {
        document.querySelector("head title").innerText = titleURL;
    }
})

// Manage Editing Mode
window.addEventListener("editorModeToggled", function(e){
    if (e.status == true) {
        document.body.classList.add("editorMode");
    } else {
        document.body.classList.remove("editorMode");
    }
})

function toggleEmergencySettings() {
    let emergency = document.getElementById("emergencySettings");
    if (emergency.classList.contains("visible")) {
        emergency.classList.remove("visible");
    } else {
        emergency.classList.add("visible");
    }
}

// Exporting & Importing
var localStoragesToExport = ["mediaOrder", "mediaCollections", "settings"];

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

var jgvdb = {
    import: async (inputFileList) => { // Import, automatically dealing with the unzipping process and delegating it to the correct importer
        let file;
        if (inputFileList instanceof Blob) {
            file = inputFileList;
        } else if (inputFileList instanceof FileList || inputFileList instanceof Array) {
            file = inputFileList[0];
        } else {
            throw new Error("Supplied jgvdb file is not: Blob/File, FileList or Array. Cannot cope, must die.");
        }
        let imp = await (new zip.ZipReader(new zip.BlobReader(file))).getEntries();
        let properFiles = [];
        let conf = undefined;
        for (let i = 0; i < imp.length; i++) {
            const zipJSblob = imp[i];
            if (zipJSblob.filename == "conf.json") {
                conf = JSON.parse(await zipJSblob.getData(new zip.TextWriter()));
                continue;
            }
            let [idname, ...filename] = zipJSblob.filename.split("__");
            filename = filename.join("__");
            // console.log(idname, filename)
            properFiles.push([idname, new File([await zipJSblob.getData(new zip.BlobWriter())], filename, { type: zip.getMimeType(zipJSblob.filename), lastModified: zipJSblob.lastModDate })]);
        }
        // let conf = JSON.parse(properFiles.filter(obj => {return obj.name == "conf.json"})[0]);
        switch (conf.type) {
            case 0:
                confirmation(`You're importing a Database. This will OVERWRITE and <span style='color: red;'>DELETE EVERYTHING.</span> Are you sure you want to continue?
<br><label for="doSettingsImport">Import Settings?</label><input name="doSettingsImport" type="checkbox" checked>`, ()=>{
                    let doSettingsImport = true;
                    let doSettingsImportElm = document.querySelector("input[name=\"doSettingsImport\"]");
                    if (doSettingsImportElm) doSettingsImport = doSettingsImportElm.checked ?? doSettingsImport;
                    jgvdb.db.import(conf, properFiles, doSettingsImport);
                });
                break;
            case 1:
                jgvdb.mc.import(conf, properFiles);
                break;
            case 2:
                confirmation("This will overwrite your current settings. Are you sure?", ()=>{jgvdb.sg.import(conf);});
                break;
        
            default:
                break;
        }
    },
    export: async (type, info=undefined) => {
        switch (type) {
            case 0:
                jgvdb.f.download(await jgvdb.db.export(), "Database");
                break;
            case 1:
                jgvdb.f.download(await jgvdb.mc.export(info), mediaCollections[info].name);
                break;
            case 2:
                jgvdb.f.download(await jgvdb.sg.export(), "Settings");
                break;
            case 3:
                downloadURI(URL.createObjectURL(await jgvdb.rm.export(info)), mediaCollections[info].name + ".zip");
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
                version: jgvdb.v.version,
                data: jgvdb.f.exportlocalstorage()
            };
            const media = await grabMedia();
            let themedia = [];
            Object.keys(media).forEach(key => {
                themedia.push({name: key + "__" + media[key].name, data: media[key] });
            });
            themedia.push({name: "conf.json", data: JSON.stringify(conf)});
            return await jgvdb.f.makezip(themedia);
        },
        import: async (conf, files, importSettings=true) => {
            await yeetAllMedia({dontreload: true, onlyDeleteDB: true});
            // Loading Media
            await jgvdb.f.importmedia(files);
            // Setup LocalStorage - Overwriting currently available data
            if (!importSettings) conf.data = Object.keys(conf.data).reduce((p, c) => {if (c !== "settings") p[c] = conf.data[c]; return p;}, {});
            jgvdb.f.importlocalstorage(conf.data);
            // Proceeed with finishing import.
            window.location.reload();
        }
    },
    mc: { // Media Collection
        export: async (id) => {
            let allMedia = await grabMedia();
            let mediaExport = [];
            let conf = {
                type: 1,
                version: jgvdb.v.version,
                data: mediaCollections[id]
            };
            for (let i = 0; i < mediaCollections[id].data.length; i++) {
                const elmid = mediaCollections[id].data[i];
                const elm = allMedia[elmid];
                mediaExport.push({name: elmid + "__" + elm.name, data: elm});
            }
            mediaExport.push({name: "conf.json", data: JSON.stringify(conf)});
            return await jgvdb.f.makezip(mediaExport);
        },
        import: async (conf, files) => {
            // files should not contain conf.json
            switchCollections(newCollection(conf.data.name), {dontreload: true});
            // Change IDs to eliminate possible conflicts.
            let oldIdToNewId = new Map();
            files = files.map(([oldId, file]) => {
                const newId = uuidtime();
                oldIdToNewId[oldId] = newId;
                return [newId, file];
            });
            conf.data.data = conf.data.data.map(id => oldIdToNewId[id]);
            // Add images
            await jgvdb.f.importmedia(files);
            mediaOrder.replaceArray(conf.data.data);
            mediaCollectionsSave();
            window.location.reload(true);
        }
    },
    sg: { // Settings
        export: async () => {
            let conf = {
                type: 2,
                version: jgvdb.v.version,
                data: settings
            };
            return await jgvdb.f.makezip([{name: "conf.json", data: JSON.stringify(conf)}]);
        },
        import: (conf) => {
            settings.replaceObject(conf.data);
            reloadSettings();
        }
    },
    rm: { // Raw Media of Collection
        export: async (id) => {
            const allMedia = await grabMedia();
            let mediaExport = [];
            mediaCollections[id].data.forEach(item => {
                mediaExport.push({name: allMedia[item].name, data: allMedia[item]});
            });
            return await jgvdb.f.makezip(mediaExport);
        }
    },
    f: { // Functions
        id: () => { return uuid(4) + "-"},
        download: (blob, name=undefined) => {
            if (!name) {
                name = "Untitled Download.jgvdb";
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
                let item = files[i];
                // https://stackoverflow.com/a/45664645
                // If you want ONLY files, use item.constructor == File
                if (item.data instanceof Blob) { // True for both Blobs and Files
                    item.datazip = new zip.BlobReader(item.data);
                    if (!item.name && !item.data.name) { // If there's absolutely no way I can get the name
                        console.warn("No filename supplied! Continuing without file");
                        continue;
                    }
                    item.name = item.name ?? item.data.name;
                    // item.type = item.type ?? (item.data.type ?? zip.getMimeType(item.name));
                    item.lastModified = item.lastModified ?? (item.data.lastModified ?? new Date());
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
                async function attemptWrite(actualFilename) {
                    await writer.add(actualFilename, item.datazip, { lastModDate: new Date(item.lastModified) });
                }
                attemptWrite(item.name).catch(async (firstR) => {
                    // Catches if something went wrong
                    if (firstR.message.includes("File already exists")) {
                        // If duplicate file issue, handle it here
                        const THEfilename = item.name;
                        let finished = false;
                        for (let attempts = 1; (attempts < 10000 && !finished); attempts++) {
                            await new Promise((resolve) => {
                                let test = attemptWrite(jgvdb.f.properFileNameAppending(THEfilename, attempts));
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
            Object.keys(confdata).forEach(entry => {
                localStorage.setItem(entry, confdata[entry]);
            });
            return;
        },
        exportlocalstorage: () => {
            let result = {};
            localStoragesToExport.forEach(item => {
                result[item] = localStorage.getItem(item);
            });
            return result;
        }
    },
    v: { // Variables
        version: 0
    }
}
window.addEventListener("load", () => {
    document.getElementById("importingFile").addEventListener("change", (e) => {
        jgvdb.import(e.target.files);
        e.target.value = "";
    });
});

// Downloading Media
function getBlobURIfromElement(elm) {
    let link = "";
    if (elm.nodeName == "A") {
        link = elm.querySelector("img, source").src;
    } else if (elm.nodeName == "IMG") {
        link = elm.src;
    } else if (elm.nodeName == "VIDEO") {
        link = elm.querySelector("source").src;
    }
    if (link !== "") {
        return link;
    }
}
async function dlMedia(elm, grabbedMedia) {
    if (elm instanceof HTMLElement) {
        downloadURI(getBlobURIfromElement(elm));
    } else if (typeof elm == "string") {
        let media = grabbedMedia ?? await grabMedia();
        downloadURI(media[elm]);
    } else if (elm instanceof Array) {
        let media = grabbedMedia ?? await grabMedia();
        elm.forEach(async item => {
            dlMedia(item, media);
        })
    }
}

// Custom Context Menu
function contextMenu(buttons, e) {
    // buttons is an Array with Objects. Here's a rundown:
    /* {
        text: "Text HTML containing the visible text"
        callback: js function to be executed
        disabled: if it's disabled or not
        style: inline style of button
    } */
   return new Promise(resolve => {
        e.preventDefault();
        e.stopImmediatePropagation();
        let contextmenu = document.getElementById("contextmenu");
        if (e.target == contextmenu || contextmenu.contains(e.target)) return;
        contextmenu.innerHTML = "";
        // Add buttons
        for (let i = 0; i < buttons.length; i++) {
            const button = buttons[i];
            if (Object.keys(button).length == 0) continue;
            let html = document.createElement("button");
            html.type = "button";
            html.addEventListener("click", button.callback);
            html.addEventListener("click", closeContextMenu);
            html.innerHTML = button.text;
            html.style = button.style ?? "";
            button.class ? html.setAttribute("class", button.class) : null;
            button.disabled ? html.setAttribute("disabled", "") : null;
            document.getElementById("contextmenu").append(html);
        }
        // Set position
        contextmenu.classList.add("visible");
        let posX = e.clientX + document.documentElement.scrollLeft;
        let posY = e.clientY + document.documentElement.scrollTop;
        let screenX = document.documentElement.scrollLeft + document.documentElement.clientWidth;
        let screenY = document.documentElement.scrollTop + document.documentElement.clientHeight;
        if (posX + contextmenu.clientWidth > screenX) {
            contextmenu.style.left = (screenX - contextmenu.clientWidth - 8) + "px";
        } else {
            contextmenu.style.left = posX + "px";
        }
        if (posY + contextmenu.clientHeight > screenY) {
            contextmenu.style.top = (screenY - contextmenu.clientHeight - 8) + "px";
        } else {
            contextmenu.style.top = posY + "px";
        }
        // Add ghost button for keyboard users
        let ghost = document.createElement("button");
        ghost.classList.add("ghost-button");
        document.getElementById("contextmenu").prepend(ghost);
        contextmenu.querySelector(":first-child").focus();
        resolve();
    });
}

function closeContextMenuHelper(el=null) {
    if (!document.getElementById("contextmenu").contains(el)) {
        closeContextMenu();
    }
}
function closeContextMenu() {
    if (ignoreContextMenuCancelOnce) return (ignoreContextMenuCancelOnce = false);
    document.getElementById("contextmenu").classList.remove("visible");
}

function makeThumbnail(raw) { //https://stackoverflow.com/a/29806483 | https://jsfiddle.net/giu_do/e98tffu6/
    return new Promise((resolve, reject) => {
        let node = getDataMediaId(raw, true);
        if (!node) {
            reject();
        }
        let ratio = node.clientWidth / node.clientHeight;
        let width = 512;
        let height = width/ratio;
        let ctx = document.createElement("canvas");
        ctx.setAttribute("width", width);
        ctx.setAttribute("height", height);
        ctx.getContext("2d").filter = `blur(${width*0.05}px)`;
        ctx.getContext("2d").drawImage(node, 0, 0, width, height);
        ctx.getContext("2d").canvas.toBlob(blob => resolve(URL.createObjectURL(blob)), "image/jpeg", 0.75);
    });
}

document.addEventListener("contextmenu", (e) => {
    if (
        (e.target.nodeName == "IMG" && document.body.classList.contains("viewer-open")) || 
        (e.target.nodeName == "VIDEO" && document.fullscreenElement == e.target)
    ) { // If fullscreen video
        return;
    }
    const conf_context = {
        fullscreen: {text: ourFullscreen ? "Exit Fullscreen" : "Fullscreen", callback: ()=>{toggleFullscreenGallery();}},
        hide: {text: ourHiding ? "Show UI" : "Hide UI", callback: ()=>{toggleFullscreenGallery({noFullscreen: true});}, disabled: ourFullscreen},
        nav: () => {
            if (document.documentElement.classList.contains("fullscreen")) {
                return {text: `${manualOpenNavbar.c() ? "Close" : "Open"} Navbar`, callback: manualOpenNavbar.c() ? ()=>{manualOpenNavbar.s(false)} : ()=>{manualOpenNavbar.s(true)}}; // we need to preallocate if it's going to enable or close it because of other event listener closing the navbar
            } else {
                return {};
            }
        },
        emergency: () => {
            if (settings.emergencyContextmenu) {
                return {text: "Emergency Mode", callback: ()=>{executeEmergency()}};
            } else {
                return {};
            }
        },
        close: {text: "<div style='text-align:center;height:0.5em;line-height:0.5em;'>×</div>", callback: () => {closeContextMenu()}}
    };
    if (galleryElm.contains(e.target) && galleryElm !== e.target && getDataMediaId(e.target)) {
        // Gallery Context Menu
        e.preventDefault();
        e.stopImmediatePropagation();
        let comebackto = uuidtime();
        let config = [
            {text: "Download", callback: ()=>{dlMedia(e.target);}, class: "download "+comebackto, style: ""},
            {text: "Delete", callback: ()=>{yeetMedia(getDataMediaId(e.target));}},
            conf_context.fullscreen,
            conf_context.hide,
            conf_context.nav(),
            conf_context.emergency(),
            conf_context.close
        ]
        let promise = contextMenu(config, e);
        (async () => {
            try {
                // Overengineered speed
                let pic = await makeThumbnail(e.target);
                await promise;
                document.querySelector("[class*=\""+comebackto+"\"]").style = `background: url(${pic}) 50% 50% / cover, var(--dl-bg);`;
            } catch (error) {
                if (!(error instanceof DOMException)) {
                    console.error(error);
                }
            }
        })();
    } else {
        // Everywhere else
        let config = [
            conf_context.fullscreen,
            conf_context.hide,
            conf_context.nav(),
            conf_context.emergency(),
            conf_context.close
        ];
        contextMenu(config, e);
    }
});
window.addEventListener("load", ()=>{
    document.body.addEventListener("mousedown", (e) => closeContextMenuHelper(e.target));
    document.body.addEventListener("drag", (e) => closeContextMenuHelper(e.target));
    document.body.addEventListener("touchstart", (e) => closeContextMenuHelper(e.target));
    window.addEventListener("resize", () => closeContextMenuHelper());
});
window.addEventListener("keydown", (e) => {
    if (e.code == "Escape") {
        closeContextMenu();
    }
    if (document.getElementById("contextmenu").contains(e.target)) {
        if (e.code == "ArrowDown" || e.code == "ArrowRight" || e.code == "ArrowUp" || e.code == "ArrowLeft") {
            const upwards = e.code == "ArrowUp" || e.code == "ArrowLeft";
            const parent = e.target.parentElement; // upon deletion, these attributes return null
            const firstorlast = upwards ? parent.lastChild : parent.firstChild;
            const sibling = upwards ? e.target.previousSibling : e.target.nextSibling;
            const ghost = document.querySelector("#contextmenu .ghost-button");
            ghost ? ghost.remove() : null;
            if (sibling == null) {
                firstorlast.focus();
            } else {
                sibling.focus();
            }
            e.preventDefault();
        }
    }
});

// Allow Pinch for zoom
let zoomPincher = {
    prevdiff: 0, // previous difference calculated every single move
    cache: [], // cache of at least two fingers
    build: 0, // buildup of differences until a threshold
    lasttap: -1000, // latest touch event was fired
    moved: false, // if during the tapping there was a movement fired at least once
    maxtouches: 0 // how many touches there were before the end
}
function distanceBetweenPoints([pointAX, pointAY], [pointBX, pointBY]) {
    return Math.abs(
        Math.sqrt(
            (pointAX - pointBX)**2 +
            (pointAY - pointBY)**2
        )
    )
}
const zoomPincherConditionToCancel = (e) => {return e.pointerType != "touch" || settings.editorMode == true;}
window.addEventListener("load", () => { // https://developer.mozilla.org/en-US/docs/Web/API/Pointer_events/Pinch_zoom_gestures
    function newTouch(e) {
        if (zoomPincherConditionToCancel(e)) return;
        zoomPincher.cache.push(e);
        zoomPincher.lasttap = performance.now();
        zoomPincher.maxtouches = zoomPincher.maxtouches < zoomPincher.cache.length ? zoomPincher.cache.length : zoomPincher.maxtouches;
    }
    function moveTouch(e) {
        if (zoomPincherConditionToCancel(e)) return;
        zoomPincher.moved = true;
        const pointerIdIndex = zoomPincher.cache.findIndex((x) => x.pointerId == e.pointerId);
        zoomPincher.cache[pointerIdIndex] = e;
        if (zoomPincher.cache.length === 2 && (
            galleryElm.contains(e.target) || document.querySelector("nav").contains(e.target) || document.querySelector("body > section").contains(e.target)
        )) {
            // The distance between the two
            const newdiff = distanceBetweenPoints(
                [zoomPincher.cache[0].clientX, zoomPincher.cache[0].clientY],
                [zoomPincher.cache[1].clientX, zoomPincher.cache[1].clientY]
            )
            if (zoomPincher.prevdiff != 0) zoomPincher.build += newdiff - zoomPincher.prevdiff
            if (Math.abs(zoomPincher.build) > 10) { // 10 because that's the steps of it
                const rowdiff = zoomPincher.build > 0 ? 10 : -10;
                zoomPincher.build -= rowdiff;
                const rownum = Number(document.getElementById("rowHeight").value) + rowdiff;
                if (Number(document.getElementById("rowHeight").min) <= rownum && rownum <= Number(document.getElementById("rowHeight").max)) {
                    document.getElementById("rowHeight").value = rownum;
                    settingsDo("rowHeight", rownum);
                }
            }
            zoomPincher.prevdiff = newdiff;
        }
    }
    function endTouch(e) {
        if (zoomPincherConditionToCancel(e) || zoomPincher.cache.findIndex((x) => x.pointerId === e.pointerId) == -1) return; // make sure we only execute once instead of SIX TIMES.
        zoomPincher.cache.splice(zoomPincher.cache.findIndex((x) => x.pointerId == e.pointerId), 1);
        if (zoomPincher.cache.length < 2) zoomPincher.prevdiff = 0;
        if (zoomPincher.cache.length === 0 && zoomPincher.maxtouches == 2 && zoomPincher.moved == false && performance.now() - zoomPincher.lasttap <= mouseActionDelay) {
            (async () => {
                e.target.dispatchEvent(new PointerEvent("contextmenu", await constructorPrototypeCopyNoReadOnly(e)));
            })();
        }
        if (zoomPincher.cache.length === 0) { zoomPincher.moved = false; zoomPincher.maxtouches = 0 }
    }
    document.body.addEventListener("pointerdown", newTouch);
    document.body.addEventListener("pointermove", moveTouch);
    document.body.addEventListener("pointerup", endTouch);
    document.body.addEventListener("pointercancel", endTouch);
    document.body.addEventListener("pointerout", endTouch);
    document.body.addEventListener("pointerleave", endTouch);
});