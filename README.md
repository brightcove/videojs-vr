
# Videojs 360 Video Player

A video.js plugin that turns a video element into a HTML5 Panoramic 360 video player.

This is built to work with the Brightcove Player, which includes video.js.

## Getting Started

To test, make sure you have npm installed, and run:

```
npm install
npm run serve
```

### Build files for deployment

Run the following command to build the player. All files will be output to the `/dist` folder. If you are using Brightcove Studio, add `/dist/360-skin.css` and `/dist/player.js` to your custom Brightcove player.

```
npm run build
```

## Examples
You can view examples locally via `http://localhost:3000` after running `npm run serve`. Alternatively, you can upload the files to a remote web host. Host on a HTTP Server that supports byte range requests if you want the seek bar to work (e.g. Apache).

### index.html
Uses the Brightcove player with 360 video integration in an iframe.

To use one of your custom players, update the `src` attribute of the iframe.

Supports mp4, m3u8, and videos from your Brightcove catalog.

#### Limitations
CORS issues with WebGL video playback in IE11 and Safari prevent this approach.

### local.html
Uses the Brightcove player with 360 video integration to view a video on the local machine. This is the simplest workaround for the limitations of `index.html`.

To use one of your custom players, update the `data-account` and `data-player` attributes of the video element as well as the script `src` URL below the video.

Supports mp4, m3u8, and videos from your Brightcove catalog.

### example.html
Uses the local 360 video player styles and javascript. This allows you to see your changes immediately at `http://localhost:3000/example.html` when running the player via `npm run serve`.

### xhr-blob.html
Uses the Brightcove player with 360 video integration to view a video. The video is loaded via XMLHttpRequest to prevent CORS issues in IE11 and Safari.

To use one of your custom players, update the `data-account` and `data-player` attributes of the video element as well as the script `src` URL below the video.

Supports mp4 and m3u8.

#### Limitations
The video must be fully downloaded before you can begin playback.

## Credits ##

This project is a conglomeration of a few amazing open source libraries.

* [VideoJS](http://www.videojs.com)
* [Three.js](http://threejs.org)
* [webvr-boilerplate](https://github.com/borismus/webvr-boilerplate)
* [webvr-polyfill](https://github.com/borismus/webvr-polyfill)


## Release History
_(Nothing yet)_
