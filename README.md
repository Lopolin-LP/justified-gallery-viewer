<div align="center"><a href="https://lopolin-lp.github.io/justified-gallery-viewer/"><img width="256" height="256" src="./assets/Justified Gallery Icon.svg"></a></div>
<br>

# Justified Gallery Viewer / Album Viewer
*(works best with images and firefox on pc)*<br>
*click image above to open site!*

## Offline Usage
Download the source code and open the `index.html` file. Come back regularily to check for updates! Or use GitHub Desktop to clone the repo and fetch from origin every now and then.

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

### Exporting
- Export Settings, Collections, Images, Everything, ...

### Gallery Viewing
- Change Background, Text and Accent Color!
- Change scale of images!
- Change Gap between images!
- Reverse the order with one click!
- Open it in Fullscreen without distractions!
- Or not in Fullscreen without distractions, your choice!
- With Edit Mode you can Change the order to be however you like!
- Quickly hide what you're looking at in case there's someone~

### Collections
- Keep multiple image collections available at the same time!
- You can give them different names

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
Most of it is unfixable.
- File Management
  - You cannot import encrypted ZIPs, just unzip them and then drag the folder in, much easier
  - Speaking of some zips not importing correctly: Exclusively use "Deflate" (NOT 64) Compression and zip files, nothing else is working with zip.js
  - ViewerJS is incapable of reading the Filename from File Blobs (not Blobs, File Blobs), that's why you don't see the title of it like you usually would with ViewerJS. Downloading works tho.
- Browser Specific issues
  - Chrome
    - You cannot import anything using drag'n'drop on your local machine on Chrome while the site is open on the "file:///" protocol. I think there's solutions but... no, just use firefox.
  - Safari
    - Fullscreen is kinda wonky, idk why, perhaps my iOS is too old?
    - If I use `content-visibility`, then it breaks. Currently there's only one instance of its use.
    - Renaming is broken because the UI interface doesn't work properly.
    - Context Menu doesn't open as long-click doesn't trigger Context Menu.
- Browser Limitations
  - There's a max. storage limit. For Firefox that's always 10 GB, for Chrome it's 2 GB for many sites, on this site it said 278.8 GB. No I did not test what happens once you reach it, probably will corrupt your entire gallery.
  - You can only view as many images as you have RAM or your Browser can handle.
- Other
  - You can't view videos because ViewerJS doesn't support it. I may switch to a different lib but for now just no.

## FAQ
### Why?
I love looking at my gf :3

### I'm on mobile and can't select a directory!
It isn't even supported on mobile, so you won't miss out on anything. See [Can I use](https://caniuse.com/input-file-directory) and [MDN](https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement/webkitdirectory).

### Why is CORS Everywhere dangerous?
Can violate your privacy, [steal your money](https://portswigger.net/research/exploiting-cors-misconfigurations-for-bitcoins-and-bounties) and accounts, etc.

### Safari?
Can't install it on my pc for debugging, can't even open the console on my iPad, so no.

## Tips for Development
Development of this is cursed. Primarily I just write code and open the `index.html` locally (as nothing is server-side this works with just a simple file server). Then using GitHub Desktop I push it to GitHub.

### Testing on other Devices

To test on other devices, I use [Caddy](https://caddyserver.com/) as a simple file server, then open the hosted site on my other device. Follow the normal instructions to configure caddy, an example configuration would be
```caddyfile
{
	debug
	http_port 2014
	https_port 2012
}

192.168.0.24:2014 {
	root * "C:/Users/user/Documents/GitHub"
	file_server
}
```
and then you open `192.168.0.24:2014/justified-gallery-viewer/` on your external device, or wherever you saved this project.

Tip for Safari: In `index.html` there's two lines commented for [Eruda](https://github.com/liriliri/eruda), a debugger/console in the viewport itself, which is useful for debugging Safari iOS without a Mac.

## ToDo
- Change image viewer to [PhotoSwipe](https://github.com/dimsemenov/photoswipe), perchance
- Fix left click hold breaking after moving while left clicking
- Don't make imported collections have the same ID as previously
  - -> could lead to collisions if IDs are the same, though very unlikely, unless you import the same collection twice

### Overkill
Things that really don't need to be -> With a reason as to why overkill
- Allow extracting Collections out of a database -> Safe current DB, load the DB, export, then load your previous DB
- Allow reordering of collections -> Sorting by A-Z gives enough freedom
- Potential optimization of Emergency Mode by preloading the site and only replacing html and where u are? -> not my problem

## Dependencies & Credits
### Deps
- [Dragula](https://bevacqua.github.io/dragula/) (MIT)
- [ViewerJS](https://fengyuanchen.github.io/viewerjs/) (MIT)
- [zip.js](https://gildas-lormeau.github.io/zip.js/) (BSD-3-Clause)

### Inspirations
- [AndyDevla's Web Image Viewer](https://github.com/AndyDevla/web-Image-Viewer)
- [xieranmaya's Blog](https://github.com/xieranmaya/blog/issues/6)
- A few too many StackOverflow posts.