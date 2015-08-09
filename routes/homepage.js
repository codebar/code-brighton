var home = require('../controllers').home;

module.exports = function homepageRoute(router){
	router.get('/', home.get);
}
