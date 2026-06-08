// MUST BE THE FIRST FILE LOADED FOR KICKSTARTING THE UI
// CONTAINS IMPORTANT THINGS

import dragula, { type Drake } from "../dragula";
import { updateMediaOrder } from "./collections-old";
import { closeContextMenuHelper } from "./context-menu";
import { tempListOfYeetedMedia } from "./database-old";
import { Dependant } from "./dependant";
import { getDataMediaId } from "./gallery-dom";
import { refreshGallery, updateStorageInfo } from "./other-ui";
import { settings } from "./settings";
import { createGalleryViewer } from "./viewer";

// Global Variable setup
export var galleryElm: HTMLElement, viewer: Viewer, dragulaGallery: Drake, navbar: HTMLElement;
export var dragulaDragging: boolean = false;
export var mediaSizesStylesheet = document.head.appendChild(document.createElement("style"));

// Structured loading across files
export var systemd: Dependant = new Dependant(["viewerCompletion", "galleryFirstLoad", "loadingSettings"]);

export type mediaOrdered = (File | Blob)[];

// Important first loads
window.addEventListener("load", () => {
    navbar = document.querySelector("nav") as HTMLElement;
    galleryElm = document.getElementById("gallery") as HTMLElement;
    // Legacy code for loading images
    // FOLDER_CONTENTS_ARRAY.forEach(item => {
    //     document.querySelector("main").appendChild(createIMG("./album/" + item));
    // });
    // let thegallery = $("#gallery");
    viewer = createGalleryViewer();
    systemd.resolve("viewerCompletion");
    // Browser Information
    (document.getElementById("browserinfo") as HTMLElement).innerText = `${navigator.userAgent}`;
    updateStorageInfo();

})

// Dragula
window.addEventListener("load", async () => {
    await systemd.promises["galleryFirstLoad"];
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
});

// Delete all Blobs before unloading - saves RAM, hopefully.
export function revokeAllOBJURLS() {
    (galleryElm.querySelectorAll("a:not(#placeholderImage) > img, a > video > source") as NodeListOf<HTMLMediaElement>).forEach((elm) => {
        URL.revokeObjectURL(elm.src);
    })
}
window.addEventListener("beforeunload", (e) => {
    revokeAllOBJURLS();
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
