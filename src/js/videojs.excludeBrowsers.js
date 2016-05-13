module.exports = function(vjs) {
  var browserError = {
    "errors": {
      "4": {
        headline: '360 video is not supported on this browser',
        type: "PLAYER_ERR_BROWSER",
        message: 'To view this video, upgrade to the latest version of Desktop Chrome, Firefox, or Edge.'
      }
    }
  };
  var ua = window.navigator.userAgent;
  var videoElem = document.getElementsByTagName('video')[0];
  var MobileDetect = require('mobile-detect');
  function detectIE() {
    var msie = ua.indexOf('MSIE ');
    if (msie > 0) { // IE 10 or older => return version number
      return parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)), 10);
    }
    var trident = ua.indexOf('Trident/');
    if (trident > 0) { // IE 11 => return version number
      var rv = ua.indexOf('rv:');
      return parseInt(ua.substring(rv + 3, ua.indexOf('.', rv)), 10);
    }// other browser
    return false;
  }
  function detectSafari() {
    var uaLowerCase = ua.toLowerCase();
    return /safari/.test(uaLowerCase) && !/chrome/.test(uaLowerCase);
  }
  function resetSource() {
    if (videoElem.getAttribute('src')) {
      videoElem.setAttribute('src', '');
      videoElem.setAttribute('preload', 'none');
    }
  }
  function setBrowserError() {
    resetSource();
  }
  function setError() {
    console.log('Error!');
    this.errors(browserError);
    var videoEl = document.getElementsByTagName('video')[0];
    videoEl.setAttribute('src', '');
    videoEl.setAttribute('preload', 'none');
    setBrowserError();
    this.on('ready', setBrowserError);
    this.on('loaddata', setBrowserError);
    this.on('loadmetadata', setBrowserError);
    this.on('error', function() {
      videoElem.style.display = 'block';
    });
    //In case iframe delays video loading and prevents error propagation
    setTimeout(setBrowserError, 1000);
    setTimeout(setBrowserError, 2000);
    setTimeout(setBrowserError, 3000);
    setTimeout(setBrowserError, 4000);
  }
  vjs.plugin('excludeBrowsers', function(options) {
    var myPlayer = this;
    var usingExcludedBrowser = false;
    var usingMobile = new MobileDetect(window.navigator.userAgent).mobile();
    browsers = (options && options.browsers) ? options.browsers : ['safari', 'ie', 'mobile'];
    browsers.forEach(function(browser) {
      if ((browser === 'ie' && detectIE()) || (browser === 'safari' && detectSafari()) ||
        (ua === browser)) {
        usingExcludedBrowser = true;
      }
    });
    if ((usingMobile && browsers.indexOf('mobile') >= -1) || usingExcludedBrowser) {
      setError.call(myPlayer);
    }
  });
};
