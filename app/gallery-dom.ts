import type { MediaCollection } from "./database";

export class JGVGallery extends HTMLElement {
    constructor() {
        super()
    }
    switchCollection(collection: MediaCollection) {

    }
}
export class JGVMedia extends HTMLAnchorElement {
    constructor() {
        super()
    }
}

customElements.define("jgv-gallery", JGVGallery, { extends: "main" });
customElements.define("jgv-media", JGVMedia, { extends: "a" });