var Router = require('router');
var routes = require('../routes');

var router = new Router();

routes.forEach(function(route){
	route(router);
});

module.exports = router;
