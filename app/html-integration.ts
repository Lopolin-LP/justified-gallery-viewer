// import { deleteCollection, mediaCollections, switchCollections } from "./collections-old";
// import { yeetAllMedia } from "./database-old";
import { collectionManager, galleryElm } from "./globals";
import { exportMCAsZip, JGVDB_DB, JGVDB_MC, JGVDB_SG } from "./jgvdb";
import { updateStorageInfo } from "./other-ui";
import { settings, settingsReset } from "./settings";
import { confirmation } from "./util";

// TODO: Update HTML to new functions?

declare global {
    interface Window {
        confirmation: typeof confirmation
        jgvdb: {
            // exporting
            exportSettings: () => void,
            exportCurrentCollection: () => void,
            exportCurrentCollectionAsZip: () => void,
            exportDatabase: () => void,
            // other collection stuff
            newCollectionAndSwitch: (temporary: boolean) => Promise<void>,
            deleteCurrentCollection: () => void,
            // database
            deleteDatabase: () => void
        }
        settingsReset: typeof settingsReset;
        // toggleEmergencySettings is defined in app.ts
        settings: typeof settings;
        updateStorageInfo: typeof updateStorageInfo;
    }
}
window.confirmation = confirmation;
window.jgvdb = {
    exportSettings: () => {
        JGVDB_SG.generate().then(v => v.export());
    },
    exportDatabase: () => {
        JGVDB_DB.generate().then(v => v.export());
    },
    exportCurrentCollection: () => {
        JGVDB_MC.generate(collectionManager.current).then(v => v.export());
    },
    exportCurrentCollectionAsZip: () => {
        exportMCAsZip(collectionManager.current);
    },
    newCollectionAndSwitch: async (temporary: boolean) => {
        const collection = await collectionManager.newCollection(temporary ? "temporary" : "database");
        collectionManager.switchCollection(collection);
    },
    deleteCurrentCollection: () => {
        collectionManager.deleteCurrentCollection();
    },
    deleteDatabase: () => {
        collectionManager.deleteEverything();
    }
}
window.settingsReset = settingsReset;
window.settings = settings;
window.updateStorageInfo = updateStorageInfo;