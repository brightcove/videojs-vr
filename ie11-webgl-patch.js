// The WebGL implementation in IE11 does not support passing a HTMLVideoElement
// to texImage2D. Instead, we convert the frame to a canvas texture.
// Credit to Matthew Galloway (pivoter1) for his workaround:
// https://connect.microsoft.com/IE/feedbackdetail/view/941984/webgl-video-upload-to-texture-not-supported

module.exports = function(renderer) {

  if ( !!window.MSInputMethodContext && !!document.documentMode ) { // For IE11 only

    // Get the WebGLContext from the current WebGLRenderer instance
    var WebGLContext = renderer.getContext();

    // Cache the canvas so we don't have to recreate it for each frame
    var videojsCanvas = document.createElement("canvas");
    var videojsCanvasRenderingContext = videojsCanvas.getContext("2d");

    // Override the texImage2D function to convert each video frame
    // to a HTMLCanvasElement
    override(WebGLContext, 'texImage2D', before(function() {
      function videoToCanvas(resource, width, height) {
        videojsCanvas.width = width;
        videojsCanvas.height = height;

        videojsCanvasRenderingContext.drawImage(resource, 0, 0, width, height);
        return videojsCanvas;
      }

      if ( arguments.length == 6 && arguments[5] instanceof HTMLVideoElement) {
        arguments[5] = videoToCanvas(arguments[5], arguments[5].videoWidth, arguments[5].videoHeight);
      }

      return arguments;
    }));

  }

  // Decorators
  function override(object, methodName, callback) {
    object[methodName] = callback(object[methodName])
  }

  function before(extraBehavior) {
    return function(original) {
      return function() {
        // Our external behavior modifies the arguments
        var args = extraBehavior.apply(this, arguments)
        return original.apply(this, args)
      }
    }
  }

};
