var path = require('path');
var level = require('level');

var db = level(path.resolve(__dirname + '/../db'), {
    valueEncoding: 'json'
});

exports.createProject = function createProject(project, callback){
    db.put(project.id, project, callback);
};

exports.getProject = function getProject(id, callback){
    db.get(id, callback);
};

exports.getAllProjects = function getAllProjects(callback){
    return db.createReadStream({keys: true, values: true});
};
