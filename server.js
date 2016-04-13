var express = require('express');
var proxy = require('express-http-proxy');
var path = require('path');

var server = express();

var brightcovevideo = 'http://solutions.brightcove.com';
var metacdnvideo = 'http://cdn-au-stage.metacdn.com';

server.use('/brightcovevideo', proxy(brightcovevideo, {
 forwardPath: function(req, res) {
   return require('url').parse(req.url).path;
 }
}));

server.use('/metacdnvideo', proxy(metacdnvideo, {
 forwardPath: function(req, res) {
   return require('url').parse(req.url).path;
 }
}));

server.use(express.static(path.join(__dirname)));

var PORT = process.env.PORT || 3000;

server.listen(PORT, function () {
  console.log('Server listening on: ' + PORT);
});
