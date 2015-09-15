var api = require('../controllers/api');

module.exports = function(router){
    router.get('/api/projects/:id', api.getById);
    router.get('/api/projects', api.getAll);
    router.post('/api/projects/:id/validate', /* TODO: authentication */ api.setValid);
};
