// import { galleryElm, mediaSizesStylesheet, systemd, viewer } from "./globals";
// import { settings } from "./settings";
import { bytesToText } from "./util";

export async function updateStorageInfo() {
    // As we may call this in a function where we SHOULDN'T error, we'll play it safe.
    try {
        const result = await navigator.storage.estimate();
        (document.getElementById("storageinfo") as HTMLElement).innerText = `${bytesToText(result.usage ?? NaN)} (${((result.usage ?? NaN)/(result.quota ?? NaN)*100).toFixed(1)}%) / ${bytesToText(result.quota ?? NaN)}`;
    } catch (error) {
        console.error(error);
    }
}

// export async function refreshGallery() {
//     await Promise.all(systemd.all);
//     function actualRefresh() {
//         // Actually refreshing the gallery
//         resetMediaSizes();
//         viewer.update();
//     }
//     let waitWithRefresh = false;
//     // Placeholder stuff
//     if (galleryElm.childElementCount !== 1 && document.getElementById("placeholderImage")) {
//         (document.getElementById("placeholderImage") as HTMLElement).remove();
//     }
//     if (galleryElm.childElementCount === 0 && !document.getElementById("placeholderImage")) {
//         waitWithRefresh = true;
//         galleryElm.prepend(new DOMParser().parseFromString(`<a id="placeholderImage" class="image"><i></i><img src="placeholder.svg"></a>`, "text/html").body.firstChild as Node);
//         let img = document.getElementById("placeholderImage")!.querySelector("img") as HTMLImageElement;
//         if (img.complete) {
//             actualRefresh();
//         } else {
//             img.addEventListener('load', function() {
//                 actualRefresh();
//             })
//             img.addEventListener('error', function(e) {
//                 console.error(e);
//                 actualRefresh();
//             })
//         }
//     }
//     if (!waitWithRefresh) {
//         actualRefresh();
//     }
// }

// export async function resetMediaSizes(resetInlineStyles=false) { // https://github.com/xieranmaya/blog/issues/6
//     await systemd.promises["galleryFirstLoad"];
//     let copyOfGalleryChildren = galleryElm.children as HTMLCollectionOf<HTMLElement>; // just in case the children change in the middle of this
//     let styleContent = "";
//     let createEntry: (i: number, width: number, grow: number, padding: number) => void;
//     if (settings.oldMediaHoverReorderingBehaviour) { // Written this way so we only check this once; idk if this complicated mess is worth the overhead saved
//         createEntry = (i, width, grow, padding) => {
//             if (!copyOfGalleryChildren[i]) return;
//             copyOfGalleryChildren[i].style.width = `${width}px`;
//             copyOfGalleryChildren[i].style.flexGrow = `${grow}`;
//             copyOfGalleryChildren[i].querySelector("i")!.style.paddingBottom = `${padding*100}%`;
//         }
//     } else {
//         createEntry = (i, width, grow, ratioH) => {
//             styleContent += `#gallery > :nth-child(${i+1}) { width: ${width}px; flex-grow: ${grow}; i { padding-bottom: ${ratioH*100}%; } }\n`;
//         }
//     }
//     for (let i = 0; i < copyOfGalleryChildren.length; i++) {
//         let media = copyOfGalleryChildren[i] as HTMLElement;
        
//         let mediaWidth, mediaHeight;
//         // let padder = media.querySelector("i");
//         let imgElm = media.querySelector("img");
//         let vidElm = media.querySelector("video");
//         if (imgElm) {
//             mediaWidth = imgElm.naturalWidth;
//             mediaHeight = imgElm.naturalHeight;
//         } else if (vidElm) {
//             mediaWidth = vidElm.videoWidth;
//             mediaHeight = vidElm.videoHeight;
//         } else {
//             throw new Error("NEITHER IMAGE NOR VIDEO, CRASHING...", { cause: media });
//         }
//         let elmWidth = mediaWidth * settings.rowHeight / mediaHeight;
//         createEntry(i, elmWidth, elmWidth, mediaHeight / mediaWidth);
//     }
//     mediaSizesStylesheet.innerText = styleContent;
//     if (resetInlineStyles) {
//         for (let media of copyOfGalleryChildren) {
//             // media.style.removeProperty("width");
//             // media.style.removeProperty("flex-grow");
//             // media.style.removeProperty("aspect-ratio");
//             // media.querySelector("i").style.removeProperty("padding-bottomw");
//             // This is the weirdest bug I've seen: trying to remove all the properties above like that makes the padding be the height of the image, while when we remove the style attribute entirely (instead of leaving it empty) the image respects the height imposed by the padding. WHY?!
//             media.removeAttribute("style");
//             media.querySelector("i")!.removeAttribute("style");
//         }
//     }
// }

// Fullscreen mode
export var ourFullscreen = false; // Is our fullscreen active? - KeyF
export var ourHiding = false; // Is our hiding active? - KeyH
export function toggleFullscreenGallery(options: { toggle?: boolean, noFullscreen?: boolean } = {}) { // Equivalent to {toggle:toggle=true, noFullscreen:noFullscreen=false}
    // Note: This function is using a lot of logic with bools. Be careful.
    const {toggle = true, noFullscreen = false} = options;
    const areWeAlreadyFullscreen = !!document.fullscreenElement;
    // console.log("\n")
    // console.log(ourFullscreen, ourHiding, areWeAlreadyFullscreen, noFullscreen, toggle)
    // Fullscreen Function Because ViewerJS has their own Fullscreen
    if (!noFullscreen) {
        if (areWeAlreadyFullscreen) {
            document.exitFullscreen();
        } else {
            document.documentElement.requestFullscreen().catch(err => {
                // In case ESC is used instead of F
                ourFullscreen = false;
                document.documentElement.classList.remove("fullscreen");
            })
        }
    }
    // Toggle Fullscreen Class in (non-)fullscreen mode
    if (!areWeAlreadyFullscreen || !noFullscreen) { // When in hiding mode OR when we aren't already fullscreen:
        if (document.documentElement.classList.contains("fullscreen")) {
            document.documentElement.classList.remove("fullscreen");
        } else if (!ourHiding) {
            document.documentElement.classList.add("fullscreen");
        }
        // Edge case: Switching from hiding to fullscreen
        if (!document.documentElement.classList.contains("fullscreen") && ourHiding && !noFullscreen) {
            // IF: we don't have the fullscreen class anymore (removed in if-statement earlier), Hiding mode is active and we are toggling fullscreen (not hiding mode)
            document.documentElement.classList.add("fullscreen");
            ourHiding = false; // Disable hiding mode
        }
    }
    // No extra function for Fullscreen without hiding elements needed, browser F11 can do that as well.
    // keep track if our fullscreen is active or not
    if (!noFullscreen && toggle) {
        ourFullscreen = !ourFullscreen;
    }
    if (noFullscreen && !areWeAlreadyFullscreen && toggle) {
        ourHiding = !ourHiding;
    }
    // console.log(ourFullscreen, ourHiding, areWeAlreadyFullscreen)
}

