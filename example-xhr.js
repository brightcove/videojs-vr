// Test VideoID: 4847412949001

var myPlayer = videojs(document.querySelector('.video-js'));
var type = '';
var loadingMessageElement, videoDetails, mediaSource, mimeCodec;

myPlayer.ready(function() {
  myPlayer.vr({projection: "Sphere"});

  loadingMessageElement = document.querySelector('#loading-message');
  videoDetails = document.querySelector('#video-details');

  /*
  mediaSource = getMediaSource();

  if ( mediaSource ) {
    document.querySelector('video').src = URL.createObjectURL(mediaSource);
    mediaSource.addEventListener('sourceopen', sourceOpen);
  }
  */

  updateVideoSource();
});


function updateVideoSource() {
  var videoUrl = document.getElementById('video_url_input').value;
  if (videoUrl.split('?')[0].endsWith('.m3u8')) {
   type = "application/x-mpegURL";
  } else if (videoUrl.split('?')[0].endsWith('.mp4')){
   type = "video/mp4";
  }

  if (isNaN(videoUrl)) {
    loadVideoFromUrl(videoUrl, type);
  } else { // treat the input as a videoId
    loadVideoFromCatalog(videoUrl);
  }
}


function loadVideoFromUrl(videoUrl, type) {
  setLoadingMessage("Loading " + type + " from " + videoUrl);

  fetchVideo(
    videoUrl,
    function(uInt8Array) {
      var blob = new Blob([uInt8Array], {
        type: type
      });

      document.querySelector('video')
        .innerHTML = '<source src="'+URL.createObjectURL(blob)+'" type="'+type+'"></source>';

      setLoadingMessage("Video is ready to play!");
    }
  );
}


function loadVideoFromCatalog(videoId) {
  setLoadingMessage("Loading video " + videoId + " from the catalog");

  var videoParts = [];
  myPlayer.catalog.getVideo(videoId, function(error, video) {
    console.log('Video Info: ', video.mediainfo);
    if ( ! error && video.sources ) {


// Implementation will change
/*
      video.sources.forEach(function(source) {
        fetchVideoPart(source, function(uInt8Array) {
          videoParts.push(uInt8Array);
          var blob = new Blob(videoParts, {
            type: type
          });

          document.querySelector('video')
            .innerHTML = '<source src="'+URL.createObjectURL(blob)+'" type="'+type+'"></source>';

          setLoadingMessage("Video is ready to play!");
        });
      });
*/
    }
  });

}

/*
function fetchVideoParts(parts, callback) {
  if ( ! parts.length ) return;

  // Get the next video part
  fetchVideo(
    parts[0],
    function(uInt8Array) {
      if ( parts.length > 1 ) {
        fetchVideoParts(parts.slice(1));
      }
    }
  );

}
*/

function fetchVideo(url, callback) {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', url, true);
  xhr.responseType = 'arraybuffer';
  xhr.send();

  xhr.onload = function() {
    if (xhr.status !== 200) {
      alert('Unexpected status code ' + xhr.status + ' for ' + url);
      return false;
    }
    callback(new Uint8Array(xhr.response));
  };
}


function setLoadingMessage(message) {
  loadingMessageElement.innerHTML = message;
}

function getMediaSource() {
  var mediaSource;

  if ( window.MediaSource ) {
    mediaSource = new MediaSource();
  }
  else if ( window.WebKitMediaSource ) {
    mediaSource = new WebKitMediaSource();
  }

  return mediaSource;
}

function sourceOpen() {
  var mediaSource = this;
  /*
  var sourceBuffer = mediaSource.addSourceBuffer(mimeCodec);

  fetchAB(assetURL, function (buf) {
    sourceBuffer.addEventListener('updateend', function (_) {
      mediaSource.endOfStream();
      video.play();
    });

    sourceBuffer.appendBuffer(buf);
  });
  */
}
