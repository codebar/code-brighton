var fs = require('fs');
var path = require('path');

var homepage = fs.readFileSync(path.resolve(__dirname + '/../public/index.html')).toString();

exports.get = function(req, res) {
	res.writeHead(200, {
		'Accept': 'application/html'
	});
	res.write(homepage);
	res.end();
}
