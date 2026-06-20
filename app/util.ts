/*

Typescript tip:
If trying to index an object/{} where it's values arent't known, use Record<string, any>.

*/


// https://stackoverflow.com/a/37860657
/**
 * Reverse Children of a given Node
 * @param parent Target containing children
 */
// function reverseChildren(parent: Node) {
//     for (let i = 1; i < parent.childNodes.length; i++){
//         parent.insertBefore(parent.childNodes[i] as Node, parent.firstChild);
//     }
// }
// http://stackoverflow.com/questions/805107/creating-multiline-strings-in-javascript
// function mlString(f) {
//     return f.toString().
//         replace(/^[^\/]+\/\*!?\r?/, '').
//         replace(/\*\/[^\/]+$/, '');
// }
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

// because sometimes unexpected things happen
// var importantLoadPromises = [];
// var ILP_solver: Record<string, { resolve: Function, reject: Function }> = {};
// function addILP(codename: string) {
//     // makes a new promise to be resolved later by something
//     if (ILP_solver[codename]) {
//         throw new Error("Codename already in use.");
//     }
//     const prom = new Promise((resolve, reject) => {
//         ILP_solver[codename] = {
//             resolve: resolve,
//             reject: reject
//         }
//     })
//     importantLoadPromises.push(prom);
//     return {promise: prom, solver: ILP_solver[codename]};
// }
// function solveILP(codename: string, isrejected=false) {
//     // solve the promise, given you know its super secret codename
//     if (isrejected == true) {
//         ILP_solver?.[codename]?.reject();
//     } else {
//         ILP_solver?.[codename]?.resolve();
//     }
// }

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

export { uuid, uuidtime, isEmptyObject, removeFromArray, downloadURI, arrayInvertAxis, constructorPrototypeCopyNoReadOnly, confirmation, bytesToText, revokeBlobSoonTM };
export type { UUIDTime };
