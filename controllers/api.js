var store = require('../store');

function handleError(res) {
    res.writeHead(500);
    res.write('Internal Server Error :(');
    return res.end();
}

function writeJSON(res, json){
    res.writeHead(200, { Accept: 'application/json' });
    res.write(JSON.stringify(project));
    res.end();
}

exports.getById = function getById(req, res){
    store.getProject(req.params.id, function(error, project){
        if (error) {
            return handleError(res);
        }
        writeJSON(res, project);
    });
};

exports.getAll = function getAll(req, res){
    var projects = [];
    store.getAllProjects().on('data', function(data){
        projects.push(data);
    }).on('end', function(){
        writeJSON(res, projects);
    });
};
