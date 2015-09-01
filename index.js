var http = require('http');
var finalhandler = require('finalhandler');
var router = require('./lib/router');

var server = http.createServer();

server.on('request', function(req, res){
	router(req, res, finalhandler(req, res));
});
var port = process.env.PORT || 3030;

console.log('Listening on http://127.0.0.1:' + port);
server.listen(port);
