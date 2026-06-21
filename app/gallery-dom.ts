import Viewer from "viewerjs";
import type { MediaCollection, MediaCollectionMediaEvent } from "./database";
import { settings } from "./settings";
import { uuidtime, type UUIDTime } from "./util";
import { createGalleryViewer } from "./viewer";
import { updateStorageInfo } from "./other-ui";
import dragula, { type Drake } from "../dragula";
import { closeContextMenuHelper } from "./context-menu";

function typeOfMedia(mime: string): "image" | "video" | null {
    if (mime.includes("image/")) return "image";
    if (mime.includes("video/")) return "video";
    return null;
}

/** Gets the load promise of Media elements. Useful for ensuring there's enough data to do a proper Gallery Refresh */
function mediaElmsLoadPromises(...elms: JGVMedia[]): Promise<any>[] {
    return elms.map(elm => new Promise((resolve, reject) => {
        switch (elm.type) {
            case "image":
                const foundImg = elm.querySelector("img")!;
                foundImg.addEventListener("load", resolve);
                foundImg.addEventListener("error", reject);
                break;
            case "video":
                const foundVid = elm.querySelector("video")!;
                foundVid.addEventListener("loadedmetadata", resolve);
                foundVid.addEventListener("error", reject);
                break;
        
            default:
                break;
        }
    }));
}

export class JGVGalleryEvent extends Event {
    collection: MediaCollection;
    constructor(type: "collectionswitched", collection: MediaCollection) {
        super(type)
        this.collection = collection;
    }
}

/**
 * The JGV Gallery has two jobs:
 * - Do NOT send data to MediaCollections, only receive. (except ordering, since that is only done via Dragula)
 * - Represent the MediaCollection visually.
 * 
 * Other Notes:
 * - The constructor does NOT set a MediaCollection
 * - By default, a placeholder is shown if there are no Elements in the collection or no collection is set
 * - each Gallery has an ID. It's primarily used for the stylesheet, to allows seperate options per Gallery.
 * 
 * **If any UI element wants to save new media or similar, do NOT do it here. Use `this.collection.<action>`!!**
 */
export class JGVGallery extends HTMLElement {
    // protected placeholder: JGVMedia | undefined
    protected placeholder: JGVMedia = (() => {
        const placeholder = new JGVMedia("placeholder.svg", null, { type: "image" });
        placeholder.id = "placeholderImage";
        return placeholder;
    })();
    public collection: MediaCollection | undefined;
    public viewer: Viewer | undefined;
    protected styleElm: HTMLStyleElement | undefined;
    dragulaGallery: Drake | undefined;
    dragulaDragging: boolean = false;
    constructor() {
        super()
    }
    connectedCallback() { // https://developer.mozilla.org/en-US/docs/Web/API/Web_components/Using_custom_elements#custom_element_lifecycle_callbacks
        // Add Placeholder
        // this.placeholder = new JGVMedia("placeholder.svg", null, { type: "image" });
        // this.placeholder.id = "placeholderImage";
        this.placeholderPlacement(true);

        // Setup other things
        this.id = "gallery-" + uuidtime(); // MUST be setup here
        this.styleElm = document.createElement("style"); // TODO: If needed, add a destroy function to the Gallery, which also wipes this.
        document.head.appendChild(this.styleElm);

        // Viewer.JS
        this.viewer = createGalleryViewer(this);

        // Dragula
        this.dragulaGallery = dragula([this],{
            moves: function() {
                return settings.editorMode;
            }
        });
        this.dragulaGallery.on("drop", ()=>{
            // Dragula Drop events only modify already existing elements
            const newOrder = Array.from(this.children).map(v => v.id);
            this.collection?.reorder(newOrder); // The rest will be done automatically
        });
        this.dragulaGallery.on("drag", (el)=>{
            // Ignore any errors caused by extremely quick cancelling. 
            if (document.querySelector("#contextmenu.visible")) {
                // dragulaGallery.cancel();
                // console.info("%cIgnore \"Uncaught TypeError: e is null\" thrown by Dragula, it's a harmless bug.\n%cSee https://github.com/bevacqua/dragula/issues/275", "font-size: 2em; color: #af1c1c; background: #000", "")
                // return false;
                closeContextMenuHelper(el);
            }
            // let mmm = getDataMediaId(el);
            // if (mmm) { // NOTE: Most likely legacy code, as we switched from deleting images on hold to show the context menu
            //     if (tempListOfYeetedMedia.includes(mmm)) {
            //         this.dragulaGallery.cancel();
            //         return false;
            //     }
            // }
            this.dragulaDragging = true;
        });
        this.dragulaGallery.on("dragend", ()=>{
            this.dragulaDragging = false;
        });
    }
    connectedMoveCallback() {} // TODO: Does the above still run?
    /**
     * Enable or disable the Placeholder
     * @param enabled 
     */
    protected async placeholderPlacement(enabled: boolean): Promise<void> {
        if (enabled) {
            // Make sure there's no duplicates
            if (!this.contains(this.placeholder)) {
                this.append(this.placeholder);
            }
        } else {
            // > https://developer.mozilla.org/en-US/docs/Web/API/Element/remove
            // > "If it has no parent node, calling remove() does nothing."
            this.placeholder.remove();
        }
        await Promise.allSettled(mediaElmsLoadPromises(this.placeholder));
        this.refreshGallery();
    }
    protected catchCollectionEventUnknownFix = (event: unknown) => { this.catchCollectionEvent(event as MediaCollectionMediaEvent) };
    /**
     * Called when anything changes that has a representation in the JGVGallery UI (order, size, media count)
     */
    refreshGallery() {
        if (this.collection === undefined || this.collection.order.length === 0) {
            this.placeholderPlacement(true);
        } else {
            this.placeholderPlacement(false);
        }
        this.resetMediaSizes();
        updateStorageInfo();
        this.viewer?.update();
    }
    /**
     * Change this JGVGallery Element to represent a different `MediaCollection`, or one at all.
     * @param collection 
     */
    switchCollection(collection: MediaCollection) {
        if (this.collection) {
            const ev = this.collection.events;
            ev.removeEventListener("collectionmediaappended", this.catchCollectionEventUnknownFix);
            ev.removeEventListener("collectionmediaremoved", this.catchCollectionEventUnknownFix);
            ev.removeEventListener("collectionmediareordered", this.catchCollectionEventUnknownFix);
            this.empty();
        }
        this.collection = collection;
        // new collecion assigned
        if (this.collection.order.length === 0) {
            // If there are NO elements in this collection
            this.placeholderPlacement(true);
        } else {
            // If there ARE elements in this collection
            this.placeholderPlacement(false);
            const addableMedia = this.collection.order.map(id => ({blob: this.collection!.blobs[id]!, id: id}));
            this.addedMedia(...addableMedia);
        }
        const ev = this.collection.events;
        ev.addEventListener("collectionmediaappended", this.catchCollectionEventUnknownFix);
        ev.addEventListener("collectionmediaremoved", this.catchCollectionEventUnknownFix);
        ev.addEventListener("collectionmediareordered", this.catchCollectionEventUnknownFix);

        this.refreshGallery();
        // Dispatch Event
        this.dispatchEvent(new JGVGalleryEvent("collectionswitched", this.collection));
    }
    protected catchCollectionEvent(event: MediaCollectionMediaEvent) {
        switch (event.type) {
            case "collectionmediaappended":
                this.addedMedia(...event.affected as unknown as {blob: File | Blob, id: UUIDTime}[]);
                break;
            case "collectionmediaremoved":
                this.removedMedia(...event.affected!.map(v => v.id) as unknown as UUIDTime[]);
                break;
            case "collectionmediareordered":
                // NOTE: Dragula already does the ordering
                this.refreshGallery();
                break;
        
            default:
                break;
        }
    }
    /**
     * Add Media to the DOM. Accepts options as a spread list.
     * 
     * **Is order Dependant**
     * @param options 
     */
    protected async addedMedia(...options: { blob: File | Blob, id: UUIDTime }[]) {
        const elms = options.map(opt => new JGVMedia(opt.blob, opt.id));
        this.reversed ? this.append(...elms) : this.prepend(...elms);

        await Promise.allSettled(mediaElmsLoadPromises(...elms));
        this.refreshGallery();
    }
    /**
     * Remove Media from the DOM. Accepts a spread list of IDs
     * @param id 
     */
    protected removedMedia(...id: (UUIDTime | null)[]) {
        const noNullIds = id.filter(v => v !== null);
        Array.from(this.children).forEach(v => {
            if (noNullIds.includes(v.id)) v.remove();
        });
        this.refreshGallery();
    }
    /**
     * Recalculates the given heights for the Media elements.
     */
    resetMediaSizes() { // https://github.com/xieranmaya/blog/issues/6
        const children: JGVMedia[] = Array.from(this.children as HTMLCollectionOf<JGVMedia>);
        const cssArray = children.map((elm, index) => `#${this.id} > :nth-child(${index+1}) { ${elm.generateCSS()} }`);
        if (this.styleElm) this.styleElm.innerText = cssArray.join("\n");
    }
    /**
     * Empty the DOM. Please immediately load another collection, as we otherwise have a problem.
     */
    protected empty() {
        Array.from(this.children).forEach(v => v.remove());
    }
    public remove() {
        super.remove();
        if (this.styleElm) this.styleElm.remove();
    }
    /** If the media elements are reversed */
    reversed: boolean = false;
    /**
     * If the order of Media elements should be flipped.
     * @param status 
     * @returns 
     */
    public reverseChildren(status: boolean) {
        // Check if this call is redundant
        // If both status and reversed are the same, skip.
        if (status === this.reversed) return;
        for (let i = 1; i < this.childNodes.length; i++){
            this.insertBefore(this.childNodes[i] as Node, this.firstChild);
        }
        this.reversed = status;
    }
}
export class JGVMedia extends HTMLAnchorElement {
    type: "image" | "video";
    readonly src: string;
    constructor(media: string, id: UUIDTime | null, options: { type: "image" | "video" });
    constructor(media: File | Blob, id: UUIDTime); // Null is not an option here, because I said so and these CAN'T be a placeholder (because I have decreed so).
    constructor(media: string | File | Blob, id: UUIDTime | null, options?: { type?: "image" | "video" }) {
        super()
        // set type + src
        if (id) this.id = id;
        if (typeof media === "string") {
            if (!options!.type) throw new Error("A type must be set in options", { cause: options });
            switch (options!.type) {
                case "image":
                case "video":
                    this.type = options!.type;
                    break;
            
                default:
                    throw new Error("A valid type must be set in options", { cause: options?.type });
            }
            this.src = media;
        } else {
            const type = typeOfMedia(media.type);
            if (!type) throw new Error("Invalid Mime Type", { cause: media.type });
            this.type = type;
            this.src = URL.createObjectURL(media);
        }

        let mediaElement: HTMLImageElement | HTMLVideoElement;
        let mediaWidth: () => number, mediaHeight: () => number; // for ratio-ing, so JGV does its signature thing
        // Setup other specific to type things
        switch (this.type) {
            case "image":
                this.classList.add("image");
                mediaElement = document.createElement("img");
                mediaElement.src = this.src;

                // JGV things
                mediaWidth = () => { return (mediaElement as HTMLImageElement).naturalWidth };
                mediaHeight = () => { return (mediaElement as HTMLImageElement).naturalHeight };
                break;
            case "video":
                // Video parent
                this.classList.add("video");
                mediaElement = document.createElement("video");
                mediaElement.setAttribute("controls", "");

                // Video Source
                const videoElement = document.createElement("source");
                videoElement.src = this.src;

                // Video X button (for removing)
                const videoXButton = document.createElement("div");
                videoXButton.innerText = "X";
                videoXButton.classList.add("closer");
                videoXButton.addEventListener("click", (() => {
                    this.remove();
                }).bind(this));

                // Append
                mediaElement.append(videoElement);
                this.append(videoXButton);

                // JGV things
                mediaWidth = () => { return (mediaElement as HTMLVideoElement).videoWidth };
                mediaHeight = () => { return (mediaElement as HTMLVideoElement).videoHeight };
                break;
        
            default:
                throw new Error("how the fuck", { cause: this.type });
        }

        this.append(document.createElement("i"), mediaElement);

        this.mediaWidth = () => { return mediaWidth() * settings.rowHeight / mediaHeight() }; // TODO: Does this work without {} ?
        this.mediaRatioH = () => { return mediaHeight() / mediaWidth() }; // TODO: Make a better system that doesn't rely on functions.......

        window.addEventListener("unload", () => {
            URL.revokeObjectURL(this.src);
        });
    }
    connectedMoveCallback() {};
    disconnectedCallback() {
        try {
            URL.revokeObjectURL(this.src);
        } catch {}
    }
    mediaWidth: () => number;
    mediaRatioH: () => number;
    /**
     * Generate CSS that if it targets this element specifically can be used to give each element their correct ratio.
     * 
     * **WARNING! Cannot be used in `HTMLElement.style`, as it uses CSS selectors!**
     * ```css
     * #gallery > :nth-child(0) { generateCSS() output }
     * ```
     * @returns 
     */
    public generateCSS(): string {
        const mediaWidth = this.mediaWidth();
        return `width: ${mediaWidth}px; flex-grow: ${mediaWidth}; i { padding-bottom: ${this.mediaRatioH()*100}%; }`
    }
}

customElements.define("jgv-gallery", JGVGallery);
// no extends "main", otherwise this is not an autonomous element, and cannot directly be implemented in HTML: 
// - https://developer.mozilla.org/en-US/docs/Web/API/Web_components/Using_custom_elements#registering_a_custom_element
customElements.define("jgv-media", JGVMedia, { extends: "a" });
console.debug("Added JGV Gallery related elements!");

declare global {
    interface Window {
        JGVGallery: typeof JGVGallery,
        JGVMedia: typeof JGVMedia
    }
}

window.JGVGallery = JGVGallery;
window.JGVMedia = JGVMedia;