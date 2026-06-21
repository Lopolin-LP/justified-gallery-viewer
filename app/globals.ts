// MUST BE THE FIRST FILE LOADED FOR KICKSTARTING THE UI
// CONTAINS IMPORTANT THINGS

import { type Drake } from "../dragula";
import { MediaCollectionsManager, mediadb } from "./database";
// import { updateMediaOrder } from "./collections-old";
// import { closeContextMenuHelper } from "./context-menu";
// import { tempListOfYeetedMedia } from "./database-old";
import { Dependant } from "./dependant";
import { JGVGallery } from "./gallery-dom"; // note: do not import it as a type. Fully import it. We need everything running.
import { JGVDB } from "./jgvdb";
// import { getDataMediaId } from "./gallery-dom-old";
import { updateStorageInfo } from "./other-ui";
// import { settings } from "./settings";
// import { createGalleryViewer } from "./viewer";

// Global Variable setup
export var galleryElm: JGVGallery, navbar: HTMLElement, collectionManager: MediaCollectionsManager;
export var dragulaDragging: boolean = false;
export var mediaSizesStylesheet = document.head.appendChild(document.createElement("style"));

// Structured loading across files
export var systemd: Dependant = new Dependant(["viewerCompletion", "galleryFirstLoad", "loadingSettings"]);

declare global { // DEBUGGING
    interface Window {
        galleryElm: typeof galleryElm
        collectionManager: typeof collectionManager
        mediadb: typeof mediadb
    }
}

// Important first loads
window.addEventListener("load", async () => {
    navbar = document.querySelector("nav") as HTMLElement;
    galleryElm = document.getElementsByTagName("jgv-gallery")[0] as JGVGallery;
    window.galleryElm = galleryElm;
    collectionManager = await MediaCollectionsManager.init(galleryElm);
    window.collectionManager = collectionManager;
    window.addEventListener("unload", () => {
        collectionManager.save();
    });
    window.mediadb = mediadb;
    systemd.resolve("galleryFirstLoad"); // used to inform other load when manager is online
    // Legacy code for loading images
    // FOLDER_CONTENTS_ARRAY.forEach(item => {
    //     document.querySelector("main").appendChild(createIMG("./album/" + item));
    // });
    // let thegallery = $("#gallery");
    // viewer = createGalleryViewer();
    systemd.resolve("viewerCompletion"); // Legacy code..?
    // Browser Information
    (document.getElementById("browserinfo") as HTMLElement).innerText = `${navigator.userAgent}`;
    updateStorageInfo();

})

// Dragula
/** @deprecated */
// window.addEventListener("load", async () => {
//     await systemd.promises["galleryFirstLoad"];
//     dragulaGallery = dragula([galleryElm],{
//         moves: function() {
//             return settings.editorMode;
//         }
//     });
//     dragulaGallery.on("drop", ()=>{
//         updateMediaOrder();
//         refreshGallery();
//     });
//     dragulaGallery.on("drag", (el)=>{
//         // Ignore any errors caused by extremely quick cancelling. 
//         if (document.querySelector("#contextmenu.visible")) {
//             // dragulaGallery.cancel();
//             // console.info("%cIgnore \"Uncaught TypeError: e is null\" thrown by Dragula, it's a harmless bug.\n%cSee https://github.com/bevacqua/dragula/issues/275", "font-size: 2em; color: #af1c1c; background: #000", "")
//             // return false;
//             closeContextMenuHelper(el);
//         }
//         let mmm = getDataMediaId(el);
//         if (mmm) { // NOTE: Most likely legacy code, as we switched from deleting images on hold to show the context menu
//             if (tempListOfYeetedMedia.includes(mmm)) {
//                 dragulaGallery.cancel();
//                 return false;
//             }
//         }
//         dragulaDragging = true;
//     });
//     dragulaGallery.on("dragend", ()=>{
//         dragulaDragging = false;
//     });
// });

// Delete all Blobs before unloading - saves RAM, hopefully.
// export function revokeAllOBJURLS() {
//     (galleryElm.querySelectorAll("a:not(#placeholderImage) > img, a > video > source") as NodeListOf<HTMLMediaElement>).forEach((elm) => {
//         URL.revokeObjectURL(elm.src);
//     })
// }
// window.addEventListener("beforeunload", (e) => {
//     revokeAllOBJURLS();
// })

// Context Menu "Open Navbar" feature
export const manualOpenNavbar = {
    t: function () {
        if (manualOpenNavbar.c()) {
            navbar.classList.remove("active");
        } else {
            navbar.classList.add("active");
        }
    },
    c: function () {
        return navbar.classList.contains("active");
    },
    s: function (val: boolean) {
        val ? navbar.classList.add("active") : navbar.classList.remove("active");
    }
}

/**
 * Import new MEDIA into current collection (no zip, no jgvdb)
 * @param files 
 * @deprecated It's just a handy shortcut, but it's better if it's written out, or if the functions were on the gallery itself and not on the whole site.
 */
export function loadNewPics(files: (File | Blob)[]) {
    galleryElm.collection?.append(...files);
}

/**
 * Automatically imports data. For every file/blob given it checks what type it is and delegates it to the correct function:
 * - JGVDB files are auto-imported
 * - Media files are added to the current collection
 * - ZIP files are unzipped and then parsed again (user fault if they add a zip bomb)
 * @param files 
 */
export async function autoImportUnknownData(...files: (File | Blob)[]) {
    const easilyAppendableFiles = files.map(async f => { // async so it returns early... hopefully?
        if (/^(image\/|video\/)/g.test(f.type)) {
            return f;
        } else if (f.type === "application/zip") {
            if (f instanceof File) {
                // we can look at file extension
                if (f.name.endsWith(".jgvdb")) {
                    JGVDB.unzip(f).then(f => JGVDB.import(f.config!, f.files));
                } else {
                    JGVDB.unzip(f).then(f => autoImportUnknownData(...f.files));
                }
            } else {
                // we make an ASS out of U and ME
                // ...and ASSUME this is a normal zip
                JGVDB.unzip(f).then(f => autoImportUnknownData(...f.files));
            }
        }
    });
    let appendable: (File | Blob)[] = [];
    for (const f of easilyAppendableFiles) {
        const ff = await f;
        if (ff) appendable.push(ff);
    }
    collectionManager.current.append(...appendable);
}