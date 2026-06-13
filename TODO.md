# Refactor
- [x] Split functions into different, smaller, files
- [x] Convert to TypeScript
- [x] Replace "Important Load Promises" with "Dependant"
  - [x] ~~ILP will be an instance of Dependant~~ systemd.
  - [x] Dependant instance requires one or more solvers active, because with zero it would be instantly solved.
  - [x] they can resolve to an optional result.
  - [x] keeps track of all the different promises made inside itself and adding it to a list (that can be `await Promise.all` as well)
  - [x] Dependant instances can be dependant on other Dependant instances (i.e., they're awaiting for all promises inside them to finish too.)
  - [x] Whenever a sub-dependancy is resolved, or the entire instance is, an Event is fired on `window`.
  - [ ] make it its own library anyone can use
- [x] Make a new class for the Database
  - [x] (FEATURE) RAM-only collections: Temporarily loads collections, but still allows exporting and saving.
  - [x] "Editing Sessions": Allows a temporary queue of write operations to be opened before writing all the data. Useful for importing Media Collections. Lowers the amount of times the database is opened and closed.
  - [ ] IN THE SAME BREATH: Add a function that only reloads the site (if necessary???) once the database operations are finished.
  - [x] Make a new class for collections and make `mediaOrder` obsolete
    - Make sure to modify the collections, get them, or similar, it always needs to be done through an explicit function. This guarantees we can save it.
    - Use indexedDB. This streamlines the saving process, and makes cross-tab communications easier.
  - [ ] Rewrite `createIMG()`/`createVID()` to be a deprecated alias to create HTML and Save data.
  - [ ] Collections:
    - [x] Implement Database saving (i will now specify that this means it's actually saved on disk)
    - [ ] Implement imports - not needed directly on the class anyways, since jgvdb can hande that instead. It essentially extracts the images, assigns them new IDs, then puts them into a newly created collection.
    - [x] Finish the Manager (switchingCollections)
    - [x] Add Events
- [ ] `loadNewPics()` should NOT be messing with the UI. Make custom HTML Element for the Gallery, so it can manage it itself.
- [x] Gallery Element:
  - [ ] Inherit Gallery settings functionality:
    - [ ] Width for fill
    - [ ] Margin
    - [ ] Row Height
    - [ ] Reverse Images
    - [ ] Right-to-Left Gallery
  - [x] Switching collections without reload
  - [x] Reordering via Dragula and saving it
  - [x] `revokeAllOBJURLS()`
  - [ ] `toggleFullscreenGallery()`
  - [ ] Add Events
  - [x] Custom Media Element (Can contain either video or image)
    - [ ] is a better wrapper around createVID/createIMG
    - [x] Does not really do anything on its own
    - [x] is bound to the gallery, which houses the currently shown collection and manages it.
    - [x] For photos and videos, create a new custom HTML Element (extending image/video). Those have functions for easily getting the media ID for example.
- [ ] Collection last bits to do:
  - [ ] Ensure saving is done properly at the needed positions
  - [ ] Ensure the Gallery causes saves to be triggered (through events or not, especially on drop)
  - [ ] Make function for when changing the name? so it can trigger a save
- [ ] re-implement jgvdb? at least database and collections
  - The old systems are literally not applicable to the new ones anymore. I think I can get away with not re-doing the settings.
- [x] Redo jgvdb as class with no constructor? But make sure nothing can be overwritten
- [x] Optimize `loadNewPics()`
- [ ] Load `MediaCollectionManager` on window load in `app.ts`. ~~Or make it able to have no gallery element until a second initialization phase so it can load the media collection and such in the background already.~~ OOOOR create the gallery element BEFORE load and AFTER load append it, so it's already fully populated on load.

# new bugs
- [ ] `generalPastingMediaDealer`: Possibly rejects fake Events created, since it checks for instance of ClipboardEvent
- [x] `loadNewPics`: File's from Media Collection import have type "application/octet-stream". Fix this, otherwise they're fully ignored from being imported! ~~Might be an issue with the zip.js code in jgvdb.~~ my function override wasn't being applied. It was fixed in the last 2 years but I'm NOT updating until this is done
- [ ] The JGVMedia element might not be nicely registered, or using it in the HTML is causing problems
- [ ] POSSIBLY the one setting embedded into the `JGVMedia` is not changed when it changes

# QoL
- [ ] Fix up viewer function that scales the viewer's images to fit the whole screen. It's terrible on mobile devices.
- [ ] when resetting the image (in the viewer), make it run the function for positioning again
- [ ] Fix drag'n'drop on Chrome via file protocol

# Other
- [ ] Clean up files

# New features (AFTER refactor)
- [ ] Multi-tab support
- [ ] Quicker hide button (deletes interface, and THEN switches) - or loads site in background already
- [ ] RAM only collections (deleted after page reload)
- [ ] per-image filters (auto lightness normalization?)
- [ ] Change image viewer to [PhotoSwipe](https://github.com/dimsemenov/photoswipe), perchance
- [ ] allow ctrl+z and ctrl+y for reordering, adding and deleting images
- [ ] Is styling okay on latest Safari? on 17.2 it certainly isn't.
- [ ] Multi-select
- [ ] Collection: Enable Temporary mode - switches Collection to be a temporary collection (`this.id` is set to `null`)
