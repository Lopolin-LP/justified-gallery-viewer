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
import { uuidtime, type UUIDTime } from "./util";
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

/**
 * Get image from online; makes the user download it manually if necessary.
 * @param url 
 * @param resolve 
 * @returns 
 */
export async function getImageOnline(urls: string, resolve: Function) {
    let currentUrlBeingProcessed: string | undefined = undefined;
    urls.split("\n").forEach(url => {
        if (currentUrlBeingProcessed === url) {
            resolve()
            return;
        }
        if (!(url.startsWith("http://") || url.startsWith("https://"))) {
            // last ditch effort: make file:// url. If it fails, then return
            if (window.location.protocol === "file:") {
                try {
                    new URL("file://" + url);
                    url = "file://" + url;
                } catch (error) {
                    console.warn("Invalid url.", url)
                    resolve();
                    return;
                }
            } else {
                resolve();
                return;
            }
        }
        currentUrlBeingProcessed = url;
        let xhr = new XMLHttpRequest();
        xhr.open("GET", url, true);
        // xhr.withCredentials = true; // I seriously don't know if this makes things worse or better q-q
        xhr.responseType = "blob";
        xhr.onload = function() {
            if (xhr.status === 200) {
                autoImportUnknownData(xhr.response);
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
    })
}

// Manual Download
/**
 * Download external images
 */
export var manualdl = {
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
                <div>
                    <ol>
                        <li>Right Click Image</li>
                        <li>Press copy image</li>
                        <li>Click outside of it and Ctrl + V</li>
                    </ol>
                    <p style="width: min-content; min-width: 100%">If there's only a &lt;color between BG and FG&gt; box below, then it sadly did not work and you need to find another way.</p>
                </div>
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
            if (e.clipboardData?.files) {
                autoImportUnknownData(...e.clipboardData.files);
                manualdl.exit(id);
            }
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
