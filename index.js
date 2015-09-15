var http = require('http');
var finalhandler = require('finalhandler');
var router = require('./lib/router');

var logger = require('./lib/logger');

var server = http.createServer();

server.on('request', function(req, res){
	router(req, res, finalhandler(req, res));
});
var port = process.env.PORT || 3030;

server.listen(port, function(){
    logger.info('Listening on http://' + server.address().address + ':' + port);
});
