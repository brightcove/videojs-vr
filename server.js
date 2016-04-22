var express = require('express');
var proxy = require('express-http-proxy');
var path = require('path');
var cors = require('cors');

var server = express();

var corsOptions = {
  origin: 'http://brightcove360.s3-website-us-east-1.amazonaws.com'
};

server.use(cors(corsOptions));

server.use(express.static(path.join(__dirname)));

var PORT = process.env.PORT || 3000;

server.listen(PORT, function () {
  console.log('Server listening on: ' + PORT);
});
