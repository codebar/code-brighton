var path = require('path');
var Busboy = require('busboy');
var unzip = require('unzip2');
var uuid = require('node-uuid');
var shortid = require('shortid');
var fstream = require('fstream');
var Zip = require('adm-zip');

var store = require('../store');

var PASSWORD = process.env.UPLOAD_PASSWORD || 'changeme1';

exports.post = function(req, res){
    var project = {
        id: uuid.v4(),
        validated: false
    };
    var url = shortid.generate();
	var busboy = new Busboy({headers: req.headers});
	busboy.on('file', function(fieldname, file, filename, encoding, mimetype) {
        var zipSavePath = path.resolve(__dirname + '/../zips/' + project.id + '.zip');
		var savePath = path.resolve(__dirname + '/../public/' + project.id);

        file.pipe(fstream.Writer(zipSavePath)).on('close', function(){
            var zip = new Zip(zipSavePath);
            zip.extractAllTo(savePath);
        });
    });
    busboy.on('field', function(field, value){
        project[field] = value;
    });
    busboy.on('finish', function() {
        if (project.password !== PASSWORD) {
            res.writeHead(401);
            res.write('Unauthorized');
            return res.end();
        }
        delete project.password;
        project.timestamp = Date.now();
        store.createProject(project);
        if (project.shorturl) {
            url = project.shorturl;
        }
        store.createUrlMapping({
            url: url,
            id: project.id
        });
		res.writeHead(201, { Connection: 'close' });
        res.write(url);
		res.end();
	});
	req.pipe(busboy);
};
