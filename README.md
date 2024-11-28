# Justified Gallery Viewer / Album Viewer
*(works best for images)*

## How to use it:
Drag'n'Drop your files into the Gallery or select them with the file picker. Some things don't work.

## Broken Stuff
- You can't view videos because ViewerJS doesn't support it. I may switch to a different lib but for now just no.
- Reordering images is currently impractical, might revisit this in the future. In the meantime, play with the variable `mediaOrder.replaceArray()`, I'm sure you're going to love it ;)
- You cannot import encrypted ZIPs, just unzip them and then drag the folder in, much easier
- Speaking of some zips not importing correctly: Exclusively use "Deflate" (NOT 64) Compression and zip files, nothing else is working with zip.js
- saving filenames is not supported at all. Forget it.

## FAQ
### Why?
I love looking at my gf :3

### I'm on mobile and can't select a directory!
It isn't even supported on mobile, so you won't miss out on anything. See [Can I use](https://caniuse.com/input-file-directory) and [MDN](https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement/webkitdirectory).

## Dependencies & Credits
### Deps
- [Justified Gallery](https://miromannino.github.io/Justified-Gallery/) (MIT)
- [ViewerJS](https://fengyuanchen.github.io/viewerjs/) (MIT)
- [zip.js](https://gildas-lormeau.github.io/zip.js/) (BSD-3-Clause)
### Inspirations
- [AndyDevla's Web Image Viewer](https://github.com/AndyDevla/web-Image-Viewer)
- A few too many StackOverflow posts.