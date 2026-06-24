// MUST BE THE FIRST FILE LOADED FOR KICKSTARTING THE UI
// CONTAINS IMPORTANT THINGS

import { MediaCollectionsManager, mediadb } from "./database";
import { Dependant } from "./dependant";
import { JGVGallery } from "./gallery-dom"; // note: do not import it as a type. Fully import it. We need everything running.
import { JGVDB } from "./jgvdb";
import { updateStorageInfo } from "./other-ui";
import { StatusIcons, uuidtime, type UUIDTime } from "./util";

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

export var statusIcons = new StatusIcons();

// Important first loads
window.addEventListener("load", async () => {
    navbar = document.querySelector("nav") as HTMLElement;
    galleryElm = document.getElementsByTagName("jgv-gallery")[0] as JGVGallery;
    window.galleryElm = galleryElm;
    collectionManager = await MediaCollectionsManager.init(galleryElm);
    window.collectionManager = collectionManager;
    // commented out this code as I run save() in the constructor now.
    // this is safer anyways as it catches any unloads without an event
    // window.addEventListener("unload", () => {
    //     collectionManager.save();
    // });
    window.mediadb = mediadb;
    statusIcons.setParent(document.getElementById("statusIcons") as HTMLDivElement);
    systemd.resolve("galleryFirstLoad"); // used to inform other load when manager is online
    systemd.resolve("viewerCompletion"); // TODO: Legacy code..?
    // Browser Information
    (document.getElementById("browserinfo") as HTMLElement).innerText = `${navigator.userAgent}`;
    updateStorageInfo();

})

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
        } else if (f.type === "") { // note: JGVDB files on Drag'n'drop don't seem to have a type in Firefox
            if (f instanceof File && f.name.endsWith(".jgvdb")) {
                JGVDB.unzip(f).then(f => JGVDB.import(f.config!, f.files));
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
export async function getImageOnline(urls: string[], resolve: Function) {
    const splitted = urls.map(v => v.split("\n"));
    const set = new Set(splitted.flat());
    const deduplicatedUrls = Array.from(set);
    deduplicatedUrls.forEach(url => {
        try {
            new URL(url);
        } catch (error) {
            console.warn("Invalid url.", url)
            resolve();
            return;
        }
        // if we get to this point, yippie, it's a valid URL!
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
