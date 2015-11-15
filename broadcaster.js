window.onload = function(){
  var host = location.origin.replace(/^http/, 'ws')
  var client = new BinaryClient(host);

  document.querySelector('input[type=file]').onchange = function(event) {
    var file = event.target.files[0];
    client.send(file);
  };
};