import { isEmptyObject, uuidtime, type UUIDTime } from "./util";
import { ourFullscreen, toggleFullscreenGallery } from "./other-ui";
// import { grabMedia, useImageDB } from "./database-old";
// import { mediaCollections, newCollection, mediaOrder, mediaCollectionsSetToMediaOrder, mediaCollectionsSave, switchCollections, type mediaCollectionsType, type mediaCollection, mediaCollectionsSelectionCreation, mediaCollectionsSort, getDontImportSubfolders, loadNewPics, scanFiles } from "./collections-old";
import { manualOpenNavbar, systemd, navbar, galleryElm, loadNewPics, collectionManager } from "./globals";
import { EditorModeToggledEvent, settings } from "./settings";
import { executeEmergency } from "./emergency";
import "./html-integration"; // While this doesn't have anything itself, it ensure the HTML has the necessary global function on window so the UI is functional.
import { getFSFiles } from "./filesystem";
import { JGVDB } from "./jgvdb";
import "./gallery-dom";
import { MediaCollection, MediaCollectionEvent } from "./database";
import type { JGVGalleryEvent } from "./gallery-dom";

// Manual Download
/**
 * Download external images
 */
var manualdl = {
    /**
     * Download external images by asking the user nicely to do it
     * @param url URL to prompt the user to download
     * @returns 
     */
    init: function(url: string) {
        let id: UUIDTime = uuidtime();
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
</div>`, "text/html").body.firstChild as HTMLDivElement;
        let iframe = html.querySelector(".manualdl-todo") as HTMLIFrameElement;
        iframe.src = url;
        html.addEventListener("paste", (e: ClipboardEvent) => {
            generalPastingMediaDealer(e);
            manualdl.exit(id);
        });
        (html.querySelector(".manualdl-exit") as HTMLButtonElement).addEventListener("click", ()=>{manualdl.exit(id)});
        (html.querySelector(".manualdl-alt-exit") as HTMLDivElement).addEventListener("click", ()=>{manualdl.exit(id)});
        document.body.append(html);
        return id;
    },
    /**
     * Internal function for quitting the interface
     * @param id 
     */
    exit: function(id: UUIDTime) {
        document.getElementById(id)?.remove();
    }
};

// Setup for Collections
// if (!("current" in (mediaCollections as mediaCollectionsType))) {
//     // If setting up for first time
//     mediaCollections.collections = [];
//     mediaCollections.current = newCollection("Default");
//     console.log("Setup first collection");
//     // Migrate old users - ToDo: REMOVE AFTER A WHILE
//     if (mediaOrder.length !== 0) {
//         mediaCollectionsSetToMediaOrder();
//         mediaCollectionsSave();
//         console.log("Migrating old user!");
//     }
//     switchCollections(mediaCollections.current, {dontreload: true});
// } else if (!mediaCollections.collections.includes(mediaCollections.current)) {
//     // If the current collection disappeared
//     console.log("Last collection was invalid...");
//     if (mediaCollections.collections.length == 0) {
//         // ...and there aren't any others
//         console.log("Making new one");
//         switchCollections(newCollection("Default"), {dontreload: true});
//     } else {
//         // If there's still one left
//         console.log("Fallback collection found");
//         switchCollections(mediaCollections.collections[0] as UUIDTime, {dontreload: true});
//     }
//     // No need to reload, nothing is executing as the DOM is not loaded yet and this is the first code to not be a function definition
//     mediaCollectionsSave(); // Handle weird edge cases
// }

// Setup UI for Collections
// window.addEventListener("load", () => {
//     // document.getElementById("collectionName").innerText = mediaCollections[mediaCollections.current].name;
//     (document.getElementById("changeCollectionName") as HTMLInputElement).value = (mediaCollections[mediaCollections.current] as mediaCollection).name;
//     (document.getElementById("changeCollectionName") as HTMLInputElement).addEventListener("input", (e) => {
//         const target = e.target as HTMLInputElement
//         (mediaCollections[mediaCollections.current] as mediaCollection).name = (e.target as HTMLInputElement).value == "" ? "Unnamed Collection " + mediaCollections.current : target.value; // Save an unnamed variant, because no empty collection!
//         mediaCollectionsSave();
//         // document.getElementById("collectionName").innerText = e.target.value;
//         (document.querySelector("#selectCollection > option[value=\"" + mediaCollections.current + "\"]") as HTMLOptionElement).innerText = target.value;
//         mediaCollections.collections.sort(mediaCollectionsSort);
//         (document.getElementById("selectCollection") as HTMLSelectElement).innerHTML = "";
//         mediaCollectionsSelectionCreation(document.getElementById("selectCollection") as HTMLSelectElement);
//     })
//     // Give Collections as options
//     let selcol = document.getElementById("selectCollection") as HTMLSelectElement;
//     mediaCollectionsSelectionCreation(selcol);
//     selcol.addEventListener("change", (e) => {
//         switchCollections((e.target as HTMLSelectElement).value);
//     })
// });
const sortMCOpts = (a: HTMLOptionElement, b: HTMLOptionElement): number => {
    if (!a || !b) return 0;
    const alow = a.innerText.toLocaleLowerCase()
    const blow = b.innerText.toLocaleLowerCase()
    if (alow < blow) {
        return -1;
    } else if (alow > blow) {
        return 1;
    }
    return 0;
}
// function mediaCollectionsSelectionCreation(target: HTMLInputElement) {
//     const elms = collectionManager.available.map(id => {
//     });
//     elms.sort(sortMCOpts);
//     target.append(...elms);
// }
class MCSelectorManager {
    input: HTMLSelectElement;
    collectionAdded(e: MediaCollectionEvent) {
        console.log(e);
        if (!e.collection) return;
        const opt = this.createOpt(e.collection)!;
        let looping = true;
        let i = 0
        const children = this.input.children as HTMLCollectionOf<HTMLOptionElement>;
        for (let i = 0; i < this.input.childElementCount; i++) {
            const element = children[i]!;
            if (opt.innerText.toLocaleLowerCase() < element.innerText) {
                this.input.insertBefore(opt, element);
                break;
            }
        }
        if (looping === true) {
            this.input.appendChild(opt);
        }
    }
    collectionRemoved(e: MediaCollectionEvent) {
        this.input.querySelector("#" + e.collection?.id)?.remove();
    }
    collectionRenamed(e: MediaCollectionEvent) {
        (this.input.querySelector("#" + e.collection?.id) as HTMLOptionElement).innerText = e.collection!.name;
    }
    collectionSwitched(e: JGVGalleryEvent) {
        if (e.collection.id) this.input.value = e.collection.id;
    }
    createOpt(val: UUIDTime | MediaCollection) {
        let name: string, id: UUIDTime;
        if (typeof val === "string") {
            const metadata = MediaCollection.getMetadata(val)
            name = metadata.name
            id = val;
        } else {
            if (val.id === null) return;
            name = val.name;
            id = val.id;
        }
        let opt = document.createElement("option");
        opt.value = id;
        opt.innerText = name ?? "Invalid Collection Name — Something went terribly wrong.";
        if (id === collectionManager.current.id) { // TODO: put this somewhere where it makes more sense
            opt.setAttribute("selected", "");
        }
        return opt;
    }
    constructor(elm: HTMLSelectElement) {
        this.input = elm;

        const elms = collectionManager.available.map(id => this.createOpt(id)).filter(v => v !== undefined);
        elms.sort(sortMCOpts);
        this.input.append(...elms);

        this.input.addEventListener("change", () => {
            if (this.input.selectedIndex === -1) return;
            const selected = this.input.options[this.input.selectedIndex] as HTMLOptionElement;
            collectionManager.switchCollection(selected.value);
        })
        
        window.addEventListener("collectionadded",    (e) => { this.collectionAdded(e as MediaCollectionEvent) })
        window.addEventListener("collectionremoved",  (e) => { this.collectionRemoved(e as MediaCollectionEvent) })
        window.addEventListener("collectionrenamed",  (e) => { this.collectionRenamed(e as MediaCollectionEvent) })
        galleryElm.addEventListener("collectionswitched", (e) => {
            this.collectionSwitched(e as JGVGalleryEvent);
        })
    }
}
window.addEventListener("load", async () => {
    await systemd.promises["galleryFirstLoad"];
    const nameEditor = document.getElementById("changeCollectionName") as HTMLInputElement;
    nameEditor.value = galleryElm.collection!.name; // initial name
    nameEditor.addEventListener("input", (e) => {
        galleryElm.collection!.rename(nameEditor.value)
    });
    galleryElm.addEventListener("collectionswitched", (e) => {
        e = e as JGVGalleryEvent;
        nameEditor.value = galleryElm.collection!.name;
    });
    const collectionSelector = document.getElementById("selectCollection") as HTMLSelectElement;
    new MCSelectorManager(collectionSelector);
});

// Auto close Navbar
window.addEventListener("mouseup", (e) => {
    if (!navbar?.contains(e.target as HTMLElement) && navbar.classList.contains("active")) manualOpenNavbar.s(false);
});

// window.addEventListener("load", async () => {
//     await systemd.promises["viewerCompletion"];
//     // Load images saved in database
//     let allMedia = await grabMedia();
//     let mediaOrdered: mediaOrdered = [];
//     if (!isEmptyObject(allMedia)) {
//         mediaOrdered = mediaOrder.map((id) => (allMedia[id] as File | Blob));
//     }
//     // mediaOrdered = await grabMedia().then((obj) => {
//     //     console.log(obj);
//     //     return mediaOrder.map(id => obj[id]);
//     // });
//     loadNewPics(mediaOrdered, false, mediaOrder); // now that's some funky syntax!
//     systemd.resolve("galleryFirstLoad");
// });
// File picker: If ctrl, then use dir
function toggleFilePickerDir(e: KeyboardEvent) {
    const attrs = ["webkitdirectory", "directory"];
    if (e.key == "Control" && e.type == "keydown") {
        attrs.forEach(attr => {
            (document.getElementById("filePicker") as HTMLElement).setAttribute(attr, "");
        });
    } else if (e.type == "keyup") {
        attrs.forEach(attr => {
            (document.getElementById("filePicker") as HTMLElement).removeAttribute(attr);
        });
    }
}
window.addEventListener("load", () => {
    document.body.addEventListener("keydown", (e) => {toggleFilePickerDir(e)});
    document.body.addEventListener("keyup", (e) => {toggleFilePickerDir(e)});
})

/**
 * Deal with files from pasting. Extracts all files and adds them to the image.
 * @param e paste Event
 */
async function generalPastingMediaDealer(e: ClipboardEvent) {
    // if (!(e instanceof ClipboardEvent)) return;
    // if ((e?.target as Element)?.nodeName.toLowerCase() == "input") { // allow pasting when applicable
    //     return;
    // }
    // if (!e?.clipboardData?.items) {
    //     return;
    // }
    // e.stopPropagation();
    // e.preventDefault();
    // // let promising = [];
    // let listOfFiles: File[] = [];
    // // // let addFilesArray = function(item: File) {
    // // //     listOfFiles.push(item);
    // // // }
    // // for (let item of Object.values(e.clipboardData.items)) { // TODO: Not a fucking for-loop! Do foreach!
    // //     // console.log(item);
    // //     promising.push(scanFiles(item.webkitGetAsEntry(), addFilesArray, getDontImportSubfolders(e.clipboardData.items.length)));
    // // }
    // Object.values(e.clipboardData.items).forEach(async item => {
    //     const fsEntry = item.webkitGetAsEntry();
    //     if (fsEntry) {
    //         listOfFiles = await getFSFiles(fsEntry);
    //         loadNewPics(listOfFiles);
    //     }
    // })
    const files = e.clipboardData?.files;
    if (files) galleryElm.collection?.append(...files);
}

// TODO: rewrite this shit
window.addEventListener("load", () => {
    let filePicker = document.getElementById("filePicker") as HTMLInputElement;
    filePicker.addEventListener("change", async () => {
        loadNewPics(Object.values(filePicker.files as FileList)); // Wrapped in Object.values due to CHROME
        filePicker.value = "";
    })
    if (filePicker.files && filePicker.files.length != 0) {
        filePicker.dispatchEvent(new Event("change"));
    }
    document.body.addEventListener("dragover", (e) => {
        e.preventDefault();
    })
    document.body.addEventListener("paste", generalPastingMediaDealer);
    document.body.addEventListener("drop", async (e) => {
        e.preventDefault();
        let listOfFiles: (File | Blob)[] = [];
        let addFilesArray = function(item: File | Blob) {
            listOfFiles.push(item);
        }
        let promising: Promise<void>[] = [];
        let currentUrlBeingProcessed = "";
        async function getImageOnline(url: string, resolve: Function) {
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
        if (e.dataTransfer) { // ensure there is data
            if (e.dataTransfer.items.length == 1) {
                if (e.dataTransfer.items[0]?.kind == "file") {
                    if (e.dataTransfer.items[0].getAsFile()?.name.endsWith(".jgvdb")) {
                        JGVDB.unzip(e.dataTransfer.items[0].getAsFile() as File).then(unzipped => JGVDB.import(unzipped.config, unzipped.files));
                        return; // end early
                    }
                }
            }
            for (let item of Object.values(e.dataTransfer.items)) { // ToDo: Change to .files
                // console.log(item)
                if (item.kind == "file") {
                    const itemFS = item.webkitGetAsEntry();
                    if (itemFS) promising.push(new Promise(async (resolve: () => void) => {
                        listOfFiles.push(...await getFSFiles(itemFS));
                        resolve();
                    }));
                } else if (item.kind == "string" && (item.type == "text/x-moz-url" || item.type == "text/uri-list")) {
                    let resolveItHere: Function | undefined = undefined;
                    promising.push(new Promise(resolve => {resolveItHere = resolve}));
                    let promising_the_second = [];
                    item.getAsString(async (urllist) => {
                        for (let url of urllist.split("\n")) {
                            promising_the_second.push(new Promise(async resolve => {getImageOnline(url, resolve);}));
                        }
                        await Promise.all(promising_the_second);
                        resolveItHere?.();
                    });
                }
            }
        }
        await Promise.all(promising); // otherwise shit will execute too fast
        loadNewPics(listOfFiles);
    })

    // Reordering images https://github.com/bevacqua/dragula
})

window.addEventListener("load", async () => {
    await Promise.all(systemd.all)
    document.body.addEventListener("keydown", (e) => {
        // console.log(e)
        if (!(e.target instanceof HTMLElement)) return;
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
    function dragHelper(e: MouseEvent | TouchEvent) {
        let screenHeight = window.screen.availHeight;
        let draggedAtY;
        if ("touches" in e) {
            draggedAtY = e.touches[0]!.clientY;
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
            (item as HTMLLinkElement).href = customIconURL;
        });
    }
    let titleURL = new URLSearchParams(window.location.search).get("title");
    if (titleURL !== null) {
        (document.querySelector("head title") as HTMLTitleElement).innerText = titleURL;
    }
})

// Manage Editing Mode
window.addEventListener("editorModeToggled", function(e){
    if ((e as EditorModeToggledEvent).status == true) {
        document.body.classList.add("editorMode");
    } else {
        document.body.classList.remove("editorMode");
    }
})

declare global {
  interface Window {
    toggleEmergencySettings: () => void;
  }
}
window.toggleEmergencySettings = () => { // TODO: Figure out where the counterpart went to
    let emergency = document.getElementById("emergencySettings") as HTMLElement;
    if (emergency.classList.contains("visible")) {
        emergency.classList.remove("visible");
    } else {
        emergency.classList.add("visible");
    }
}

window.addEventListener("load", () => {
    (document.getElementById("importingFile") as HTMLInputElement).addEventListener("change", (e) => {
        // jgvdb.import((e.target as HTMLInputElement).files as FileList);
        const files = (e.target as HTMLInputElement).files;
        if (files) for (const file of files) {
            JGVDB.unzip(file).then(unzipped => JGVDB.import(unzipped.config, unzipped.files));
        }
        (e.target as HTMLInputElement).value = "";
    });
});

// Hide cursor after a while - https://stackoverflow.com/a/31798987
window.addEventListener("load", () => {
    let timer;
    function applyIdleTimer() {
        if (document.body.classList.contains("idle")) {
            // From idle to normal
            document.body.classList.remove("idle");
        } else {
            // From idle to normal
            if (timer) {
                clearTimeout(timer);
            }
        }
        // Always set a timeout
        setTimeout(() => {
            document.body.classList.add("idle");
        }, settings.mouseHideDelay);
    }
    document.body.addEventListener("mousemove", applyIdleTimer);
    applyIdleTimer();
});
