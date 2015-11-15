window.onload = function(){
  var client = new BinaryClient('wss://kasoot.herokuapp.com:9000');

  document.querySelector('input[type=file]').onchange = function(event) {
    var file = event.target.files[0];
    client.send(file);
  };
};