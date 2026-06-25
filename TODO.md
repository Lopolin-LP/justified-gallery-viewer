# Refactor
- [ ] Fixups during migration:
  - [x] No `localStorage` accesses related to Collections or media orders
  - [ ] once done, remove all the comments at the top commenting out old imports
  - [x] Ensure there are no `window.location.reload`s
  - [ ] UI:
    - [ ] Setup for collections (maybe assign the elements to the Collection Manager which then auto updated it and takes the status of the elements there?)

# TESTING
- MEDIA
  - [x] adding
  - [x] moving
  - [x] deletion
- COLLECTIONS
  - [x] adding
  - [x] renaming
  - [x] deletion
- DB
  - [x] wipe
  - [x] wipe without reload (does it work?)
- SETTINGS
  - [x] work as expected
  - [x] when changing any value, change is immediately saved AND applied
- MULTI-TAB SUPPORT
  - [x] Same collection, different tabs
  - [x] Different collections, different tabs
  - [x] Renaming across tabs

# new bugs
- [ ] file detection is entirely extension based? What if we get binary data that is an image, but no file extension??
  - [ ] This also includes rewriting at multiple places where we throw out images without extension, or are not handling non-existent file names
- [ ] Switching collections doesn't unload old ones from RAM for some reason, until page reload
- [ ] lots of not cleaned garbage gets spammed into `localStorage`
- [x] Single Media deletion does not work properly: They're not deleted from DB
- [x] appending and prepending when adding is swapped??
- [ ] blur effect behind confirmation prompts are not working as intended: videos are not blurred when they're not obstructed by the navbar or the window edge
- [ ] **I have yet to test the DB promotion to TEMP and DB, and their effects in the UI.**
- [x] Problem handling in `MediaCollection` if a DB entry couldn't be loaded (discard it silently).

# QoL
- [ ] Fix up viewer function that scales the viewer's images to fit the whole screen. It's terrible on mobile devices.
  - Idea: Make Footer only accessible when hovering lower half of it
- [x] when resetting the image (in the viewer), make it run the function for positioning again
- [ ] Fix drag'n'drop on Chrome via file protocol
- [x] Make reloads unecessary. Current pain points:
  - [x] `MediaCollectionsManager`: when wiping everything there's no way to do a soft-reload, as all the related functions are in window onload events.
- [x] Inform the user what the fuck the app is doing in the background
- [ ] Better error handling in case of DB failure (for example due to too little storage)
- [x] Make Viewer smooth zoom less epileptic
- [ ] Make Dropdown menus use JS as well in the background for more accurate focusing. Useful especially with the dropdown for switching collections
  - [ ] Fixed via CSS for now. However even that seems a bit buggy, especially when you then hover away from it...
- [ ] Make import not have two different input elements
- [ ] make `manualdl` a queue-like system, where after one is done and pasted it automatically fetches the next one.
- [ ] Improve `file://` protocol error handling
- [x] Improve `blob:` protocol support when drag'n'dropping + pasting
- [x] when adding new items, auto-focus them (somehow this was once a feature that was lost, I just saw it in the manualdl gif?!)
- [x] cross-tab collection availability synchronization
- [x] Setting to disable scrolling to latest entry
- [x] Auto-reorder collection selection when renaming
- [ ] Notification System
  - [ ] If multiple Media Collections are imported, make notifications telling you when what finished
- [ ] "DB Preview": Allow selection of what collection to import

# second refactor
- [ ] Make rest of libraries run through packages instead of being hacked into the compiler
- [ ] Make `StatusIcons` `add()` return another instance that can then be managed by reference and not by ID
  - [ ] Also have it have the ability for a "late start", i.e. shows up only after like 200ms (or different time), and timeout is cancelled if removed before it fires, otherwise just attempt to delete it anyways. (see `mediaElmsLoadPromises()` for ideas)
- [ ] JGVDB: Offload duplicate functionalities - or rewrite JGVDB_DB to use JGVDBD_MC and JGVDB_SG
  - [ ] functions that are for encoding and decoding file names with IDs
  - [ ] Media Collection importing (it's always the same steps) (relevant for DB imports)
  - [ ] Settings importing (relevant for DB imports)
- [ ] Make most logger go under the category "JGV"
- [ ] Dependant: make it its own library anyone can use
- [ ] JGVGallery
  - [ ] Inherit Gallery settings functionality (so it can be different per-gallery):
    - [ ] Width for fill
    - [ ] Margin
    - [ ] Row Height
    - [x] Reverse Images
    - [ ] Right-to-Left Gallery
  - [ ] ~~`toggleFullscreenGallery()`~~ maybe one day
    - NOTE: We need to switch from general fullscreen to single-gallery or multi-gallery fullscreen. Implementation resides OUTSIDE of JGV-Gallery.
  - [ ] Add Events
- [ ] assign the elements (for manager collections through the GUI) to the `MediaCollectionsManager` which then auto updates it.
- [ ] Make `collection[...]` events run on the broadcast channel instead
- [ ] Ability to switch collection to temporary and back to DB

# Other
- [ ] why the fuck does `updateStorageInfo()` when it's called AFTER successful deletion??? how to fix

# New features (AFTER refactor)
- [ ] update libraries
- [ ] Quicker hide button (deletes interface, and THEN switches) - or loads site in background already
- [ ] per-image filters (auto lightness normalization?)
  - [ ] Allow videos to loop
- [ ] Change image viewer to [PhotoSwipe](https://github.com/dimsemenov/photoswipe), perchance
- [ ] allow ctrl+z and ctrl+y for reordering, adding and deleting images
- [ ] Is styling okay on latest Safari? on 17.2 it certainly isn't.
- [ ] Multi-select
- [ ] Settings: Per-gallery settings
- [ ] make `UUIDTime` an actualy class.
- [ ] maybe `attributeChangedCallback()` for custom elements is useful?
- [ ] Find a way for `JGVMedia` Elements to auto-update their props on CSS refresh? (highly optional, would also make reordering more difficult so maybe no?)
- [ ] Support folder import on mobile amidst new support
- [ ] Themes? For a better looking UI?
- [ ] maybe update the manualdl import GIF? and make it a webp or avif! or a video on loop!
