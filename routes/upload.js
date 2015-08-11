var upload = require('../controllers').upload;

module.exports = function(router){
	router.post('/upload', upload.post);
};
