var express = require('express');
var app = express();

app.use(express.static(__dirname));

var server = app.listen(8081, function () {
  var host = server.address().address;
  if (host == '::') host = 'localhost';
  var port = server.address().port;
  console.log('Elements Administration Mock-up listening at http://%s:%s', host, port);
});