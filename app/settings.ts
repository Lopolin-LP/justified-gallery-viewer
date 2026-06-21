import { galleryElm, mediaSizesStylesheet, systemd } from "./globals";
// import { refreshGallery, resetMediaSizes } from "./other-ui";

// Settings management
type settings_true_object = Partial<Record<settings_valid, any>>;
let LOCAL_FOR_OBJECT_ONLY_settings: settings_true_object & { replaceObject: (obj: settings_true_object) => void } = JSON.parse(localStorage.getItem("settings") as string) ?? new Object();

export let settings = new Proxy(LOCAL_FOR_OBJECT_ONLY_settings, {
    get(target, prop, receiver) {
        if (prop === "replaceObject") {
            // Provide a function to replace the underlying object
            return (newObject: any) => {
                // Clear the target object and copy newObject's contents
                for (let variableKey in target) {
                    if (target.hasOwnProperty(variableKey)){
                        delete target[variableKey as settings_valid];
                    }
                }
                for (let variableKey in newObject) {
                    target[variableKey as settings_valid] = newObject[variableKey];
                }
                LOCAL_FOR_OBJECT_ONLY_settings = newObject;
                // Sync with localStorage
                localStorage.setItem("settings", JSON.stringify(target));
            };
        }
        // Allow normal object-like behavior
        return Reflect.get(target, prop, receiver);
    },
    set(target, prop, value) {
        // console.log(target, prop, value)
        // Update the target object
        const result = Reflect.set(target, prop, value);
        // Sync with localStorage
        localStorage.setItem("settings", JSON.stringify(target));
        return result;
    }
    // Note: Implementation of "deleteProperty" is not necessary, because we don't delete settings.
});

type settings_valid = "rowHeight" | "bgColor" | "bgColor-txt" | "textColor" | "textColor-txt" | "imgMargin" | "imgReverse" | "zoomRatio" | "mouseActionDelay" |
    "accentColor" | "accentColor-txt" | /*"disableFullscreenB" |*/ "kivbbo" | "dontImportSubfolders" | "importAsTemporary" | "editorMode" | "emergencyURL" |
    "emergencyTitle" | "emergencyIcon" | "emergencyOverride" | "widthForFill" | "emergencyContextmenu" | "rtlGallery" | "mouseHideDelay";

const settings_valid: settings_valid[] = ["rowHeight", "bgColor", "bgColor-txt", "textColor", "textColor-txt", "imgMargin", "imgReverse", "zoomRatio", "mouseActionDelay",
    "accentColor", "accentColor-txt", /*"disableFullscreenB",*/ "kivbbo", "dontImportSubfolders", "importAsTemporary", "editorMode", "emergencyURL",
    "emergencyTitle", "emergencyIcon", "emergencyOverride", "widthForFill", "emergencyContextmenu", "rtlGallery", "mouseHideDelay"];

const settings_no_display_val: settings_valid[] = ["imgReverse", /*"disableFullscreenB",*/ "kivbbo", "dontImportSubfolders", "importAsTemporary", "editorMode", "emergencyURL",
    "emergencyTitle", "emergencyIcon", "emergencyOverride", "emergencyContextmenu", "rtlGallery"];

export class EditorModeToggledEvent extends Event {
    public readonly status: boolean
    constructor(status: boolean) {
        super("editorModeToggled")
        this.status = status;
    }
}

let settings_first_load = true;

/**
 * Loops over all available settings and runs them through settingsDo. Ensures that if values were not updated through the normal functions that their changes are applied. Useful after importing settings.
 */
export async function reloadSettings() {
    const haveWeFinishedProcessingYet: Promise<any>[] = [];
    // Specific fixes for some settings
    // galleryElm.children[0].setAttribute("data-first", "");
    // load all settings
    settings_valid.forEach((id) => {
        haveWeFinishedProcessingYet.push(new Promise((resolve) => {
            try {
                let elm = document.getElementById(id);
                if (!(elm instanceof HTMLInputElement)) throw new Error("The fucking settings element is NOT an input, or is gone.", { cause: { id: id, elm: elm } });
                let elmType = elm.getAttribute("type");
                // when a different value is used instead of value
                // let valToCheckTMP: string = "value";
                let valToCheck: "value" | "checked" = "value";
                if (elmType == "checkbox") {
                    // valToCheckTMP = "checked";
                    valToCheck = "checked";
                    // let elmValToCheck: boolean = elm.checked;
                // } else {
                    // const elmValToCheck: string = elm.value;
                }
                // const valToCheck = valToCheckTMP;
                // When the value has to be processed a bit
                let doFunction = function (e: InputEvent) {
                    settingsDo(id, (e.target as HTMLInputElement)[valToCheck]);
                }
                if (id.match(/(accent|text|bg)color(-txt|)/gi)) { // Here we definitely get the color of an Input, so it's guaranteed to be a string
                    doFunction = function (e) {
                        settingsDo(id, standardize_color((e.target as HTMLInputElement)[valToCheck] as string));
                    }
                }
                settings_first_load ? elm.addEventListener("input", doFunction) : null;
                // set settings
                // document.getElementById(id).dispatchEvent(new InputEvent("input"));
                settingsDo(id, elm[valToCheck], {load: true, elm: elm, elmValToCheck: valToCheck});
                resolve(undefined);
            } catch (error) {
                console.error(error);
                resolve(undefined);
            }
        }));
    });
    await Promise.all(haveWeFinishedProcessingYet);
    if (settings_first_load) {
        systemd.resolve("loadingSettings");
        settings_first_load = false;
    }
}
window.addEventListener("load", () => {
    reloadSettings();
});

type settingsVal = boolean | number | string;

/**
 * Synchronizes a Setting across the board — UI and storage.
 * @param id Setting ID
 * @param val New value
 * @param options Optional options
 * @param options.load If the setting should be loaded from the settings object instead. Makes the given `val` redundant. Disabled by default.
 * @param options.elm Corresponding HTML Element to the given Setting
 * @param options.elmValToCheck Element with the juice
 */
export function settingsDo(id: settings_valid, val: settingsVal, options: {
    load: boolean,
    elm: HTMLInputElement | undefined,
    elmValToCheck: "value" | "checked" | undefined
}={load: false, elm: undefined, elmValToCheck: undefined}) {
    // some patches
    let settingid = id.replace("-txt", "") as settings_valid;
    // Save or Load it
    if (options.load === true) {
        val = settings[settingid] ?? val; // In case it hasn't been saved before, use default
        // Make UI respect the saved settings
        if (options.elm && options.elmValToCheck) {
            if (options.elmValToCheck === "checked") {
                options.elm[options.elmValToCheck] = val as boolean;
            }
            else {
                options.elm[options.elmValToCheck] = val.toString();
            }
        }
    }
    settings[settingid] = val;
    // console.log(val, id, settings[id]);
    changeSetting(id, val);
    updateVal(id, val);
}
export function settingsReset() {
    settings.replaceObject({});
    window.location.reload(); // -> needs true because FIREFOX // todo: doesn't exist in TypeScript
}
/**
 * Update setting in UI
 * @param id 
 * @param val 
 * @returns 
 */
function updateVal(id: settings_valid, val: settingsVal) {
    try {
        if (settings_no_display_val.includes(id)) { // Blacklist options who don't display their value
            return;
        }
        // otherAttr = otherAttr ?? "name";
        const elm = document.getElementById(id) as HTMLInputElement;
        const elmName = elm.getAttribute("name");
        const status_elm = (elm.parentElement as HTMLElement).querySelector(`.input-value[data-value-of="${elmName}"]`) as HTMLInputElement;
        const status_name = status_elm.tagName.toLowerCase();
        // Depending on what type of element we're dealing with it's different
        if (status_name == "input") {
            status_elm.value = val.toString();
        } else {
            status_elm.innerText = val.toString();
        }
    } catch (error) {
        console.log(error);
    }
}
/**
 * Update setting in functionality (not storage, not UI)
 * @param id 
 * @param val 
 */
async function changeSetting(id: settings_valid, val: settingsVal) {
    switch (id) {
        case "rowHeight":
            await systemd.promises["galleryFirstLoad"]
            galleryElm.resetMediaSizes();
            break;
        case "bgColor":
        case "bgColor-txt":
        case "textColor":
        case "textColor-txt":
        case "accentColor":
        case "accentColor-txt":
            colorFunc(id, val.toString());
            break;
        case "imgMargin":
            document.body.style.setProperty("--mediaMargin", `${(val as number)*0.5}px`) // Because they don't overlap it's halved
            break;
        case "imgReverse":
            await Promise.all(systemd.all);
            galleryElm.reverseChildren(!!val);
            break;
        // case "disableFullscreenB":
        //     if (val == true) {
        //         document.documentElement.style.setProperty("--fsb-display", "none");
        //     } else if (val == false) {
        //         document.documentElement.style.setProperty("--fsb-display", "inline-block");
        //     }
        //     break;
        case "kivbbo": // Keep Image Viewer Bottom Bar Open - aka. viewerIsFooterShown
            if (val == false) {
                document.documentElement.style.setProperty("--viewer-footer-not-on-hover-opacity", "0");
                document.documentElement.style.setProperty("--viewer-footer-transition", "opacity 0.3s ease-in-out");
                document.documentElement.style.setProperty("--viewer-footer-translation-of-backdrop", "0 100%");
                // viewerIsFooterShown = false;
            } else if (val == true) {
                document.documentElement.style.setProperty("--viewer-footer-not-on-hover-opacity", "1");
                document.documentElement.style.setProperty("--viewer-footer-transition", "unset");
                document.documentElement.style.setProperty("--viewer-footer-translation-of-backdrop", "0 0");
                // viewerIsFooterShown = true;
            }
            break;
        case "zoomRatio":
            await systemd.promises["galleryFirstLoad"];
            (galleryElm.viewer as RuntimeViewer).options.zoomRatio = Number(val);
            break;
        case "mouseActionDelay": // use settings.mouseActionDelay
            break;
        case "dontImportSubfolders":
            settings.dontImportSubfolders = val; // LEGACY CODE - optimize
            break;
        case "importAsTemporary":
            break;
        case "editorMode":
            let editorModeToggledEvent = new EditorModeToggledEvent(Boolean(val));
            window.dispatchEvent(editorModeToggledEvent);
            break;
        case "emergencyURL":
        case "emergencyTitle":
        case "emergencyIcon":
        case "emergencyOverride":
        case "emergencyContextmenu":
            break;
        case "widthForFill":
            document.body.style.setProperty("--minWidthAfterGallery", `${val}%`) // Because they don't overlap it's halved
            break;
        case "rtlGallery":
            await systemd.promises["galleryFirstLoad"];
            galleryElm.style.flexDirection = val ? "row-reverse" : "row";
            break;
        case "mouseHideDelay":
            settings.mouseHideDelay = Number(val);
            break;
    
        default:
            console.warn("uknown id for settings:", id);
            break;
    }
}

function standardize_color(str: string){ // https://stackoverflow.com/a/47355187
    var ctx = document.createElement("canvas").getContext("2d");
    ctx!.fillStyle = str;
    return ctx!.fillStyle;
}
/**
 * Update Theme colors.
 * @param which From which setting this came. Is just a Setting ID
 * @param val Color value
 */
function colorFunc(which: string, val: string) {
    if (which.includes("bgColor")) {
        document.documentElement.style.setProperty("--bg-user", val);
        (document.querySelector("meta[name='theme-color']") as HTMLMetaElement).content = val;
    }
    if (which.includes("textColor")) {
        document.documentElement.style.setProperty("--text-user", val);
    }
    if (which.includes("accentColor")) {
        document.documentElement.style.setProperty("--accent-user", val);
    }
    if (which.includes("txt")) { // TODO: Figure out why the rest is commented out
        const whichElmVal = (document.getElementById(which) as HTMLInputElement).value;
        // if (whichElmVal[0] != "#") {
        //     // console.log(which);
        //     document.getElementById(which).value = "#" + val;
        // }
    }
}
