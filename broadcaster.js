window.onload = function(){
  var client = new BinaryClient('wss://kasoot.herokuapp.com');

  document.querySelector('input[type=file]').onchange = function(event) {
    var file = event.target.files[0];
    client.send(file);
  };
};