module.exports = function(vjs) {
  var ua = window.navigator.userAgent;
  var videoElem = document.getElementsByTagName('video')[0];
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
  function setBrowserError() {
    if (videoElem.getAttribute('src')) {
      videoElem.setAttribute('src', '');
    }
    var errorModal = document.getElementsByClassName('vjs-error-display')[0]
      .getElementsByClassName('vjs-modal-dialog-content')[0];
    if (window.readyState === 'loading' || !errorModal.innerHTML) {
       window.setTimeout(setBrowserError, 50);
    } else {
      errorModal.innerHTML = 'To view this video, upgrade to a web browser that '+
        'supports 360 video. Supported browsers include the latest versions of Chrome, Firefox, and Edge.';
      videoElem.style.display = 'block'; //Show poster image
    }
  }
  vjs.plugin('excludeBrowsers', function(options) {
    var usingExcludedBrowser = false;
    browsers = (options && options.browsers) ? options.browsers : [];
    browsers.forEach(function(browser) {
      if ((browser === 'ie' && detectIE()) || (browser === 'safari' && detectSafari()) ||
        (ua === browser)) {
        usingExcludedBrowser = true;
      }
    });
    if (usingExcludedBrowser) {
      var myPlayer = this;
      vjs.usingExcludedBrowser = usingExcludedBrowser;
      videoElem.setAttribute('src', '');
      setBrowserError();
      myPlayer.on('loadstart', function() {
        setBrowserError();
      }, true);
    }
  });
};
