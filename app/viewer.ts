import type { JGVGallery } from "./gallery-dom";
import { galleryElm } from "./globals";
import { settings } from "./settings";
import Viewer from "viewerjs";

var viewerAmIcurrentlyBeingResizedCuzIfNotImmaRescale: ReturnType<typeof setTimeout>;
// var viewerIsFooterShown = false;

type viewerThisVar = { viewer: RuntimeViewer }
function resizeViewerSetup(thisVar: viewerThisVar) {
    // Make transitions less shit
    thisVar.viewer.viewer.addEventListener('pointerdown', () => {
        thisVar.viewer.image.classList.remove("viewer-special-transition");
    })
    thisVar.viewer.viewer.addEventListener('pointerup', () => {
        thisVar.viewer.image.classList.add("viewer-special-transition");
    })
}
/**
 * Function to run when window is resized and.
 * @param thisVar the `this` var of `new Viewer(...)`.
 * @returns 
 */
async function resizeViewer(thisVar: viewerThisVar) {
    if (!thisVar.viewer.isShown) {
        // if viewer is not shown, don't continue.
        return;
    }
    thisVar.viewer.image.classList.remove("viewer-special-transition");
    let footer_no_title_height, image_height, image_width, screen_height, screen_width, scale_to_width, scale_to_height, zoomy;
    if (settings.kivbbo == true) {
        footer_no_title_height = thisVar.viewer.footer.clientHeight - (thisVar.viewer.footer.querySelector(".viewer-title") as HTMLElement).clientHeight;
        image_height = thisVar.viewer.image.naturalHeight;
        image_width = thisVar.viewer.image.naturalWidth;
        screen_height = thisVar.viewer.viewer.clientHeight - (footer_no_title_height);
        screen_width = thisVar.viewer.viewer.clientWidth;
        scale_to_width = screen_width/image_width;
        scale_to_height = screen_height/image_height;
        zoomy = scale_to_height;
    } else {
        image_height = thisVar.viewer.image.naturalHeight;
        image_width = thisVar.viewer.image.naturalWidth;
        screen_height = thisVar.viewer.viewer.clientHeight;
        screen_width = thisVar.viewer.viewer.clientWidth;
        scale_to_width = screen_width/image_width;
        scale_to_height = screen_height/image_height;
        zoomy = scale_to_height;
    }
    if (scale_to_width < scale_to_height) {
        zoomy = scale_to_width;
    }
    thisVar.viewer.zoomTo(zoomy);
    // Change to Element size, as we now deal with the positioning, not the zoom.
    image_height = thisVar.viewer.image.height;
    image_width = thisVar.viewer.image.width;
    thisVar.viewer.moveTo((screen_width-image_width)/2, (screen_height-image_height)/2);
    // Give it time to render
    setTimeout(() => {
        thisVar.viewer.image.classList.add("viewer-special-transition");
    }, 100);
}

function createGalleryViewer(gallery: JGVGallery): Viewer { // look into other viewers: https://www.reddit.com/r/webdev/comments/15c1xvc/whats_your_goto_gallerylightbox_library/
    const view = new Viewer(gallery, {
        transition: false,
        tooltip: false,
        slideOnTouch: false, // Allow mobile users to move images
        ready() {
            const beMyGuest = this;
            window.addEventListener("resize", ()=>{
                clearTimeout(viewerAmIcurrentlyBeingResizedCuzIfNotImmaRescale);
                viewerAmIcurrentlyBeingResizedCuzIfNotImmaRescale = setTimeout(()=>{
                    resizeViewer(beMyGuest as viewerThisVar);
                }, 100)
            });
            resizeViewerSetup(this as viewerThisVar);
        },
        shown() {
            if (document.querySelector("#contextmenu.visible")) {
                view.hide();
            }
        },
        viewed() {
            resizeViewer(this as viewerThisVar);
        },
        toolbar: {
            oneToOne: true,
            flipHorizontal: true,
            flipVertical: true,
            zoomIn: true,
            zoomOut: true,
            play: false,
            next: true,
            prev: true,
            rotateLeft: true,
            rotateRight: true,
            reset: () => {
                resizeViewer({viewer: view as RuntimeViewer});
            }
        }
    });
    return view;
}

export {
    resizeViewerSetup,
    resizeViewer,
    createGalleryViewer
}