import { galleryElm, navbar } from "./globals";
import { settings, settingsDo } from "./settings";
import { constructorPrototypeCopyNoReadOnly } from "./util";

// Allow Pinch for zoom
export let zoomPincher: {
    prevdiff: number,
    cache: PointerEvent[],
    build: number,
    lasttap: number,
    moved: boolean,
    maxtouches: number
} = {
    prevdiff: 0, // previous difference calculated every single move
    cache: [], // cache of at least two fingers
    build: 0, // buildup of differences until a threshold
    lasttap: -1000, // latest touch event was fired
    moved: false, // if during the tapping there was a movement fired at least once
    maxtouches: 0 // how many touches there were before the end
}
export function distanceBetweenPoints([pointAX, pointAY]: [number, number], [pointBX, pointBY]: [number, number]) {
    return Math.abs(
        Math.sqrt(
            (pointAX - pointBX)**2 +
            (pointAY - pointBY)**2
        )
    )
}
const zoomPincherConditionToCancel = (e: PointerEvent) => {return e.pointerType != "touch" || settings.editorMode == true;}
window.addEventListener("load", () => { // https://developer.mozilla.org/en-US/docs/Web/API/Pointer_events/Pinch_zoom_gestures
    function newTouch(e: PointerEvent) {
        if (zoomPincherConditionToCancel(e)) return;
        zoomPincher.cache.push(e);
        zoomPincher.lasttap = performance.now();
        zoomPincher.maxtouches = zoomPincher.maxtouches < zoomPincher.cache.length ? zoomPincher.cache.length : zoomPincher.maxtouches;
    }
    function moveTouch(e: PointerEvent) {
        if (zoomPincherConditionToCancel(e)) return;
        if (!(e.target instanceof HTMLElement)) return;
        zoomPincher.moved = true;
        const pointerIdIndex = zoomPincher.cache.findIndex((x) => x.pointerId == e.pointerId);
        zoomPincher.cache[pointerIdIndex] = e;
        if (zoomPincher.cache.length === 2 && ( // assert there's two touches. Might cause a time of check, time of use (TOCTOU) problem
            galleryElm.contains(e.target) || navbar.contains(e.target) || (document.querySelector("body > section") as HTMLElement).contains(e.target)
            /* check if target is either
               1. in the galleryElm,
               2. in the navbar, or
               3. in the first <section> of the body
            */
        )) {
            // The distance between the two
            const newdiff = distanceBetweenPoints(
                [zoomPincher.cache[0]!.clientX, zoomPincher.cache[0]!.clientY],
                [zoomPincher.cache[1]!.clientX, zoomPincher.cache[1]!.clientY]
            )
            if (zoomPincher.prevdiff != 0) zoomPincher.build += newdiff - zoomPincher.prevdiff
            if (Math.abs(zoomPincher.build) > 10) { // 10 because that's the steps of it
                const rowdiff = zoomPincher.build > 0 ? 10 : -10;
                zoomPincher.build -= rowdiff;
                const rowHeightSettingElm = document.getElementById("rowHeight") as HTMLInputElement;
                const rownum = Number(rowHeightSettingElm.value) + rowdiff;
                if (Number(rowHeightSettingElm.min) <= rownum && rownum <= Number(rowHeightSettingElm.max)) {
                    rowHeightSettingElm.value = rownum.toString();
                    settingsDo("rowHeight", rownum);
                }
            }
            zoomPincher.prevdiff = newdiff;
        }
    }
    function endTouch(e: PointerEvent) {
        if (zoomPincherConditionToCancel(e) || zoomPincher.cache.findIndex((x) => x.pointerId === e.pointerId) == -1) return; // make sure we only execute once instead of SIX TIMES.
        zoomPincher.cache.splice(zoomPincher.cache.findIndex((x) => x.pointerId == e.pointerId), 1);
        if (zoomPincher.cache.length < 2) zoomPincher.prevdiff = 0;
        if (zoomPincher.cache.length === 0 && zoomPincher.maxtouches == 2 && zoomPincher.moved == false && performance.now() - zoomPincher.lasttap <= settings.mouseActionDelay) {
            (async () => {
                e.target?.dispatchEvent(new PointerEvent("contextmenu", await constructorPrototypeCopyNoReadOnly(e)));
            })();
        }
        if (zoomPincher.cache.length === 0) { zoomPincher.moved = false; zoomPincher.maxtouches = 0 }
    }
    document.body.addEventListener("pointerdown", newTouch);
    document.body.addEventListener("pointermove", moveTouch);
    document.body.addEventListener("pointerup", endTouch);
    document.body.addEventListener("pointercancel", endTouch);
    document.body.addEventListener("pointerout", endTouch);
    document.body.addEventListener("pointerleave", endTouch);
});
