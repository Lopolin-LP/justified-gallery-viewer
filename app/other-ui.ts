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

// Fullscreen mode
export var ourFullscreen = false; // Is our fullscreen active? - KeyF
export var ourHiding = false; // Is our hiding active? - KeyH
export function toggleFullscreenGallery(options: { toggle?: boolean, noFullscreen?: boolean } = {}) { // Equivalent to {toggle:toggle=true, noFullscreen:noFullscreen=false}
    // Note: This function is using a lot of logic with bools. Be careful.
    const {toggle = true, noFullscreen = false} = options;
    const areWeAlreadyFullscreen = !!document.fullscreenElement;
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
}
