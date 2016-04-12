require('./player.css');

var videojs = require('video.js');
global.THREE = require('three');
global.WebVRConfig = require('./webvr.config.js');
var WebVrPolyfill = require('webvr-polyfill/src/webvr-polyfill');
new WebVrPolyfill();
require('three/examples/js/controls/VRControls.js');
require('three/examples/js/effects/VREffect.js');
require('webvr-boilerplate');
require('./videojs.vr.js')(videojs);
videojs( '#video-container', {
    techOrder: ['html5']
}).vr({projection: "Sphere"});
