var api = require('../controllers/api');

module.exports = function(router){
    router.get('/api/projects/:id', api.getById);
    router.get('/api/projects', api.getAll);
}
