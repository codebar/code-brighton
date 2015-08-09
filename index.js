var http = require('http');
var router = require('./lib/router');

var server = http.createServer();

server.on('request', router);

server.listen(process.env.PORT || 3030);
