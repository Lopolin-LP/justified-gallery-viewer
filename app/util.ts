import { getLogger, type Logger } from "@logtape/logtape";

// http://stackoverflow.com/questions/805107/creating-multiline-strings-in-javascript
// function mlString(f) {
//     return f.toString().
//         replace(/^[^\/]+\/\*!?\r?/, '').
//         replace(/\*\/[^\/]+$/, '');
// }
// TODO: Keep above?
/**
 * Generate a UUID (not RFC compliant)
 * @param length
 * @returns 
 */
function uuid(length: number) { /* https://stackoverflow.com/a/1349426 */
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
        counter += 1;
    }
    return result;
}
/**
 * Create a time-based UUID, to minimize duplicates.
 * @returns 
 */
function uuidtime(): string {
    return uuid(16) + new Date().getTime();
}
/**
 * Return type of `uuidtime()`
 */
type UUIDTime = ReturnType<typeof uuidtime>;
/**
 * Check if object is empty
 * @param obj 
 * @returns 
 */
function isEmptyObject(obj: Object) {
    // https://stackoverflow.com/a/59787784
    for (const i in obj) return false;
    return true;
}
/**
 * Remove a given element from array, then return the cleaned array.
 * @param arr 
 * @param elm 
 * @returns 
 */
function removeFromArray(arr: any[], elm: any) {
    // Returns the cleaned array
    let i = arr.indexOf(elm);
    arr.splice(i, 1);
    return arr;
}
/**
 * Make User's Browser download a given URL (such as a blob)
 * @param uri 
 * @param name 
 */
async function downloadURI(uri: string, name?: string) { // https://stackoverflow.com/a/54626214
    if (!name) {
        if ((new URL(uri)).protocol === "blob:") {
            let blobby: Blob | File = await fetch(uri).then(r => r.blob());
            if (blobby.constructor == File) {
                name = blobby.name;
            } else {
                name = "Unnamed";
            }
        } else {
            name = "Unnamed";
        }
    }
    let link = document.createElement("a");
    link.download = name;
    link.href = uri;
    link.click();
}
/**
 * Revokes a Blob URL soon™. Useful to call after downloading a blob that you don't need anymore after that.
 * @param bloburl 
 */
function revokeBlobSoonTM(bloburl: string) {
    setTimeout(() => {
        URL.revokeObjectURL(bloburl)
    }, 5000)
}

/**
 * Flip axis of 2D Array.
 * 
 * Basically:
 * ```json
 * [
 *     [1, 2],
 *     [3, 4]
 * ]
 * ```
 * will become
 * ```json
 * [
 *     [1, 3],
 *     [2, 4]
 * ]
 * ```
 * @param array 
 * @returns Regarding TypeScript, just do a `as unknown as ...` thing, it's too hard to make it easier
 */
function arrayInvertAxis(array: any[][]): any[][] { // Self-made, not copied! You can steal it if you want to >:P
    // array: Array with arrays inside.
    // This "flips" their axis.
    let result: any = [];
    array.forEach((elm1, i1) => {
        elm1.forEach((elm2: any, i2: any) => {
            result[i2] = result[i2] ?? []; // If it's not there yet, set it
            result[i2][i1] = elm2;
        });
    })
    return result;
}
/**
 * Some objects are read only (for some reason). This makes a copy and makes it writable after creation.
 * @param obj 
 * @returns object copy
 */
async function constructorPrototypeCopyNoReadOnly(obj: Record<string, any>) { // Copies object and makes it writable
    if (Object.getPrototypeOf(obj) === Object.getPrototypeOf({})) return obj; // if it's already an object, just return it
    let prototypes: string[] = [];
    let newobj: Record<string, any> = {};
    const callback = (item: string) => {
        prototypes.push(item);
    }
    async function constructorPrototypeCopyNoReadOnly_helper(obj: object, callback: Function) {
        return await new Promise<void>(async (resolve) => {
            if (!Object.getPrototypeOf(obj)) {
                resolve();
                return;
            }
            Object.keys(Object.getPrototypeOf(obj)).forEach((val) => {
                callback(val);
            });
            if (!Object.getPrototypeOf(obj)) {
                resolve();
                return;
            }
            if (Object.getPrototypeOf(Object.getPrototypeOf(obj)) !== Object.getPrototypeOf(obj)) {
                await constructorPrototypeCopyNoReadOnly_helper(Object.getPrototypeOf(obj), callback);
                resolve();
            } else {
                resolve();
            }
        })
    }
    await constructorPrototypeCopyNoReadOnly_helper(obj, callback);
    prototypes.forEach((val) => {
        newobj[val] = obj[val];
    })
    return newobj;
}

// Confirmation Dialogs
/**
 * Create a confirmation dialogue and show it to the user. Overlaps all UI elements.
 * @param msg Message
 * @param callback Function to call when confirmed
 * @param callbackNo Function to call when cancelled
 */
function confirmation(msg: string, callback: Function, callbackNo?: Function) {
    let popupid = uuidtime();
    let parent = document.createElement("div");
    parent.classList.add("confirmation");
    parent.id = popupid;
    let child = document.createElement("div");
    let alt_cancel = document.createElement("div");
    alt_cancel.classList.add("confirmation-bg-cancel");
    alt_cancel.onclick = ()=>{
        callbackNo?.();
        document.getElementById(popupid)?.remove();
    };

    let header = document.createElement("h1");
    header.innerHTML = msg;
    let cancel = document.createElement("button");
    cancel.innerText = "Cancel";
    cancel.classList.add("confirmation-cancel")
    cancel.onclick = ()=>{
        callbackNo?.();
        document.getElementById(popupid)?.remove();
    };
    let confirm = document.createElement("button");
    confirm.innerText = "Confirm";
    confirm.classList.add("confirmation-confirm")
    confirm.onclick = ()=>{
        callback();
        document.getElementById(popupid)?.remove();
    };

    child.append(header, cancel, confirm);
    parent.append(child, alt_cancel);
    document.body.append(parent);
}

type PopupWithQuestionsQuestion = {
    question: string,
    choices: {
        answer: string,
        callback: (answer: string) => any
    }[]
}

/** TODO: Find a use case */
class PopupWithQuestions {
    constructor(quiz: PopupWithQuestionsQuestion) {
        const parentId = uuidtime();
        const parent = document.createElement("div");

        parent
    }
}

function bytesToText(num: number, depth = 0) {
    for (; String(Math.round(num)).length > 3 && depth < 5; depth++) {
        num /= 1000; // Cuz we're doing "metric" bytes, not *ibibytes
    }
    let append = " ";
    switch (depth) {
        case 0:
            append += "B";
            break;
        case 1:
            append += "KB";
            break;
        case 2:
            append += "MB";
            break;
        case 3:
            append += "GB";
            break;
        case 4:
            append += "TB";
            break;
        default:
            append += "PB"; // I think we're beyond reason now
            break;
    }
    // if (Math.round(num*10) != 10) append += "s"; // Used if text were "Megabyte" and stuff
    return num.toFixed(1) + append;
}

namespace StatusIcons {
    export type type = "something" | "database" | "zip" | "file-export" | "file-import" | "error" | "media-load";
}

class StatusIcons {
    logger: Logger;
    /** children will be icons */
    parent: Promise<HTMLDivElement>;
    protectedResolveParent: (p: HTMLDivElement) => void;
    /** sets the parent element */
    setParent(p: HTMLDivElement) {
        this.protectedResolveParent(p);
    }
    /** contains status icons associated to ID for removal */
    elms: Record<string, HTMLSpanElement> = {};
    queue: ({
        action: "add",
        id: string,
        type: StatusIcons.type,
        retries?: number
    } | {
        action: "remove",
        id: string,
        retries?: number
    })[] = [];
    constructor() {
        const resolvers = Promise.withResolvers();
        this.protectedResolveParent = resolvers.resolve;
        this.parent = resolvers.promise as Promise<HTMLDivElement>;
        this.logger = getLogger(["JGV", "StatusIcons"]);
    }
    createIcon(type: StatusIcons.type): HTMLSpanElement {
        const icon = document.createElement("span");
        icon.classList.add("status-icon", "icon-" + type);
        switch (type) {
            case "something":
                icon.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-loader-4"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M12 21v-3m6.36 .36l-2.12 -2.12m4.76 -4.24h-3m.36 -6.36l-2.12 2.12m-4.24 -4.76v3m-6.36 -.36l2.12 2.12m-3.76 4.24h2m1 4.95l.71 -.71" /></svg>`;
                icon.title = "Something is happening";
                break;
            case "zip":
                icon.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-zip"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M16 16v-8h2a2 2 0 1 1 0 4h-2" /><path d="M12 8v8" /><path d="M4 8h4l-4 8h4" /></svg>`;
                icon.title = "A .zip is being zipped/unzipped";
                break;
            case "database":
                icon.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-database"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M4 6a8 3 0 1 0 16 0a8 3 0 1 0 -16 0" /><path d="M4 6v6a8 3 0 0 0 16 0v-6" /><path d="M4 12v6a8 3 0 0 0 16 0v-6" /></svg>`;
                icon.title = "Database is being accessed";
                break;
            case "file-export":
                icon.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-file-export"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M14 3v4a1 1 0 0 0 1 1h4" /><path d="M11.5 21h-4.5a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v5m-5 6h7m-3 -3l3 3l-3 3" /></svg>`;
                icon.title = "JGVDB export in progress";
                break;
            case "file-import":
                icon.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-file-import"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M14 3v4a1 1 0 0 0 1 1h4" /><path d="M5 13v-8a2 2 0 0 1 2 -2h7l5 5v11a2 2 0 0 1 -2 2h-5.5m-9.5 -2h7m-3 -3l3 3l-3 3" /></svg>`;
                icon.title = "JGVDB import in progress";
                break;
            case "media-load":
                icon.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-photo"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M15 8h.01" /><path d="M3 6a3 3 0 0 1 3 -3h12a3 3 0 0 1 3 3v12a3 3 0 0 1 -3 3h-12a3 3 0 0 1 -3 -3v-12" /><path d="M3 16l5 -5c.928 -.893 2.072 -.893 3 0l5 5" /><path d="M14 14l1 -1c.928 -.893 2.072 -.893 3 0l3 3" /></svg>`;
                icon.title = "Waiting for Media to be decoded (height, width)";
                break;
            case "error":
                icon.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-exclamation-circle"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M3 12a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" /><path d="M12 9v4" /><path d="M12 16v.01" /></svg>`;
                icon.title = "Something went wrong, check console";
                icon.style.color = "var(--accent)";
                break;
        
            default:
                break;
        }
        return icon;
    }
    protected processQueueLocked: boolean = false;
    async processQueue() {
        if (this.processQueueLocked) return;
        this.processQueueLocked = true;
        const parent = await this.parent;
        const current = this.queue.shift();
        if (!current) {
            this.processQueueLocked = false;
            return;
        };
        current.retries ??= 0;

        if (current.action === "add" && this.elms[current.id] === undefined) { // discards if ID is already used
            const icon = this.createIcon(current.type);
            if (current.type === "error") {
                icon.addEventListener("click", () => {
                    this.remove(current.id);
                });
                icon.style.cursor = "crosshair";
            }
            this.elms[current.id] = icon;
            parent.append(icon);
            this.logger.debug("Added Icon {id} as {type}", { type: current.type, id: current.id });
        } else if (current.action === "remove" && current.retries < 3) { // discards after 3 tries
            const elm = this.elms[current.id];
            if (elm) {
                delete this.elms[current.id];
                setTimeout(() => { // additional timeout because we may add it to the dom and IMMEDIATELY give it the "aboutToDie" class, negating the transition effect
                    elm.classList.add("aboutToDie");
                    setTimeout(() => {
                        elm.remove();
                    }, 300);
                }, 10);
                this.logger.debug("Removed Icon {id}", { id: current.id });
            } else {
                current.retries += 1;
                this.queue.push(current);
            }
        }

        this.processQueueLocked = false;
        this.processQueue();
    }
    add<T extends string>(id: T, type: StatusIcons.type): T {
        this.queue.push({
            id: id,
            type: type,
            action: "add"
        });
        this.processQueue();
        return id;
    }
    remove<T extends string>(id: T): T {
        this.queue.push({
            id: id,
            action: "remove"
        });
        this.processQueue();
        return id;
    }
    removeWithError<T extends string>(id: T): T {
        this.queue.push({
            id: id,
            action: "remove"
        });
        const errorId = uuidtime()
        this.queue.push({
            id: errorId,
            action: "add",
            type: "error"
        });
        this.processQueue();
        return id;
    }
}

export { uuid, uuidtime, isEmptyObject, removeFromArray, downloadURI, arrayInvertAxis, constructorPrototypeCopyNoReadOnly, confirmation, bytesToText, revokeBlobSoonTM, StatusIcons };
export type { UUIDTime };
