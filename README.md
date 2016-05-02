
# Brightcove 360 Video Player

A video.js plugin that turns a video element into a HTML5 Panoramic 360 video player. Project video onto different shapes.

This is built to work with the Brightcove Player, which includes video.js.

## Functionality and Known Limitations

To create a 360 Brightcove player, include `dist/player.js` and `dist/360-skin.css` in your Brightcove studio player. In the plugins array, include a plugin with title

```
vr
```

and options

```
{'projection': 'Sphere'}
```

and a second plugin with title

```
listenForChange
```

and no options.

This player can load 360 video that can be controlled via mouse or keyboard. UI features include a 360 video logo play button that fades out on play, and grab and grabbing behavior that is consistent across browsers. Full screen functionality has been tested. The player works without modifications on the most recent versions of Chrome, Firefox and Edge.

Safari and IE11 have Cross Origin Request (CORS) bugs when using video and WebGL. This player will work on those browsers when the video is loaded from the same domain as the player (see localhost:3000/local.html) or if it is loaded via XMLHTTPRequest (XHR). For XHR, video will need to be fragmented to load with buffering. We have tested using video fragments with Media Source Extensions and run into CORS issues, but that approach may work with the correct fragmentation configuration.

The Safari and IE11 browser bugs are recorded at https://bugs.webkit.org/show_bug.cgi?id=135379 and https://msdn.microsoft.com/en-us/library/dn302435(v=vs.85).aspx (scroll to Exceptions)

## Getting Started

To test, make sure you have npm installed, and run:

```
npm install
npm run serve
```

To build:
```
npm run build
```

To test locally, visit localhost:3000/dev.html. To test the generated brightcove player, visit localhost:3000.

Host on a HTTP Server that supports byte range requests if you want the seek bar to work (e.g. Apache).

## Testing

#### localhost:3000/dev.html

Local files only (does not include Brightcove files or CSS)

#### localhost:3000/

Brightcove player loaded via iframe. Works on Chrome, Firefox, Edge. CORS error on Safari and IE11.

#### localhost:3000/local.html

Brightcove player included in HTML. Default video is local and works on Safari and IE11 (as well as Chrome, Firefox, Safari, IE11).

####localhost:3000/xhr-blob.html

Brightcove player included in HTML. Video loaded via XMLHTTPRequest. Works on all browsers, but takes longer for large videos if they are not fragmented.

#### localhost:3000/dash.html

MPEG DASH integration via VideoJS Dash using local files only (does not include Brightcove files or CSS). You may need to update the video source to a .mpd fragmented for MPEG DASH.

#### localhost:3000/dash-xhr-experimental.html

Building on dash.html using XHR and MSE to load the video into a SourceBuffer. Currently not functional.


## Video Processing
Install ffmpeg
```
brew install ffmpeg --with-fdk-aac --with-ffplay --with-freetype --with-libass --with-libquvi --with-libvorbis --with-libvpx --with-opus --with-x265
```

Install Bento4: https://www.bento4.com/downloads/

Fragment your video
```
# Usage: mp4fragment source destination
mp4fragment video.mp4 video_fragmented.mp4
```

Create multiple resolutions/bitrates
```
python /path/to/Bento4/utils/mp4-dash-encode.py -b 5 video_fragmented.mp4
```

Segment the videos for streaming
```
python /path/to/Bento4/utils/mp4-dash.py --exec-dir=. video_0*
```

Your folder should now look like this:
```
video.mp4
video_00500.mp4
video_00875.mp4
video_01250.mp4
video_01625.mp4
video_02000.mp4
video_fragmented.mp4
output
├── audio
│   └── und
├── stream.mpd
└── video
    ├── 1
    ├── 2
    ├── 3
    ├── 4
    └── 5
```

Load `stream.mpd` into the player to use MPEG DASH.

## Credits ##

This project is a conglomeration of a few amazing open source libraries.

* [VideoJS](http://www.videojs.com)
* [VideoJS DASH](https://github.com/videojs/videojs-contrib-dash)
* [Three.js](http://threejs.org)
* [webvr-boilerplate](https://github.com/borismus/webvr-boilerplate)
* [webvr-polyfill](https://github.com/borismus/webvr-polyfill)


## Release History
_(Nothing yet)_
