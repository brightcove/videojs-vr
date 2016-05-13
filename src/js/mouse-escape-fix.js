module.exports = function() {
  require('./ie-customevent-shim.js')();
  var videoJsElem = document.getElementsByClassName('video-js')[0];
  var mouseDown = false;
  videoJsElem.addEventListener('mousedown', function() {
    mouseDown = true;
  });
  document.addEventListener('mouseup', function() {
    if (mouseDown) {
      mouseDown = false;
      videoJsElem.dispatchEvent(
        new CustomEvent('mouseup')
      );
    }
  });
};
