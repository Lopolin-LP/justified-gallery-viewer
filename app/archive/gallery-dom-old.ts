// import { media2db, yeetMedia } from "./database-old";

// // function getDataMediaId<T extends boolean>(node: Element, returnNode?: T): (typeof returnNode extends true ? HTMLElement : string) | null // https://stackoverflow.com/a/52818072
// function getDataMediaId(node: Element, returnNode: true): (HTMLImageElement | HTMLVideoElement) | null
// function getDataMediaId(node: Element, returnNode: false): string | null
// function getDataMediaId(node: Element): string | null
// function getDataMediaId(node: Element, returnNode: boolean = false): (HTMLImageElement | HTMLVideoElement) | string | null {
//     let finalnode: (HTMLImageElement | HTMLVideoElement) | null = null;
//     if (node.querySelector("[data-media-id]") && node.querySelectorAll("[data-media-id]").length == 1) {
//         finalnode = node.querySelector("[data-media-id]");
//     } else if (node.getAttribute("data-media-id")) {
//         finalnode = node as (HTMLImageElement | HTMLVideoElement);
//     }
//     if (returnNode === true) {
//         return finalnode ?? null;
//     } else {
//         return finalnode ? finalnode.getAttribute("data-media-id") : null;
//     }
// }

// async function createIMG(blob: Blob | File, id: string | undefined = undefined, save: boolean = true) {
//     // blob: image data
//     // id: the ID as which the Media should be identified as.
//     // save: if we should save the media to the DB. If an ID is given it will be saved with that ID.
//     // console.log(blob, id, save);
//     if (save) {
//         if (id) {
//             id = await media2db("img", blob, id); // media2db returns uuid
//         } else {
//             id = await media2db("img", blob);
//         }
//     }
//     if (id === undefined) {
//         throw new Error("ID cannot be undefined!");
//     }
//     let img_c = document.createElement("a");
//     img_c.classList.add("image");

//     let img = document.createElement("img");
//     img.src = URL.createObjectURL(blob);
//     img.setAttribute("data-media-id", id);
    
//     let padder = document.createElement("i");
    
//     img_c.appendChild(padder);
//     img_c.appendChild(img);
//     let solver: Function | undefined = undefined;
//     let onScrewed = function() { // because sometimes it doesn't want to decode
//         solver?.();
//         yeetMedia(id);
//         return undefined;
//     }
//     await new Promise<any>(resolve => {
//         solver = resolve;
//         img.onload = resolve; // wait for image to get attributes
//         img.onerror = onScrewed;
//         if (img.complete) {
//             (resolve as Function)();
//         }
//     });
//     return img_c;
// }
// async function createVID(blob: Blob | File, id: string | undefined = undefined, save: boolean = true) { // dumbass look at this https://www.lightgalleryjs.com/demos/video-gallery/
//     // blob: video data
//     // id: the ID as which the Media should be identified as.
//     // save: if we should save the media to the DB. If an ID is given it will be saved with that ID.
//     if (save) {
//         if (id) {
//             id = await media2db("img", blob, id); // media2db returns uuid
//         } else {
//             id = await media2db("img", blob);
//         }
//     }
//     if (id === undefined) {
//         throw new Error("ID cannot be undefined!");
//     }
//     let vid_c = document.createElement("a");
//     vid_c.classList.add("video");

//     let vid = document.createElement("video");
//     vid.setAttribute("controls", "");
//     vid.setAttribute("data-media-id", id);

//     let vid_s = document.createElement("source");
//     vid_s.src = URL.createObjectURL(blob);
//     vid_s.type = blob.type;

//     let vid_x = document.createElement("div");
//     vid_x.innerText = "X";
//     vid_x.classList.add("closer");
//     vid_x.onclick = function (e: PointerEvent) {
//         const finalId = (e.target as Element).parentElement?.querySelector("video")?.getAttribute("data-media-id") as string;
//         yeetMedia(finalId);
//     }

//     let padder = document.createElement("i");

//     vid.appendChild(vid_s);
//     vid_c.appendChild(padder);
//     vid_c.appendChild(vid);
//     vid_c.appendChild(vid_x);
//     let solver: Function | undefined = undefined;
//     let onScrewed = function() { // because sometimes it doesn't want to decode
//         solver?.();
//         yeetMedia(id);
//         return undefined;
//     }
//     await new Promise<any>(resolve => {
//         solver = resolve;
//         vid.onloadedmetadata = resolve;
//         vid.onerror = onScrewed;
//         vid_s.onerror = onScrewed;
//         if (vid.readyState > 0) {
//             (resolve as Function)();
//         }
//     });
//     return vid_c;
// }

// export { getDataMediaId, createIMG, createVID }