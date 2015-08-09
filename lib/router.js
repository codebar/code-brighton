var Router = require('router');
var router = new Router();

router.get('/', function(req, res) {
	res.writeHead(200, {
		'Accept': 'application/html'
	});
	res.write('<h1>Homepage</h1>');
	res.end();
});

module.exports = router;
