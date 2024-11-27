// https://stackoverflow.com/a/37860657
function reverseChildren(parent) {
    for (var i = 1; i < parent.childNodes.length; i++){
        parent.insertBefore(parent.childNodes[i], parent.firstChild);
    }
}
// http://stackoverflow.com/questions/805107/creating-multiline-strings-in-javascript
function mlString(f) {
    return f.toString().
        replace(/^[^\/]+\/\*!?\r?/, '').
        replace(/\*\/[^\/]+$/, '');
}
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

async function createIMG(blob, id, save=true) {
    let img_c = document.createElement("a");
    img_c.classList.add("image");

    let img = document.createElement("img");
    img.src = URL.createObjectURL(blob);
    id = save ? await media2db("img", blob) : id; // media2db returns uuid
    img.setAttribute("data-media-id", id);

    img_c.appendChild(img);
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

    vid.appendChild(vid_s);
    vid_c.appendChild(vid);
    vid_c.appendChild(vid_x);
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

async function yeetMedia(id, whenDeleted = function(e) {}) { // CURRENT TODO
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
                            URL.revokeObjectURL(elm.src);
                            elm.parentElement.remove(); // yeet it from zhe dom
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

// FOLDER_CONTENTS_ARRAY = mlString(FOLDER_CONTENTS).match(/.*[^\r\n|\n]/gm);
var galleryElm, viewer;
var viewerIsFooterShown = false;
addILP("viewerCompletion");
function createGalleryViewer() { // look into other viewers: https://www.reddit.com/r/webdev/comments/15c1xvc/whats_your_goto_gallerylightbox_library/
    return new Viewer(galleryElm, {
        transition: false,
        tooltip: false,
        viewed() {
            // Big Image
            let footer_no_title_height, image_height, image_width, screen_height, screen_width, scale_to_width, scale_to_height, zoomy;
            if (viewerIsFooterShown == true) {
                footer_no_title_height = this.viewer.footer.clientHeight - this.viewer.footer.querySelector(".viewer-title").clientHeight;
                image_height = this.viewer.image.naturalHeight;
                image_width = this.viewer.image.naturalWidth;
                screen_height = this.viewer.viewer.clientHeight - (footer_no_title_height*2);
                screen_width = this.viewer.viewer.clientWidth;
                scale_to_width = screen_width/image_width;
                scale_to_height = screen_height/image_height;
                zoomy = scale_to_height;
            } else {
                image_height = this.viewer.image.naturalHeight;
                image_width = this.viewer.image.naturalWidth;
                screen_height = this.viewer.viewer.clientHeight;
                screen_width = this.viewer.viewer.clientWidth;
                scale_to_width = screen_width/image_width;
                scale_to_height = screen_height/image_height;
                zoomy = scale_to_height;
            }
            if (scale_to_width < scale_to_height) {
                zoomy = scale_to_width;
            }
            this.viewer.zoomTo(zoomy);
            // Change to Element size, as we now deal with the positioning, not the zoom.
            image_height = this.viewer.image.height;
            image_width = this.viewer.image.width;
            if (viewerIsFooterShown == true) {
                this.viewer.move(0, this.viewer.footer.querySelector(".viewer-title").clientHeight);
            } else {
                this.viewer.moveTo((screen_width-image_width)/2, (screen_height-image_height)/2);
            }
            // Make transitions less shit
            this.viewer.viewer.addEventListener('pointerdown', (event) => {
                this.viewer.image.classList.remove("viewer-special-transition");
            })
            this.viewer.viewer.addEventListener('pointerup', (event) => {
                this.viewer.image.classList.add("viewer-special-transition");
            })
            // Give it time to render
            setTimeout(() => {
                this.viewer.image.classList.add("viewer-special-transition");
            }, 100);
        }
    });
}
let JGOptions = {
    captions: false,
    lastRow: "nojustify",
    rowHeight: 180,
    margins: 5,
    imagesAnimationDuration: 0
}
lePromise = window.addEventListener("load", async () => {
    galleryElm = document.getElementById("gallery");
    // Legacy code for loading images
    // FOLDER_CONTENTS_ARRAY.forEach(item => {
    //     document.querySelector("main").appendChild(createIMG("./album/" + item));
    // });
    thegallery = $("#gallery").justifiedGallery(JGOptions);
    thegallery.one('jg.complete', function () {
        viewer = createGalleryViewer();
        solveILP("viewerCompletion");
    });
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
});
async function refreshGallery() {
    await Promise.all(importantLoadPromises);
    // Placeholder stuff
    galleryElm.childElementCount !== 1 && document.getElementById("placeholderImage") ? document.getElementById("placeholderImage").remove() : null;
    galleryElm.childElementCount === 0 && !document.getElementById("placeholderImage") ? galleryElm.prepend(new DOMParser().parseFromString(`<a id="placeholderImage" class="image"><img src="placeholder.svg"></a>`, "text/html").body.firstChild) : null;
    // Actually refreshing the gallery
    thegallery.justifiedGallery();
    viewer.update();
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
                console.log(target);
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
settings_valid = ["rowHeight", "bgColor", "bgColor-txt", "textColor", "textColor-txt", "imgMargin", "imgReverse", "zoomRatio", "mouseActionDelay", "accentColor", "accentColor-txt", "disableFullscreenB", "kivbbo"];
window.addEventListener("load", () => {
    // Specific fixes for some settings
    // galleryElm.children[0].setAttribute("data-first", "");
    // load all settings
    settings_valid.forEach((id) => {
        let elm = document.getElementById(id);
        let elmType = elm.getAttribute("type");
        valToCheckTMP = "value"; // when a different value is used instead of value
        if (elmType == "checkbox") {
            valToCheckTMP = "checked";
        }
        const valToCheck = valToCheckTMP;
        elm.addEventListener("input", (e) => {
            // changeSetting(id, e.target[valToCheck]);
            // updateVal(id, e.target[valToCheck]);
            settingsDo(id, e.target[valToCheck]);
        });
        // set settings
        // document.getElementById(id).dispatchEvent(new InputEvent("input"));
        settingsDo(id, elm[valToCheck], {load: true, elm: elm, elmValToCheck: valToCheck});
    });
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
        if (id.match(/imgReverse|disableFullscreenB|kivbbo/)) { // Blacklist options who don't display their value
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
            thegallery.justifiedGallery({rowHeight: val});
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
            thegallery.justifiedGallery({margins: val});
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
            mouseActionDelay = val;
            break;
    
        default:
            console.warn("uknown id for settings:", id);
            break;
    }
}
function colorFunc(which, val) {
    if (which.includes("bgColor")) {
        document.documentElement.style.setProperty("--bg", val);
        document.querySelector("meta[name='theme-color']").content = val;
    }
    if (which.includes("textColor")) {
        document.documentElement.style.setProperty("--text", val);
    }
    if (which.includes("accentColor")) {
        document.documentElement.style.setProperty("--accent", val);
    }
    if (which.includes("txt")) {
        whichElmVal = document.getElementById(which).value;
        if (whichElmVal[0] != "#") {
            console.log(which);
            document.getElementById(which).value = "#" + val;
        }
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
        let imgBlobs = []; // Contains only one blob if it's not a zip
        if (currentFile.type.includes("image/") || currentFile.type.includes("video/")) {
            imgBlobs.push(currentFile);
        } else if (currentFile.type == "application/x-zip-compressed") {
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
        imgURLs.forEach(img => {
            promiseMeTheFuckingImagesAreLoaded.push(new Promise(async (resolve) => {
                if (galleryElm.getAttribute("reversed") == "true") {
                    galleryElm.prepend(await createIMG(img, respectiveIDs[i], saveMedia))
                } else {
                    galleryElm.append(await createIMG(img, respectiveIDs[i], saveMedia));
                }
                resolve();
            }));
        })
        videoURLs.forEach(vid => {
            promiseMeTheFuckingImagesAreLoaded.push(new Promise(async (resolve) => {
                if (galleryElm.getAttribute("reversed") == "true") {
                    galleryElm.prepend(await createVID(vid, respectiveIDs[i], saveMedia))
                } else {
                    galleryElm.append(await createVID(vid, respectiveIDs[i], saveMedia))
                }
                resolve();
            }));
        })
    }
    await Promise.all(promiseMeTheFuckingImagesAreLoaded);
    // Refresh gallery
    refreshGallery();
    // And remove the selection
}

async function scanFiles(item, callback) {
    // item type: DataTransferItem
    // Scan folders, callback if not directory anymore.
    // returns a promise
    // https://developer.mozilla.org/en-US/docs/Web/API/DataTransferItem/webkitGetAsEntry
    if (item === null) {
        return;
    }
    return new Promise(async (resolveThisShit) => { 
        if (item.isDirectory) {
            let directoryReader = item.createReader();
            directoryReader.readEntries(async (entries) => {
                for (let entry of entries) {
                    await scanFiles(entry, callback); // wait for the inner children to fix themselves
                }
                resolveThisShit();
            });
        } else {
            file = await new Promise((resolve, reject) => item.file(resolve, reject)); // this has to be a promise
            promising = new Promise((resolve) => { // this doesn't
                callback(new Blob([file], {type: zip.getMimeType(item.name)}))
                resolve();
            });
            promising.then(() => {resolveThisShit()});
        }
    })
}

window.addEventListener("load", () => {
    let filePicker = document.getElementById("filePicker");
    filePicker.addEventListener("change", async () => {
        loadNewPics(filePicker.files);
        filePicker.value = "";
    })
    if (filePicker.files.length != 0) {
        filePicker.dispatchEvent(new Event("change"));
    }
    document.body.addEventListener("dragover", (e) => {
        e.preventDefault();
    })
    document.body.addEventListener("drop", async (e) => {
        e.preventDefault();
        listOfFiles = [];
        addFilesArray = function(item) {
            listOfFiles.push(item);
        }
        let promising = [];
        for (folder of Object.values(e.dataTransfer.items)) {
            promising.push(scanFiles(folder.webkitGetAsEntry(), addFilesArray));
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
        yeetID = e.target.getAttribute("data-media-id");
        if (yeetID) {
            yeetMedia(yeetID);
        }
    }
    
    galleryMouseRelevant = function(item) {
        item.addEventListener("mousedown", mouseDown);
    }
    galleryMouseRelevant(galleryElm);
    document.body.addEventListener("mouseup", mouseUp);  //listen for mouse up event on body, not just the element you originally clicked on
})

// Fullscreen mode
var ourFullscreen = false;
function toggleFullscreenGallery(toggle=true) {
    if (document.fullscreenElement) {
        document.exitFullscreen();
    } else {
        document.documentElement.requestFullscreen();
    }
    if (toggle) {
        ourFullscreen = !ourFullscreen;
    }
}
window.addEventListener("load", async () => {
    await Promise.all(importantLoadPromises);
    document.body.addEventListener("keydown", (e) => {
        // console.log(e)
        if (e.code === "KeyF" && e.target.getAttribute("type") != "text") { // Prevent Fullscreen on typing text
            toggleFullscreenGallery();
            console.log(e);
        }
    });
    // In case we get interrupted - i.e. pressing ViewerJS's slideshow
    document.addEventListener('fullscreenchange', exitHandler, false);
    function exitHandler() {
        if (!document.fullscreenElement && ourFullscreen == true)
        {
            toggleFullscreenGallery(false);
        }
    }
})