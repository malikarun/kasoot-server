var fs = require('fs');
var BinaryServer = require('binaryjs').BinaryServer;

// Serve client side statically
var server = BinaryServer({
  port: 9000
});

// wait for new user connections
var currentSong;
server.on('connection', function(client) {
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
    for (var id in server.clients) {
      var otherClient = server.clients[id];
      if (otherClient !== client) {
        var song = otherClient.createStream(meta);
        stream.pipe(song);
      }
    }
  });
});
