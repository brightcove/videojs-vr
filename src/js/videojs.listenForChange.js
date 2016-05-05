module.exports = function(vjs) {
  function changeVideoFunc(evt) {
    if (evt.data.command === "changeVideo") {
      if (evt.data.type === "id") {
        myPlayer.catalog.getVideo(evt.data.src, function(error, video) {
          myPlayer.catalog.load(video);
        });
      }
      else {
        myPlayer.src({
          src: evt.data.src,
          type: evt.data.type
        });
      }
    }
  }
  vjs.plugin('listenForChange', function() {
    var myPlayer = this;
    window.addEventListener("message", changeVideoFunc);
  });
};
