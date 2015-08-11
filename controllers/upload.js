var path = require('path');
var Busboy = require('busboy');
var unzip = require('unzip');
var uuid = require('node-uuid');
var fstream = require('fstream');

exports.post = function(req, res){
	var busboy = new Busboy({headers: req.headers});
	busboy.on('file', function(fieldname, file, filename, encoding, mimetype) {
		var savePath = path.resolve(__dirname + '/../public/' + uuid.v4());

		file.pipe(unzip.Parse()).on('entry', function(entry){

            var entryPathNormalised = entry.path.split('/').slice(1).join('/');

            if (!entryPathNormalised) {
                return entry.autodrain();
            }

            var uploadPath = savePath + '/' + entryPathNormalised;
            var uploadStream = fstream.Writer(uploadPath);

            if (entry.type === 'File') {
                entry.pipe(uploadStream);
            } else {
                entry.autodrain();
            }
        });

	});
	busboy.on('finish', function() {
		res.writeHead(303, { Connection: 'close', Location: '/' });
		res.end();
	});
	req.pipe(busboy);
};
