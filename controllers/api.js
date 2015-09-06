var store = require('../store');

exports.getById = function getById(req, res){
    store.getProject(req.params.id, function(error, project){
        if (error) {
            res.writeHead(500);
            res.write('Internal Server Error :(');
            return res.end();
        }
        res.writeHead(200, { Accept: 'application/json' });
        res.write(JSON.stringify(project));
        res.end();
    });
};

exports.getAll = function getAll(req, res){
    var projects = [];
    store.getAllProjects().on('data', function(data){
        projects.push(data);
    }).on('end', function(){
        res.writeHead(200, { Accept: 'application/json' });
        res.write(JSON.stringify(projects));
        res.end();
    });
};
