import { switchCollections, newCollection } from "./collections-old";
import { settings } from "./settings";

export function executeEmergency() {
    // Emergency mode!
    // console.log(e);
    if (!settings.emergencyOverride) {
        // Quick! Hide it all!
        window.open(settings.emergencyURL, "_blank");
        // Change tab appearance
        let currentURL = new URL(window.location.toString());
        currentURL.searchParams.set("iconurl", settings.emergencyIcon);
        currentURL.searchParams.set("title", settings.emergencyTitle);
        window.history.pushState({}, "", currentURL);
        switchCollections(newCollection());
    } else {
        window.location.replace(settings.emergencyURL);
    }
}