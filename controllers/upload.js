var fs = require('fs');
var path = require('path');
var Busboy = require('busboy');
var unzip = require('unzip');

var id = 0;

exports.post = function(req, res){
	var busboy = new Busboy({headers: req.headers});
	busboy.on('file', function(fieldname, file, filename, encoding, mimetype) {
		var savePath = path.resolve(__dirname + '/../public/site-' + id++);
		file.pipe(unzip.Extract({path: savePath}));
	});
	busboy.on('finish', function() {
		console.log('Done parsing form!');
		res.writeHead(303, { Connection: 'close', Location: '/' });
		res.end();
	});
	req.pipe(busboy);
};
