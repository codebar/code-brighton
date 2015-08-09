var upload = require('../controllers').upload;

module.exports = function(router){
	router.get('/upload', upload.get);
	router.post('/upload', upload.post);
};
