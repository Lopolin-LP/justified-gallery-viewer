import { isEmptyObject, uuidtime, type UUIDTime } from "./util";
import { ourFullscreen, toggleFullscreenGallery } from "./other-ui";
import { manualOpenNavbar, systemd, navbar, galleryElm, collectionManager, autoImportUnknownData, getImageOnline } from "./globals";
import { EditorModeToggledEvent, settings } from "./settings";
import { executeEmergency } from "./emergency";
import "./html-integration"; // While this doesn't have anything itself, it ensures the HTML has the necessary global function on window so the UI is functional.
import { getFSFiles } from "./filesystem";
import { JGVDB } from "./jgvdb";
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

// Setup UI for Collections
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
        this.refreshOrder();
    }
    collectionRemoved(e: MediaCollectionEvent) {
        this.input.querySelector(`[value="${e.id}"]`)!.remove();
        this.refreshOrder();
    }
    collectionRenamed(e: MediaCollectionEvent) {
        (this.input.querySelector(`[value="${e.id}"]`) as HTMLOptionElement).innerText = e.newName!;
        this.refreshOrder();
    }
    collectionSwitched(e: JGVGalleryEvent) {
        if (e.collection.id) this.input.value = e.collection.id;
    }
    createOpt(val: UUIDTime | MediaCollection) {
        let name: string, id: UUIDTime;
        if (typeof val === "string") {
            const metadata = MediaCollection.getMetadata(val)
            name = metadata.name!
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
    refreshOrder() {
        const children = Array.from(this.input.children as HTMLCollectionOf<HTMLOptionElement>);
        children.sort(sortMCOpts);
        this.input.append(...children);
        this.input.value = this.input.value;
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

/**
 * Deal with files from pasting. Extracts all files and adds them to the image.
 * @param e paste Event
 */
async function generalPastingAndDroppingMediaDealer(e: ClipboardEvent | DragEvent) {
    e.preventDefault();
    let theItems: DataTransferItemList | ClipboardItems;
    if (e instanceof DragEvent) {
        if (e.dataTransfer?.items) {
            theItems = e.dataTransfer.items;
        } else return; // early exit
    } else if (e instanceof ClipboardEvent) {
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

    if (theItems.length === 0) return;
    // we only got a single item. Check if it's a JGVDB, if then do the import and auto-switch. If not, just continue.
    if (theItems.length === 1) {
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
                if (maybe) if (maybe.type === "" && maybe.name.endsWith(".jgvdb")) file = maybe;
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

async function generalFilePickerHandler(e: Event) {
    if (!(e.target instanceof HTMLInputElement)) return;
    if (!(e.target.files instanceof FileList)) return;
    const filelist = e.target.files;
    const files = Array.from(filelist);

    e.target.value = "";

    if (files.length === 0) return;
    
    // Check if it's a single media collection import, if yes then auto switch to it
    if (files.length === 1 && files[0]?.name.endsWith(".jgvdb")) {
        const id = await JGVDB.unzip(files[0]).then(v => JGVDB.import(v.config!, v.files));
        if (typeof id === "string") collectionManager.switchCollection(id);
        return;
    }

    autoImportUnknownData(...files);
}

// Setup import UI elements
window.addEventListener("load", () => {
    let filePicker = document.getElementById("filePicker") as HTMLInputElement;
    let directoryPicker = document.getElementById("directoryPicker") as HTMLInputElement;
    filePicker.addEventListener("change", generalFilePickerHandler);
    directoryPicker.addEventListener("change", generalFilePickerHandler);
    if (filePicker.files && filePicker.files.length != 0) {
        filePicker.dispatchEvent(new Event("change"));
    }
    if (directoryPicker.files && directoryPicker.files.length != 0) {
        directoryPicker.dispatchEvent(new Event("change"));
    }
    document.body.addEventListener("dragover", (e) => {
        e.preventDefault();
    })
    
    document.body.addEventListener("paste", generalPastingAndDroppingMediaDealer);
    document.body.addEventListener("drop", generalPastingAndDroppingMediaDealer);

    // Reordering images https://github.com/bevacqua/dragula
})

window.addEventListener("load", async () => {
    await Promise.all(systemd.all)
    document.body.addEventListener("keydown", (e) => {
        if (!(e.target instanceof HTMLElement)) return;
        if (e.code === "KeyF" && !(e.ctrlKey || e.shiftKey || e.altKey || e.metaKey) && e.target.getAttribute("type") != "text") { // Prevent Fullscreen on typing text
            toggleFullscreenGallery();
        }
        if (e.code === "KeyH" && !(e.ctrlKey || e.shiftKey || e.altKey || e.metaKey) && e.target.getAttribute("type") != "text") { // Prevent Fullscreen on typing text
            toggleFullscreenGallery({noFullscreen: true});
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
        if (e.code !== "Tab") return;
        let sibling = e.shiftKey ? e.target.previousElementSibling as HTMLElement | null : e.target.nextElementSibling as HTMLElement | null;
        if (!sibling && e.shiftKey) return;
        if (!sibling && !e.shiftKey) sibling = document.getElementById("editorMode") as HTMLElement;
        if (!sibling) throw new Error("the fuck happened bro", { cause: sibling });
        e.preventDefault();
        e.stopPropagation();
        sibling.focus();
    })
    document.body.addEventListener("keyup", (e) => {
        if (!(e.target instanceof HTMLElement)) return;
        if (checkIfTargetHasNav(e.target)) return;
        if (e.code !== "Enter" && e.code !== "Space") return;
        (e.target.querySelector(":is(input, button)") as HTMLElement)?.focus?.();
    });
});
