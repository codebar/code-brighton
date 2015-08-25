var path = require('path');
var serveStatic = require('serve-static');
var Router = require('router');

var routes = require('../routes');

var router = new Router();

router.use(serveStatic(path.resolve(__dirname + '/../public/')));

routes.forEach(function(route){
	route(router);
});

module.exports = router;
