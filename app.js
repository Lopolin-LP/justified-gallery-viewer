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

async function createIMG(blob, id, save=true) {
    let img_c = document.createElement("a");
    img_c.classList.add("image");

    let img = document.createElement("img");
    img.src = URL.createObjectURL(blob);
    id = save ? await media2db("img", blob) : id; // media2db returns uuid
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
async function createVID(blob, id, save=true) { // dumbass look at this https://www.lightgalleryjs.com/demos/video-gallery/
    let vid_c = document.createElement("a");
    vid_c.classList.add("video");

    let vid = document.createElement("video");
    vid.setAttribute("controls", "")
    id = save ? await media2db("vid", blob) : id;
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
    }
});
function mediaCollectionsSave() { // BECAUSE PROXY DOESN'T WORK ALL THE TIME QwQ
    // Sync with localStorage
    localStorage.setItem("mediaCollections", JSON.stringify(mediaCollections));
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
function switchCollections(id) {
    mediaCollections.current = id;
    mediaOrder.replaceArray(mediaCollections[id].data);
    window.location.reload(true);
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
    // Reload
    window.location.reload();
}

// Saving the order of the images and videos
let LOCAL_FOR_OBJECT_ONLY_mediaOrder = JSON.parse(localStorage.getItem("mediaOrder")) ?? [];

let mediaOrder = new Proxy(LOCAL_FOR_OBJECT_ONLY_mediaOrder, {
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
        mediaCollections[mediaCollections.current].data = target;
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
        mediaCollections[mediaCollections.current].data = mediaOrder;
        mediaCollectionsSave();
        console.log("Migrating old user!")
    }
    switchCollections(mediaCollections.current);
} else if (!mediaCollections.collections.includes(mediaCollections.current)) {
    // If the last current collection disappeared
    console.log("Last collection was invalid...");
    if (mediaCollections.collections.length == 0) {
        // If it was the last one to be deleted
        delete mediaCollections.current;
        console.log("No collection found");
    } else {
        // If there's still one left
        console.log("Fallback collection found");
        switchCollections(mediaCollections.collections[0]);
    }
    // Reload to apply changes
    mediaCollectionsSave(); // Handle weird edge cases
    window.location.reload(true);
}

// Setup UI for Collections
window.addEventListener("load", () => {
    document.getElementById("collectionName").innerText = mediaCollections[mediaCollections.current].name;
    document.getElementById("changeCollectionName").value = mediaCollections[mediaCollections.current].name;
    document.getElementById("changeCollectionName").addEventListener("input", (e) => {
        mediaCollections[mediaCollections.current].name = e.target.value;
        mediaCollectionsSave();
        document.getElementById("collectionName").innerText = e.target.value;
    })
    // Give Collections as options
    let selcol = document.getElementById("selectCollection");
    for (id of mediaCollections.collections) {
        let opt = document.createElement("option");
        opt.value = id;
        opt.innerText = mediaCollections[id].name;
        if (id === mediaCollections.current) {
            opt.setAttribute("selected", "");
        }
        selcol.append(opt);
    }
    selcol.addEventListener("change", (e) => {
        switchCollections(e.target.value);
    })
});

// DATABASE
async function media2db(type, imgblob) {
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
        mediaID = uuidtime()
        let query = store.put(imgblob, mediaID);
        mediaOrder.push(mediaID);
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
    return mediaID;
}

async function grabMedia() {
    let mediaBlobs = {};
    finishedPartOne = undefined;
    types = ["img", "vid"];
    let promises = {};
    let promises_arr = [];
    types.forEach(type => {
        newprom = new Promise((resolve) => {promises[type] = resolve;});
        promises_arr.push(newprom);
    })
    let todo = async function(e){
        for (type of types) {
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
async function yeetAllMedia(whenDeleted=function(e){}) {
    return new Promise((resolve, reject) => {
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

        // Delete Collections
        mediaCollections.replaceObject({});

        // Prevent entries from the now deleted database to be loaded
        localStorage.removeItem("mediaOrder");

        // And free the RAM
        revokeAllOBJURLS()

        // Proceed to hell :3
        window.location.reload();        
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
async function yeetMedia(id, whenDeleted = function(e) {}) {
    tempListOfYeetedMedia.push(id);
    return new Promise((resolve, reject) => {
        let types = ["img", "vid"];
        let types_remaining = types.length;
        for (let i = 0; i < types.length; i++) {
            const type = types[i];
            let todo = function(event) {
                const db = event.target.result;
                const trans = db.transaction([type], 'readwrite');
                const store = trans.objectStore(type);
                const cursor = store.openCursor(IDBKeyRange.only(id));
                cursor.onsuccess = (event) => {
                    const cursor = event.target.result;
                    if (cursor) {
                        cursor.delete(cursor.primaryKey);
                        cursor.continue();
                    } else {
                        // Remove the media ID from the mediaOrder array
                        mediaOrder.replaceArray(mediaOrder.filter(mId => mId !== id));
                        types_remaining -= 1;
                        if (types_remaining == 0) { // Only when we actually finished them all
                            let elm = document.querySelector(`[data-media-id=\"${id}\"]`);
                            try {
                                URL.revokeObjectURL(elm.src);
                            } catch (error) {
                                console.log("whoops, seems like the object wasn't ever a url!", error);
                            }
                            try {
                                elm.parentElement.remove(); // yeet it from zhe dom
                            } catch (error) {
                                console.log("whoops, seems like the object wasn't ever a in the dom!", error);
                            }
                            refreshGallery();
                            // Notify about deletion
                            whenDeleted();
                            resolve();
                        }
                    }
                }
                cursor.onerror = (event) => {
                    console.error("Database entry deletion failed:", event.target.errorCode);
                    reject();
                }
            };
            useImageDB(todo);
        }
    });
}

async function yeetMediaCollection(idOfCollection, callback=function(){}) {
    let promisesOfDeletion = [];
    let ids = mediaCollections[idOfCollection].data;
    for (id of ids) {
        let resolving;
        promisesOfDeletion.push(new Promise(resolve => {
            resolving = resolve;
        }))
        yeetMedia(id, resolving);
    }
    Promise.all(promisesOfDeletion);
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
        viewed() {
            resizeViewer(this);
        }
    });
}
function updateMediaOrder() {
    let newOrder = []
    for (image of galleryElm.children) {
        newOrder.push(image.querySelector("img, video").getAttribute("data-media-id"));
    }
    if (galleryElm.getAttribute("reversed") == "true") {
        newOrder.reverse();
    }
    mediaOrder.replaceArray(newOrder);
    return newOrder;
}
lePromise = window.addEventListener("load", async () => {
    galleryElm = document.getElementById("gallery");
    // Legacy code for loading images
    // FOLDER_CONTENTS_ARRAY.forEach(item => {
    //     document.querySelector("main").appendChild(createIMG("./album/" + item));
    // });
    thegallery = $("#gallery");
    viewer = createGalleryViewer();
    solveILP("viewerCompletion");
    // Load images saved in database
    allMedia = await grabMedia();
    let mediaOrdered = undefined;
    if (jQuery.isEmptyObject(allMedia)) {
        // In case no images exist
        mediaOrdered = [];
    } else {
        mediaOrdered = mediaOrder.map(id => allMedia[id]);
    }
    // mediaOrdered = await grabMedia().then((obj) => {
    //     console.log(obj);
    //     return mediaOrder.map(id => obj[id]);
    // });
    loadNewPics(mediaOrdered, false, mediaOrder); // now that's some funky syntax!
    // Dragula
    dragulaDragging = false;
    dragulaGallery = dragula([galleryElm],{
        moves: function(el) {
            return settings.editorMode;
        }
    });
    dragulaGallery.on("drop", ()=>{
        updateMediaOrder();
        refreshGallery();
    });
    dragulaGallery.on("drag", (el)=>{
        let mmm = el.querySelector("[data-media-id]");
        if (mmm) {
            if (tempListOfYeetedMedia.includes(mmm.getAttribute("data-media-id"))) {
                dragulaGallery.cancel();
                return;
            }
        }
        dragulaDragging = true;
    });
    dragulaGallery.on("dragend", ()=>{
        dragulaDragging = false;
    });
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
        let padder = media.querySelector("i");
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
        for (media of copyOfGalleryChildren) {
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
});
addILP("loadingSettings");
const settings_valid = ["rowHeight", "bgColor", "bgColor-txt", "textColor", "textColor-txt", "imgMargin", "imgReverse", "zoomRatio", "mouseActionDelay",
    "accentColor", "accentColor-txt", "disableFullscreenB", "kivbbo", "dontImportSubfolders", "editorMode", "oldMediaHoverReorderingBehaviour", "emergencyURL", "emergencyTitle", "emergencyIcon", "emergencyOverride", "widthForFill"];
const settings_no_display_val = ["imgReverse", "disableFullscreenB", "kivbbo", "dontImportSubfolders", "editorMode", "oldMediaHoverReorderingBehaviour", "emergencyURL", "emergencyTitle", "emergencyIcon", "emergencyOverride"];
window.addEventListener("load", async () => {
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
                elm.addEventListener("input", doFunction);
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
    solveILP("loadingSettings");
})
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
        case "disableFullscreenB":
            if (val == true) {
                document.documentElement.style.setProperty("--fsb-display", "none");
            } else if (val == false) {
                document.documentElement.style.setProperty("--fsb-display", "inline-block");
            }
            break;
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
            mouseActionDelay = val; // LEGACY CODE - ToDo: use settings.mouseActionDelay instead
            break;
        case "dontImportSubfolders":
            dontImportSubfolders = val; // LEGACY CODE - ToDo: use settings.mouseActionDelay instead
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
            break;
        case "widthForFill":
            document.body.style.setProperty("--minWidthAfterGallery", `${val}%`) // Because they don't overlap it's halved
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
async function loadNewPics(fileListToProcess, saveMedia=true, respectiveIDs=[]) {
    let promiseMeTheFuckingImagesAreLoaded = [];
    for (let i = 0; i < fileListToProcess.length; i++) { // so we can use respectiveIDs
        let currentFile = fileListToProcess[i];
        if (currentFile === undefined) { // In case the file went missing from the database
            mediaOrder.replaceArray(mediaOrder.filter((faultyId) => faultyId != respectiveIDs[i]));
            console.log("faulty image!: ", respectiveIDs[i])
            continue;
        }
        let imgBlobs = []; // Contains only one blob if it's not a zip
        if (currentFile.type.includes("image/") || currentFile.type.includes("video/")) {
            imgBlobs.push(currentFile);
        } else if (currentFile.type.match(/application\/x-zip-compressed|application\/zip/g)) {
            // Deal with ZIP
            let reader = new zip.ZipReader(new zip.BlobReader(currentFile));
            zipFiles = await reader.getEntries({"utf-8":""});
            for await (item of zipFiles) {
                blobby_type = zip.getMimeType(item.filename);
                if (!blobby_type.includes("image/")) {
                    continue;
                };
                blobby = await item.getData(new zip.BlobWriter());
                blobby = new Blob([blobby], {type: blobby_type}); // recreate cuz zip.js stupid
                imgBlobs.push(blobby);
            }
        }
        // Required vars here are: imgBlobs
        let imgURLs = [];
        let videoURLs = [];
        for await (blobby of imgBlobs) {
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
    // And remove the selection
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
            let promising = new Promise((resolve) => { // this doesn't
                callback(new Blob([file], {type: zip.getMimeType(item.name)}))
                resolve();
            });
            promising.then(() => {resolveThisShit()});
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
    for (item of Object.values(e.clipboardData.items)) {
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
        for (item of Object.values(e.dataTransfer.items)) { // ToDo: Change to .files
            // console.log(item)
            if (item.kind == "file") {
                promising.push(scanFiles(item.webkitGetAsEntry(), addFilesArray, getDontImportSubfolders(e.dataTransfer.items.length)));
            } else if (item.kind == "string" && (item.type == "text/x-moz-url" || item.type == "text/uri-list")) {
                let resolveItHere = undefined;
                promising.push(new Promise(resolve => {resolveItHere = resolve}));

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

                let promising_the_second = [];
                item.getAsString(async (urllist) => {
                    for (url of urllist.split("\n")) {
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

// Deleting images
var mouseActionDelay = 2;
var galleryMouseRelevant = undefined;
window.addEventListener("load", async () => { // https://stackoverflow.com/a/27403353
    await Promise.all(importantLoadPromises);
    var mouseTimer;
    function mouseDown(e) { 
        // console.log(e);
        if (e.button === 1) { // On middle click
            e.preventDefault();
            execMouseDown(e);
            return;
        }
        mouseUp(e);
        mouseTimer = window.setTimeout(()=>{execMouseDown(e)},mouseActionDelay*1000); //set timeout to fire in 2 seconds when the user presses mouse button down
    }
    
    function mouseUp(e) { 
        if (mouseTimer) window.clearTimeout(mouseTimer);  //cancel timer when mouse button is released
    }
    
    function execMouseDown(e) {
        if (settings.editorMode === false || dragulaDragging === true) {
            return;
        }
        if (e.target.querySelector("[data-media-id]")) {
            yeetID = e.target.querySelector("[data-media-id]").getAttribute("data-media-id");
            if (yeetID) {
                yeetMedia(yeetID);
            }
        }
    }
    
    galleryMouseRelevant = function(item) {
        item.addEventListener("mousedown", mouseDown);
    }
    galleryMouseRelevant(galleryElm);
    document.body.addEventListener("mouseup", mouseUp);  //listen for mouse up event on body, not just the element you originally clicked on
})

// Fullscreen mode
var ourFullscreen = false; // Is our fullscreen active? - KeyF
var ourHiding = false; // Is our hiding active? - KeyH
function toggleFullscreenGallery(options = {}) { // Equivalent to {toggle:toggle=true, noFullscreen:noFullscreen=false}
    // Note: This function is using a lot of logic with bools. Be careful.
    const {toggle = true, noFullscreen = false} = options;
    const areWeAlreadyFullscreen = !!document.fullscreenElement;
    // console.log("\n")
    console.log(ourFullscreen, ourHiding, areWeAlreadyFullscreen, noFullscreen, toggle)
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
    });
    // In case we get interrupted - i.e. pressing ViewerJS's slideshow
    document.addEventListener('fullscreenchange', exitHandler, false);
    function exitHandler() {
        if (!document.fullscreenElement && ourFullscreen == true) {
            toggleFullscreenGallery({toggle: false});
        }
    }
    document.body.addEventListener("mousemove", (e) => dragHelper(e));
    // document.body.addEventListener("touchmove", (e) => dragHelper(e));
    function dragHelper(e) {
        let draggedAtY = e.clientY;
        let draggetAtFlippedY = window.screen.height - draggedAtY;
        if (document.querySelector(".gu-transit")) {
            if (draggetAtFlippedY < window.screen.height*0.1) {
                let percentage = (window.screen.height*0.1 - (draggetAtFlippedY))/100;
                let toScroll = window.screen.height*0.1*percentage;
                window.scrollBy(0, toScroll);
            } else if (draggedAtY < window.screen.height*0.1) {
                let percentage = (window.screen.height*0.1 - (draggedAtY))/100;
                let toScroll = window.screen.height*0.1*percentage;
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