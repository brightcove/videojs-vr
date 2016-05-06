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
    videoElem.setAttribute('src', '');
    videoElem.setAttribute('preload', 'none');
    this.error({code:'-5'});
    videoElem.style.display = 'block';
  }
  vjs.plugin('excludeBrowsers', function(options) {
    var myPlayer = this;
    var usingExcludedBrowser = false;
    browsers = (options && options.browsers) ? options.browsers : [];
    browsers.forEach(function(browser) {
      if ((browser === 'ie' && detectIE()) || (browser === 'safari' && detectSafari()) ||
        (ua === browser)) {
        usingExcludedBrowser = true;
      }
    });
    if (usingExcludedBrowser) {
      setBrowserError();
      myPlayer.on('loaddata', setBrowserError.bind(myPlayer));
      myPlayer.on('loadmetadata', setBrowserError.bind(myPlayer));
    }
  });
};
