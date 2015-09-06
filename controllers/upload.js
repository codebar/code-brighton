var path = require('path');
var Busboy = require('busboy');
var unzip = require('unzip');
var uuid = require('node-uuid');
var fstream = require('fstream');

var store = require('../store');

exports.post = function(req, res){
    var project = {
        id: uuid.v4()
    };
	var busboy = new Busboy({headers: req.headers});
	busboy.on('file', function(fieldname, file, filename, encoding, mimetype) {
		var savePath = path.resolve(__dirname + '/../public/' + project.id);

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
    busboy.on('field', function(field, value){
        project[field] = value;
    });
    busboy.on('finish', function() {
        project.timestamp = Date.now();
        store.createProject(project);
		res.writeHead(201, { Connection: 'close' });
        res.write(project.id);
		res.end();
	});
	req.pipe(busboy);
};
