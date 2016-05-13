module.exports = function() {
  require('./ie-customevent-shim.js')();
  var videoJsElem = document.getElementsByClassName('video-js')[0];
  var mouseDown = false;
  videoJsElem.addEventListener('mousedown', function() {
    mouseDown = true;
  });
  document.addEventListener('mouseup', function() {
    console.log(mouseDown);
    if (mouseDown) {
      mouseDown = false;
      console.log('HERE!!!');
      videoJsElem.dispatchEvent(
        new CustomEvent('mouseup')
      );
    }
  });
};
