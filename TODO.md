# Refactor
- [ ] Split functions into different, smaller, files
- [ ] Convert to TypeScript
- [ ] Replace "Important Load Promises" with "Dependant"
  - [ ] ILP will be an instance of Dependant
  - [ ] Dependant instance requires one or more solvers active, because with zero it would be instantly solved.
  - [ ] they can resolve to an optional result.
  - [ ] keeps track of all the different promises made inside itself and adding it to a list (that can be `await Promise.all` as well)
  - [ ] Dependant instances can be dependant on other Dependant instances (i.e., they're awaiting for all promises inside them to finish too.)
  - [ ] Whenever a sub-dependancy is resolved, or the entire instance is, an Event is fired on `window`.
  - [ ] make it its own library anyone can use
- [ ] Make a new class for the Database
- [ ] Make a new class for collections and make `mediaOrder` obsolete
  - Make sure to modify the collections, get them, or similar, it always needs to be done through an explicit function. This guarantees we can save it.
  - Use indexedDB. This streamlines the saving process, and makes cross-tab communications easier.
- [ ] For photos and videos, create a new custom HTML Element (extending image/video). Those have functions for easily getting the media ID for example.
- [ ] Redo jgvdb as class with no constructor? But make sure nothing can be overwritten

# Possible new bugs
- [ ] `generalPastingMediaDealer`: Possibly rejects fake Events created, since it checks for instance of ClipboardEvent

# QoL
- [ ] Fix up viewer function that scales the viewer's images. It's terrible on mobile devices.

# New features (AFTER refactor)
- [ ] Multi-tab support
- [ ] Quicker hide button (deletes interface, and THEN switches) - or loads site in background already
- [ ] RAM only collections (deleted after page reload)
- [ ] per-image filters (auto lightness normalization?)