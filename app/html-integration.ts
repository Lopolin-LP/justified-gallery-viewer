// import { deleteCollection, mediaCollections, switchCollections } from "./collections-old";
// import { yeetAllMedia } from "./database-old";
import { jgvdb } from "./jgvdb-old";
import { settingsReset } from "./settings";
import { confirmation } from "./util";

// TODO: Update HTML to new functions?

declare global {
  interface Window {
    confirmation: typeof confirmation
    deleteCollection: typeof deleteCollection
    jgvdb: jgvdb;
    mediaCollections: typeof mediaCollections;
    settingsReset: typeof settingsReset;
    switchCollections: typeof switchCollections;
    // toggleEmergencySettings is defined in app.ts
    // yeetAllMedia: typeof yeetAllMedia
  }
}
window.confirmation = confirmation;
window.deleteCollection = deleteCollection;
window.jgvdb = jgvdb;
window.mediaCollections = mediaCollections;
window.settingsReset = settingsReset;
window.switchCollections = switchCollections;
// window.yeetAllMedia = yeetAllMedia;