# 2.0 - 2026-06-XX
## Refactor
- Translated all JS to TypeScript, compiling with ESBuild
- Rewrote the entire Database and Database export/import System.
- Rewrote the UI system (not design)
- Made multi-tab fully supported (even for the same collection!)
- Libraries are still the same, though LogTape was added

## Features
### added
- Temporary Collections
- Refresh Storage Info Button
- auto-scroll to latest Media
- Multi-tab support
- maybe two bugs

### improved
- Better keyboard navbar navigation
- Database imports without deleting whole Database
- Manual Download text
- Importing different sorts of data (at least the implementation is cleaner and guaranteed to work now)
- to be honest everything
- **Speed of every single action by a whole lot**

### removed
- Empty collection without deleting
- all previous user data ~~without warning~~ with 1 weeks notice
- Jank and Herobrine

# 1.X - 2025-10-09
original implementation consisting of a few libraries (Dragula, ViewerJS, zip.js), a single HTML, a single CSS and a single (2.3k line!) JS file.