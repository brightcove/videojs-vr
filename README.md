
# VR

A video.js plugin that turns a video element into a HTML5 Panoramic 360 video player. Project video onto different shapes. Optionally supports Oculus Rift.

[View Demo](http://stage.metacdn.com/r/v/vorjbrr/Er866Cp)

## Getting Started

Run `npm install`, then `npm run build`.

Host on a HTTP Server that supports byte range requests if you want the seek bar to work (e.g. Apache).

## Oculus Rift Support
This plugin leverages the [webvr-boilerplate](https://github.com/borismus/webvr-boilerplate) project (which in turn uses [webvr-polyfill](https://github.com/borismus/webvr-polyfill) and [three.js](https://github.com/mrdoob/three.js)) to create a 'responsive VR' experience across multiple devices.

Oculus Rift playback requires Firefox Nightly with the WebVR addon, or experimental WebVR-enabled builds of Chromium. Go to [WebVR.info](http://www.webvr.info) for more info.


### Build
Build script requires npm.

## Examples
After you have built the project, check out example.html to see VR in action.

## Credits ##

This project is a conglomeration of a few amazing open source libraries.

* [VideoJS](http://www.videojs.com)
* [Three.js](http://threejs.org)
* [webvr-boilerplate](https://github.com/borismus/webvr-boilerplate)
* [webvr-polyfill](https://github.com/borismus/webvr-polyfill)


## Release History
_(Nothing yet)_
