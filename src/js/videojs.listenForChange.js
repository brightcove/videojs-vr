module.exports = function(vjs) {
  vjs.plugin('listenForChange', function() {
    var myPlayer = this;
    function changeVideoFunc(evt) {
      if (!vjs.usingExcludedBrowser && evt.data.command === "changeVideo") {
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
    window.addEventListener("message", changeVideoFunc);
  });
};
