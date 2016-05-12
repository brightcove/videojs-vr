// Shims
require('native-promise-only');
require('./ie11-string-shim.js');

var vjs = window.videojs || {};
global.THREE = require('three');
global.WebVRConfig = require('./webvr.config.js');
var WebVrPolyfill = require('webvr-polyfill/src/webvr-polyfill');
new WebVrPolyfill();
require('three/examples/js/controls/VRControls.js');
require('three/examples/js/effects/VREffect.js');
require('webvr-boilerplate');
require('./videojs.vr.js')(vjs);
require('./videojs.excludeBrowsers.js')(vjs);
require('./videojs.listenForChange.js')(vjs);

//Set crossorigin anonymous attribute on video element
var videoElems = document.getElementsByTagName('video');
if (videoElems.length && videoElems[0].nodeType === 1) {
  videoElems[0].setAttribute('crossorigin', 'anonymous');
  //Use HTML5, not Flash
  vjs( videoElems[0], { techOrder: ['html5'], controls: true });
}
