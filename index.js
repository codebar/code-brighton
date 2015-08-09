var http = require('http');
var finalhandler = require('finalhandler');
var router = require('./lib/router');

var server = http.createServer();

server.on('request', function(req, res){
	router(req, res, finalhandler(req, res));
});

server.listen(process.env.PORT || 3030);
