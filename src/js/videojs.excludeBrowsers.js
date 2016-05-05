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
  function setBrowserErrorText() {
    var errorModal = document.getElementsByClassName('vjs-error-display')[0]
      .getElementsByClassName('vjs-modal-dialog-content')[0];
    if (!errorModal.innerHTML) {
       window.setTimeout(setBrowserErrorText, 50);
    } else {
      errorModal.innerHTML = 'To view this video, upgrade to a web browser that '+
        '<a href="https://www.facebook.com/help/851697264925946" target="_blank">'+
        'supports 360 video.</a>';
      videoElem.style.display = 'block'; //Show poster image
    }
  }
  vjs.plugin('excludeBrowsers', function(browsers) {
    var usingExcludedBrowser = false;
    browsers.forEach(function(browser) {
      if ((browser === 'ie' && detectIE()) || (browser === 'safari' && detectSafari()) ||
        (ua === browser)) {
        usingExcludedBrowser = true;
      }
    });
    if (usingExcludedBrowser) {
      videoElem.setAttribute('src', '');
      setBrowserErrorText();
    }
  });
};
