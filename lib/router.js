var path = require('path');
var send = require('send');
var serveStatic = require('serve-static');
var Router = require('router');

var store = require('../store');
var routes = require('../routes');

var router = new Router();

var sendOpts = { root: path.resolve(__dirname + '/../public/'), extensions: ['html'] };

router.use(serveStatic(path.resolve(__dirname + '/../public/')));

router.use(function(req, res, next){
    if (req.method !== 'GET' && req.method !== 'HEAD') {
        return next();
    }

    var sliceVal;
    if (req.url.substr(-1) === '/'){
        sliceVal = -1;
    }
    var url = req.url.slice(1).slice(0, sliceVal);

    store.getUrlMapping(url, function(err, value){
        if (err || !value) {
            return next();
        }
        console.log(value);
        send(req, value.id, sendOpts).pipe(res);
    });
});

routes.forEach(function(route){
	route(router);
});

module.exports = router;
