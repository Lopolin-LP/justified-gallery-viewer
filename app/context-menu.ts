// import { grabMedia, yeetMedia } from "./database-old";
import { executeEmergency } from "./emergency";
import { JGVGallery, JGVMedia } from "./gallery-dom";
// import { getDataMediaId } from "./gallery-dom-old";
import { dragulaDragging, galleryElm, manualOpenNavbar, systemd } from "./globals";
import { ourFullscreen, toggleFullscreenGallery, ourHiding } from "./other-ui";
import { settings } from "./settings";
import { uuidtime, constructorPrototypeCopyNoReadOnly, downloadURI } from "./util";
import { zoomPincher, distanceBetweenPoints } from "./zoom-pincher";

export type contextMenuButtonDefinition = {
    text: string,
    callback?: (e: PointerEvent) => void,
    disabled?: boolean,
    style?: string,
    class?: string
}

// Custom Context Menu
/**
 * Create a context Menu. Should only be called in conjunction with a PointerEvent event listener like (e) => contextMenu([...], e);
 * @param buttons Buttons inside the context menu. Top to bottom.
 * @param buttons.text Text HTML containing visble text (not optional)
 * @param buttons.callback JS function to be executed on click. Receives the given `PointerEvent`
 * @param buttons.disabled Display the button in an inactive state. Literally just sets the HTML "disabled" attribute.
 * @param buttons.style HTML style property to be set to
 * @param buttons.class Additional class to add to the button element
 * @param e PointerEvent causing the context Menu to be shown. Used for position and placement of the menu.
 * @returns Promise that's resolved once the button is displayed
 */
export function contextMenu(buttons: (contextMenuButtonDefinition | {})[], e: PointerEvent): Promise<void> {
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
        let contextmenu = document.getElementById("contextmenu") as HTMLElement;
        if (e.target == contextmenu || contextmenu.contains(e.target as HTMLElement)) return;
        contextmenu.innerHTML = "";
        // Add buttons
        for (let i = 0; i < buttons.length; i++) {
            const button = buttons[i] as contextMenuButtonDefinition;
            if (Object.keys(button).length == 0) continue;
            let html = document.createElement("button");
            html.type = "button";
            if (button.callback) html.addEventListener("click", button.callback);
            html.addEventListener("click", closeContextMenu);
            html.innerHTML = button.text;
            html.style = button.style ?? "";
            button.class ? html.setAttribute("class", button.class) : null;
            button.disabled ? html.setAttribute("disabled", "") : null;
            document.getElementById("contextmenu")!.append(html);
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
        document.getElementById("contextmenu")!.prepend(ghost);
        (contextmenu.querySelector(":first-child") as HTMLElement).focus();
        resolve();
    });
}

export function closeContextMenuHelper(el: Node | null | undefined = null) {
    if (!document.getElementById("contextmenu")!.contains(el)) {
        closeContextMenu();
    }
}
export function closeContextMenu() {
    if (ignoreContextMenuCancelOnce) return (ignoreContextMenuCancelOnce = false);
    document.getElementById("contextmenu")!.classList.remove("visible");
    window.dispatchEvent(new Event("closedcontextmenu"));
}

/**
 * Makes Thumbnail based on HTMLElement with MediaID. Ensure 
 * @param raw 
 * @returns 
 */
export function makeThumbnail(mediaElement: JGVMedia): Promise<string> { //https://stackoverflow.com/a/29806483 | https://jsfiddle.net/giu_do/e98tffu6/
    return new Promise((resolve: (url: string) => void, reject: Function) => {
        let node = mediaElement;
        if (!node) {
            reject();
            return;
        }
        let ratio = node.clientWidth / node.clientHeight;
        let width = 512;
        let height = width/ratio;
        let ctx = document.createElement("canvas");
        ctx.setAttribute("width", width.toString());
        ctx.setAttribute("height", height.toString());

        const context2d = ctx.getContext("2d");
        if (context2d === null) return;
        context2d.filter = `blur(${width*0.05}px)`;
        context2d.drawImage(node.querySelector("img, video") as HTMLImageElement | HTMLVideoElement, 0, 0, width, height);
        context2d.canvas.toBlob(blob => resolve(URL.createObjectURL(blob as Blob)), "image/jpeg", 0.75);
    });
}

// Downloading Media
/**
 * Gets the src of a given element. Compatible with images and videos
 * @param elm 
 * @returns A string if successful, or `undefined` if not.
 */
function getBlobURIfromElement(elm: HTMLElement): string | undefined {
    let link: string | undefined = "";
    if (elm.nodeName == "A") { // if link
        link = (elm.querySelector("img, source") as HTMLImageElement | null)?.src;
    } else if (elm.nodeName == "IMG") { // if image
        link = (elm as HTMLImageElement).src;
    } else if (elm.nodeName == "VIDEO") { // if video
        link = (elm.querySelector("source") as HTMLSourceElement | null)?.src;
    }
    if (link !== "") {
        return link;
    }
}

type dlMediaElmType = JGVMedia | string
type dlMediaElmTypeLoop = dlMediaElmType | (dlMediaElmTypeLoop & dlMediaElmTypeLoop[])[]

/**
 * Make a user download media
 * @param elm JGVMEdia or ID from Database (received via `grabMedia()`)
 * @param grabbedMedia an already given `grabMedia()` result to reduce function call time
 */
async function dlMedia(elm: dlMediaElmTypeLoop) {
    if (elm instanceof JGVMedia) {
        const url = getBlobURIfromElement(elm);
        if (!url) throw new Error("Couldn't get URL from Element in dlMedia.", { cause: elm });
        downloadURI(url);
    } else if (typeof elm === "string") {
        let media = galleryElm.collection!.blobs;
        const blob = media[elm];
        if (!blob) throw new Error("Couldn't get Blob from given ID");
        const url = URL.createObjectURL(blob);
        downloadURI(url); // Do not revoke, we don't know how long the download takes and this extra URL is not that important.
    } else if (elm instanceof Array) {
        elm.forEach(async item => {
            dlMedia(item);
        })
    } else {
        throw new Error("elm was neither JGVMedia, ID, or Array of JGVMedias and IDs", { cause: elm });
    }
}

document.addEventListener("contextmenu", (e) => {
    if (!(e.target instanceof HTMLElement)) return;
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

    // Walk up DOM tree to get the nearest JGVMedia element
    let mediaTarget: JGVMedia | undefined = undefined;
    if (galleryElm.contains(e.target) && galleryElm !== e.target) {
        if (e.target instanceof JGVMedia) {
            mediaTarget = e.target;
        } else {
            let parent = e.target.parentElement;
            while (parent) {
                if (parent instanceof JGVMedia) {
                    mediaTarget = parent;
                    parent = null;
                } else {
                    parent = parent.parentElement;
                }
            }
        }
    }

    if (mediaTarget) {
        // Gallery Context Menu
        e.preventDefault();
        e.stopImmediatePropagation();
        let comebackto = uuidtime();
        let config = [
            {text: "Download", callback: ()=>{dlMedia(mediaTarget);}, class: "download "+comebackto, style: ""},
            {text: "Delete", callback: ()=>{galleryElm.collection?.delete((mediaTarget).id);}},
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
                let pic = await makeThumbnail(mediaTarget);
                await promise;
                (document.querySelector("[class*=\""+comebackto+"\"]") as HTMLElement).style = `background: url(${pic}) 50% 50% / cover, var(--dl-bg);`;
                window.addEventListener("closedcontextmenu", () => {
                    URL.revokeObjectURL(pic);
                }, { once: true });
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
    document.body.addEventListener("mousedown", (e) => closeContextMenuHelper(e.target as HTMLElement));
    document.body.addEventListener("drag", (e) => closeContextMenuHelper(e.target as HTMLElement));
    document.body.addEventListener("touchstart", (e) => closeContextMenuHelper(e.target as HTMLElement));
    window.addEventListener("resize", () => closeContextMenuHelper());
});
window.addEventListener("keydown", (e) => {
    if (e.code == "Escape") {
        closeContextMenu();
    }
    if (!(e.target instanceof HTMLElement)) return;
    if (document.getElementById("contextmenu")!.contains(e.target)) {
        if (e.code == "ArrowDown" || e.code == "ArrowRight" || e.code == "ArrowUp" || e.code == "ArrowLeft") {
            const upwards = e.code == "ArrowUp" || e.code == "ArrowLeft";
            const parent = e.target.parentElement as HTMLElement; // upon deletion, these attributes return null
            const firstorlast = upwards ? parent.lastChild : parent.firstChild;
            const sibling = upwards ? e.target.previousSibling : e.target.nextSibling;
            const ghost = document.querySelector("#contextmenu .ghost-button");
            ghost ? ghost.remove() : null;
            if (sibling == null) {
                (firstorlast as HTMLElement | null)?.focus();
            } else {
                (sibling as HTMLElement | null)?.focus();
            }
            e.preventDefault();
        }
    }
});

// Offset from original start
let interesting = 0; // Tracks amount of offsetFromOrigin instances.
export class offsetFromOrigin {
    absx: number = 0;
    absy: number = 0;
    /** If asbx and absy were defined before */
    absd: boolean = false;
    x: number = 0;
    y: number = 0;
    i: number // Represents the how manyth offsetFromOrigin instance it is.
    touch: boolean
    elm: HTMLElement;
    func (e: PointerEvent) {
        if (!this.absd) {
            this.absx = e.screenX;
            this.absy = e.screenY;
            this.absd = true;
        }
        this.x = e.screenX;
        this.y = e.screenY;
    }
    funcTouch (e: TouchEvent) {
        if (!(e.touches[0])) throw Error("TouchEvent without touches???", { cause: e });
        if (!this.absd) {
            this.absx = e.touches[0].screenX;
            this.absy = e.touches[0].screenY;
            this.absd = true;
        }
        this.x = e.touches[0].screenX;
        this.y = e.touches[0].screenY;
    }
    constructor(origin=null, touch=false) {
        this.elm = origin ? origin : document.body;
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
var ignoreContextMenuCancelOnce = false;
let mouseActionLastMovement: undefined | offsetFromOrigin = undefined;
// var galleryMouseRelevant = undefined;
window.addEventListener("load", async () => { // https://stackoverflow.com/a/27403353
    await Promise.all(systemd.all);
    var mouseTimer: undefined | ReturnType<typeof setTimeout>;
    var lastDown = 0; // use performance.now() for comparison
    function mouseDown(e: MouseEvent, elm=null) { 
        // console.log(e);
        if (lastDown > performance.now() - 300) return;
        lastDown = performance.now();
        if (e.button === 1) { // On middle click
            e.preventDefault();
            execMouseDown(e);
            return;
        }
        mouseActionLastMovement = new offsetFromOrigin(elm ?? null, e.type.includes("touch"));
        mouseTimer = window.setTimeout(()=>{execMouseDown(e)},settings.mouseActionDelay); //set timeout to fire in 300ms when the user presses mouse button down
    }
    
    function mouseUp() { 
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
    
    async function execMouseDown(e: MouseEvent) {
        if (/*settings.editorMode === false || */dragulaDragging === true || e.button == 2) {
            return;
        }
        if (e.button == 1) { // Middle Click delete
            if (e.target instanceof JGVMedia && galleryElm.contains(e.target)) {
                if (e.target.id) {
                    galleryElm.collection?.delete(e.target.id);
                }
            }
            return;
        }
        if (zoomPincher.moved) return;
        if (!(mouseActionLastMovement instanceof offsetFromOrigin)) return;
        if (distanceBetweenPoints([mouseActionLastMovement.absx, mouseActionLastMovement.absy], [mouseActionLastMovement.x, mouseActionLastMovement.y]) > 5) return;
        let eventobj = await constructorPrototypeCopyNoReadOnly(e);
        let vent = new PointerEvent("contextmenu", eventobj);
        (e.target as HTMLElement).dispatchEvent(vent);
    }
    async function touchToPointer(evt: TouchEvent) {
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
        mouseDown(await touchToPointer(e) as MouseEvent);
    });
    document.body.addEventListener("mouseup", mouseUp);  //listen for mouse up event on body, not just the element you originally clicked on
    document.body.addEventListener("touchend", async e => mouseUp());  //listen for mouse up event on body, not just the element you originally clicked on
    // Function above had originally `mouseUp(await touchToPointer(e)`, which uhh... did not even do anything??
    document.body.addEventListener("dragend", mouseUp);  //listen for mouse up event on body, not just the element you originally clicked on
})
