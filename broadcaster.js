window.onload = function(){
  var client = new BinaryClient('ws://localhost:9000');

  document.querySelector('input[type=file]').onchange = function(event) {
    var file = event.target.files[0];
    client.send(file);
  };
};