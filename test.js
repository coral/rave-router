var rave = require('./index.js');

var express = require('express');
var app = express();
var io = null;


server = app.listen(3000, function () {

  var host = server.address().address;
  var port = server.address().port;
  
});

io = require('socket.io')(server);

rave.Http(app);

io.on('connection', function (socket) {
    rave.Socket(socket);
});

