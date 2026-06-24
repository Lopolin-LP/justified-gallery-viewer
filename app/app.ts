import { isEmptyObject, uuidtime, type UUIDTime } from "./util";
import { ourFullscreen, toggleFullscreenGallery } from "./other-ui";
// import { grabMedia, useImageDB } from "./database-old";
// import { mediaCollections, newCollection, mediaOrder, mediaCollectionsSetToMediaOrder, mediaCollectionsSave, switchCollections, type mediaCollectionsType, type mediaCollection, mediaCollectionsSelectionCreation, mediaCollectionsSort, getDontImportSubfolders, loadNewPics, scanFiles } from "./collections-old";
import { manualOpenNavbar, systemd, navbar, galleryElm, collectionManager, autoImportUnknownData, getImageOnline } from "./globals";
import { EditorModeToggledEvent, settings } from "./settings";
import { executeEmergency } from "./emergency";
import "./html-integration"; // While this doesn't have anything itself, it ensure the HTML has the necessary global function on window so the UI is functional.
import { getFSFiles } from "./filesystem";
import { JGVDB, type JGVDBConf1 } from "./jgvdb";
import "./gallery-dom";
import { MediaCollection, MediaCollectionEvent } from "./database";
import type { JGVGalleryEvent } from "./gallery-dom";
import { configureSync, getConsoleSink } from "@logtape/logtape";

configureSync({
  sinks: {
    console: getConsoleSink(),
  },
  loggers: [
    {
      category: "JGV",
      lowestLevel: "debug",
      sinks: ["console"],
    },
    {
      category: "MediaDatabase",
      lowestLevel: "debug",
      sinks: ["console"],
    },
    {
      category: "MediaCollection",
      lowestLevel: "debug",
      sinks: ["console"],
    },
    {
      category: "MediaCollectionsManager",
      lowestLevel: "debug",
      sinks: ["console"],
    },
    {
      category: "Settings",
      lowestLevel: "debug",
      sinks: ["console"],
    },
    { category: ["logtape", "meta"], lowestLevel: "warning", sinks: ["console"] }
  ],
});

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
        if (!e.id) return;
        const opt = this.createOpt(e.id)!;
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
        this.input.querySelector(`[value="${e.id}"]`)!.remove();
    }
    collectionRenamed(e: MediaCollectionEvent) {
        (this.input.querySelector(`[value="${e.id}"]`) as HTMLOptionElement).innerText = e.newName!;
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
    window.addEventListener("collectionrenamed", (e) => {
        if (e instanceof MediaCollectionEvent) {
            if (e.newName && collectionManager.current.id === e.id && e.newName !== nameEditor.value) {
                nameEditor.value = e.newName;
            }
        }
    })
    const collectionSelector = document.getElementById("selectCollection") as HTMLSelectElement;
    new MCSelectorManager(collectionSelector);
});

// Auto close Navbar
window.addEventListener("mouseup", async (e) => {
    await systemd.promises["galleryFirstLoad"];
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
async function generalPastingAndDroppingMediaDealer(e: ClipboardEvent | DragEvent) {
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
    e.preventDefault();
    // let addFilesArray = function(item: File | Blob) {
    //     listOfFiles.push(item);
    // }
    // let promising: Promise<void>[] = [];
    let theItems: DataTransferItemList | ClipboardItems;
    if (e instanceof DragEvent) {
        if (e.dataTransfer?.items) {
            theItems = e.dataTransfer.items;
        } else return; // early exit
    } else if (e instanceof ClipboardEvent) {
        // if (e.clipboardData?.items) {
        //     // theItems = e.clipboardData.items;
        //     e.clipboardData.getData("")
        // } else return; // early exit
        try {
            const items = await navigator.clipboard.read();
            theItems = items;
        } catch(error) {
            console.warn("Full clipboard access is not allowed.", error);
            if (e.clipboardData) {
                const text = e.clipboardData.getData("text/plain");
                if (text === "") return;
                try {
                    new URL(text);
                } catch (error) {
                    console.warn("Given text not URL-able")
                    return;
                }
                theItems = new DataTransferItemList();
                theItems.add(text, "text/uri")
            } else return;
        }
    } else {
        throw new Error("Wrong Event type", { cause: e });
    }
    // let currentlyBeingGrabbedData: Promise<File | Blob | string | null>[] = Array.from(theItems).map(v => new Promise((resolve, reject) => {
    //     if (v.type.startsWith("text/")) {
    //         v.getAsString(resolve);
    //     } else {
    //         resolve(v.getAsFile());
    //     }
    // }));
    // if (currentlyBeingGrabbedData.length === 0) return;
    // for (const random of currentlyBeingGrabbedData) {
    //     receivedData.push(await random);
    // };
    if (theItems.length === 0) return;
    if (theItems.length === 1) { // we only got a single item. Check if it's a JGVDB, if then do the import and auto-switch. If not, just continue.
        let item: DataTransferItem | ClipboardItem | undefined = undefined, condition: boolean;

        if (theItems[0] instanceof DataTransferItem) {
            item = theItems[0] as DataTransferItem;
            condition = item.kind === "file";
        } else if (theItems[0] instanceof ClipboardItem) {
            item = theItems[0] as ClipboardItem;
            condition = item.types.some(v => v === "application/zip");
        } else {
            condition = false;
        }

        if (condition && item) {
            let file: File | Blob | undefined = undefined;
            if (item instanceof DataTransferItem) {
                const maybe = item.getAsFile();
                if (maybe) if (maybe.type === "application/zip") file = maybe;
            } else if (item instanceof ClipboardItem) {
                file = await item.getType("application/zip") as Blob;
            }
            if (file) {
                const data = await JGVDB.unzip(file);
                if (data.config) {
                    const id = await JGVDB.import(data.config, data.files)
                    if (typeof id === "string") {
                        collectionManager.switchCollection(id); // convenience
                    }
                } else {
                    autoImportUnknownData(...data.files);
                }
                return; // end early
            }
        }
    }
    // let promisesOfFilesToBeDoneInOneSwoop: (File | Blob)[] = [];
    // let listOfMediaToAdd: (File | Blob)[] = [];
    // let promisesThatHaveToFinishBeforeAddingMedia: Promise<void>[] = [];
    let listOfMedia: Promise<(File | Blob) | (File | Blob)[]>[] = [];
    if (theItems instanceof DataTransferItemList) {
        const urls: string[] = [];
        for (let item of Object.values(theItems)) { // ToDo: Change to .files
            if (item.kind == "file") {
                const itemFS = item.webkitGetAsEntry();
                if (itemFS) listOfMedia.push(getFSFiles(itemFS));
            } else if (item.kind == "string" && (item.type == "text/x-moz-url" || item.type == "text/uri-list")) {
                item.getAsString((urllist) => {
                    urls.push(urllist);
                });
            }
        }
        getImageOnline(urls, () => {});

    } else if (theItems[0] instanceof ClipboardItem) {
        const items: ClipboardItems = theItems;
        const urls: string[] = [];
        for (const item of items) {
            let urllist: string | undefined = undefined;
            switch (true) {
                case item.types.includes("text/uri-list"):
                    urllist = await (await item.getType("text/uri-list")).text();
                    break;
                case item.types.includes("text/plain"):
                    urllist = await (await item.getType("text/plain")).text();
                    break;
                case item.types.includes("text/x-moz-url"):
                    urllist = await (await item.getType("text/x-moz-url")).text();
                    break;
                    
                default:
                    break;
            }
            if (urllist) {
                urls.push(urllist);
            } else if (item.types.length > 0) {
                console.log(item);
                let gettype: string = item.types.reduce((prev, v) => {
                    if (prev.includes("video")) return prev;
                    if (prev.includes("image")) {
                        if (v.includes("video")) return v; else return prev;
                    }
                    if (v.includes("image")) return v;
                    return "";
                }, "")
                if (gettype !== "") listOfMedia.push(item.getType(gettype)); // just take the first one and get done
            }
        }
        getImageOnline(urls, () => {});
    }
    if (listOfMedia.length === 0) return;
    let importable: (File | Blob)[] = [];
    for (const item of listOfMedia) {
        let awaited = await item;
        let final: (File | Blob)[];
        if (awaited instanceof Array) {
            final = awaited.flat();
        } else {
            final = [awaited];
        }
        importable.push(...final);
    }
    autoImportUnknownData(...importable);
}

// TODO: rewrite this shit
window.addEventListener("load", () => {
    let filePicker = document.getElementById("filePicker") as HTMLInputElement;
    filePicker.addEventListener("change", async () => {
        galleryElm.collection?.append(...Object.values(filePicker.files as FileList)); // Wrapped in Object.values due to CHROME
        filePicker.value = "";
    })
    if (filePicker.files && filePicker.files.length != 0) {
        filePicker.dispatchEvent(new Event("change"));
    }
    document.body.addEventListener("dragover", (e) => {
        e.preventDefault();
    })
    // except this
    document.body.addEventListener("paste", generalPastingAndDroppingMediaDealer);
    document.body.addEventListener("drop", generalPastingAndDroppingMediaDealer);

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
            JGVDB.unzip(file).then(unzipped => JGVDB.import(unzipped.config!, unzipped.files));
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

// Make Navbar more navigatable with keyboard
window.addEventListener("load", () => {
    function checkIfTargetHasNav(target: HTMLElement): boolean {
        return target.parentElement?.parentElement !== navbar;
    }
    document.body.addEventListener("keydown", (e) => { // Todo: can these also just be placed on the navbar directly instead of body?
        if (!(e.target instanceof HTMLElement)) return;
        if (checkIfTargetHasNav(e.target)) return;
        if (e.key !== "Tab") return;
        let sibling = e.shiftKey ? e.target.previousElementSibling as HTMLElement | null : e.target.nextElementSibling as HTMLElement | null;
        if (!sibling && e.shiftKey) return;
        if (!sibling && !e.shiftKey) sibling = document.getElementById("editorMode") as HTMLElement;
        if (!sibling) throw new Error("the fuck happened bro", { cause: sibling });
        e.preventDefault();
        e.stopPropagation();
        sibling.focus();
    })
    document.body.addEventListener("keypress", (e) => {
        if (!(e.target instanceof HTMLElement)) return;
        if (checkIfTargetHasNav(e.target)) return;
        if (e.key !== "Enter" && e.key !== " ") return;
        (e.target.querySelector(":is(input, button)") as HTMLElement)?.focus?.();
    });
});
