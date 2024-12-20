<div align="center"><a href="https://lopolin-lp.github.io/justified-gallery-viewer/"><img width="256" height="256" src="./assets/Justified Gallery Icon.svg"></a></div>
<br>

# Justified Gallery Viewer / Album Viewer
*(works best with images and firefox)*<br>
*click image above to open site!*

## Features
### Importing
- *Type*
  - Drag'n'Drop,
  - Paste or
  - select from your device
- *Media*
  - Images,
  - Videos,
  - Folders with Images and Videos,
  - ZIP-Archives with Images and Videos or
  - Links containing an Image or Video
- to add them to the gallery!
- You can also choose to not import subfolders.

### Gallery Viewing
- Change Background, Text and Accent Color!
- Change scale of images!
- Change Gap between images!
- Reverse the order with one click!
- Open it in Fullscreen without distractions!
- With Edit Mode:
  - Change the order to be however you like!
  - Delete images easily!
- Reset all settings or delete the entire gallery quickly in case someone's there~

### Image Viewing
- Change how fast to zoom in and out!
- Make the bottom bar permanently open or on hover!

## Use cases
- A quick look of photos you've taken out and about
- More quickly decide in a selection of different things by seeing them side by side
- Just looking at beautiful pics
- ...maybe even your personal collection of the more intriguing kind of pictures~
- There's many things in this world to look at, so if you have something personal on your computer you'd like to look at, here ya go :3

## How to use it:
Drag'n'Drop your files into the Gallery or select them with the file picker.

## Broken Stuff
- You can't view videos because ViewerJS doesn't support it. I may switch to a different lib but for now just no.
- You cannot import encrypted ZIPs, just unzip them and then drag the folder in, much easier
- Speaking of some zips not importing correctly: Exclusively use "Deflate" (NOT 64) Compression and zip files, nothing else is working with zip.js
- saving/remembering filenames is not supported at all. Forget it.
- You cannot export your gallery at all. You should have saved it on your device from where you imported it from.
- You cannot importing anything on your local machine on Chrome while the site is open on the "file:///" protocol. I think there's solutions but... no, just use firefox.
- 10GB on Firefox and 2GB on Chrome max storage.
- You can only view as many images as you have RAM.

## FAQ
### Why?
I love looking at my gf :3

### I'm on mobile and can't select a directory!
It isn't even supported on mobile, so you won't miss out on anything. See [Can I use](https://caniuse.com/input-file-directory) and [MDN](https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement/webkitdirectory).

### Why is CORS Everywhere dangerous?
Can violate your privacy, [steal your money](https://portswigger.net/research/exploiting-cors-misconfigurations-for-bitcoins-and-bounties) and accounts, etc.

### Safari?
Can't install it on my pc for debugging, can't even open the console on my iPad, so no.

## ToDo
- Change image viewer to [PhotoSwipe](https://github.com/dimsemenov/photoswipe), perchance

## Dependencies & Credits
### Deps
- [Dragula](https://bevacqua.github.io/dragula/) (MIT)
- [ViewerJS](https://fengyuanchen.github.io/viewerjs/) (MIT)
- [zip.js](https://gildas-lormeau.github.io/zip.js/) (BSD-3-Clause)

### Inspirations
- [AndyDevla's Web Image Viewer](https://github.com/AndyDevla/web-Image-Viewer)
- [xieranmaya's Blog](https://github.com/xieranmaya/blog/issues/6)
- A few too many StackOverflow posts.