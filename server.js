var fs = require('fs');
var BinaryServer = require('binaryjs').BinaryServer;

var http = require("http");
var express = require("express");
var app = express();
var port = process.env.PORT || 9001;

app.use(express.static(__dirname + "/"));

var server = http.createServer(app);
server.listen(port);

// Serve client side statically
var binaryServer = BinaryServer({ port: 9000 });

// wait for new user connections
var currentSong;
binaryServer.on('connection', function(client) {
  if (currentSong && currentSong.length > 0) {
    var song = client.createStream();
    client.send(currentSong);
  }

  // incoming stream from browser
  client.on('stream', function(stream, meta) {
    currentSong = [];
    stream.on('data',function(data){
      currentSong.push(data);
    });

    // broadcast to all other clients
    for (var id in binaryServer.clients) {
      var otherClient = binaryServer.clients[id];
      if (otherClient !== client) {
        var song = otherClient.createStream(meta);
        stream.pipe(song);
      }
    }
  });
});
