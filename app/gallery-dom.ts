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
    protected placeholder: JGVMedia
    public collection: MediaCollection | undefined;
    public viewer: Viewer;
    protected styleElm: HTMLStyleElement;
    dragulaGallery: Drake;
    dragulaDragging: boolean = false;
    constructor() {
        super()
        // Add Placeholder
        this.placeholder = new JGVMedia("placeholder.svg", null, { type: "image" });
        this.placeholder.id = "placeholderImage";
        this.placeholderPlacement(true);

        // Setup other things
        this.id = "gallery-" + uuidtime();
        this.styleElm = document.createElement("style"); // TODO: If needed, add a destroy function to the Gallery, which also wipes this.
        document.head.appendChild(this.styleElm);

        // Viewer.JS
        this.viewer = createGalleryViewer();

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
    /**
     * Enable or disable the Placeholder
     * @param enabled 
     */
    protected placeholderPlacement(enabled: boolean): void {
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
    }
    protected catchCollectionEventUnknownFix = (event: unknown) => { this.catchCollectionEvent(event as MediaCollectionMediaEvent) };
    /**
     * Called when anything changes that has a representation in the JGVGallery UI  (order, size, media count)
     */
    refreshGallery() {
        this.resetMediaSizes();
        updateStorageInfo();
        this.viewer.update();
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
    protected addedMedia(...options: { blob: File | Blob, id: UUIDTime }[]) {
        const elms = options.map(opt => new JGVMedia(opt.blob, opt.id));
        this.append(...elms);
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
     * Do the JGV
     */
    protected resetMediaSizes() { // https://github.com/xieranmaya/blog/issues/6
        const children: JGVMedia[] = Array.from(this.children as HTMLCollectionOf<JGVMedia>);
        const cssArray = children.map((elm, index) => `#${this.id} > :nth-child(${index+1}) > { ${elm.generateCSS()} }`);
        this.styleElm.innerText = cssArray.join("\n");
    }
    /**
     * Empty the DOM. Please immediately load another collection, as we otherwise have a problem.
     */
    protected empty() {
        Array.from(this.children).forEach(v => v.remove());
    }
    public remove() {
        super.remove();
        this.styleElm.remove();
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
        let mediaWidth: number, mediaHeight: number; // for ratio-ing, so JGV does its signature thing
        // Setup other specific to type things
        switch (this.type) {
            case "image":
                this.classList.add("image");
                mediaElement = document.createElement("img");
                mediaElement.src = this.src;

                // JGV things
                mediaWidth = mediaElement.naturalWidth;
                mediaHeight = mediaElement.naturalHeight;
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

                // JGV things
                mediaWidth = mediaElement.videoWidth;
                mediaHeight = mediaElement.videoHeight;
                break;
        
            default:
                throw new Error("how the fuck", { cause: this.type });
        }

        this.append(document.createElement("i"), mediaElement);

        this.mediaWidth = () => { return mediaWidth * settings.rowHeight / mediaHeight }; // TODO: Does this work without {} ?
        this.mediaRatioH = mediaHeight / mediaWidth;
    }
    /**
     * Remove Media Element properly. Revokes Object URL.
     */
    public remove() {
        super.remove();
        try {
            URL.revokeObjectURL(this.src);
        } catch {}
    }
    mediaWidth: () => number;
    mediaRatioH: number;
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
        return `width: ${mediaWidth}px; flex-grow: ${mediaWidth}; i { padding-bottom: ${this.mediaRatioH*100}%;`
    }
}

customElements.define("jgv-gallery", JGVGallery, { extends: "main" });
customElements.define("jgv-media", JGVMedia, { extends: "a" });