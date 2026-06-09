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
- [ ] Make a new class for the Database
  - [ ] (FEATURE) RAM-only collections: Temporarily loads collections, but still allows exporting and saving.
  - [ ] "Editing Sessions": Allows a temporary queue of write operations to be opened before writing all the data. Useful for importing Media Collections. Lowers the amount of times the database is opened and closed.
  - [ ] IN THE SAME BREATH: Add a function that only reloads the site (if necessary???) once the database operations are finished.
  - [ ] Make a new class for collections and make `mediaOrder` obsolete
    - Make sure to modify the collections, get them, or similar, it always needs to be done through an explicit function. This guarantees we can save it.
    - Use indexedDB. This streamlines the saving process, and makes cross-tab communications easier.
- [ ] `loadNewPics()` should NOT be messing with the UI. Make custom HTML Element for the Gallery, so it can manage it itself.
- [ ] For photos and videos, create a new custom HTML Element (extending image/video). Those have functions for easily getting the media ID for example.
- [x] Redo jgvdb as class with no constructor? But make sure nothing can be overwritten
- [x] Optimize `loadNewPics()`

# new bugs
- [ ] `generalPastingMediaDealer`: Possibly rejects fake Events created, since it checks for instance of ClipboardEvent
- [x] `loadNewPics`: File's from Media Collection import have type "application/octet-stream". Fix this, otherwise they're fully ignored from being imported! Might be an issue with the zip.js code in jgvdb.

# QoL
- [ ] Fix up viewer function that scales the viewer's images. It's terrible on mobile devices.

# New features (AFTER refactor)
- [ ] Multi-tab support
- [ ] Quicker hide button (deletes interface, and THEN switches) - or loads site in background already
- [ ] RAM only collections (deleted after page reload)
- [ ] per-image filters (auto lightness normalization?)