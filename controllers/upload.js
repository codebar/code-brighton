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

exports.get = function(req, res){
	res.writeHead(200, { Connection: 'close' });
	res.write('<html><head></head><body>\
		       <form method="POST" enctype="multipart/form-data">\
			<input type="text" name="textfield"><br />\
			<input type="file" name="filefield"><br />\
			<input type="submit">\
		      </form>\
		    </body></html>');
	res.end();
};
