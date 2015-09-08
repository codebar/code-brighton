var path = require('path');
var level = require('level');

var db = level(path.resolve(__dirname + '/../db'), {
    valueEncoding: 'json'
});

exports.createProject = function createProject(project, callback){
    db.put('project!' + project.id, project, callback);
};

exports.getProject = function getProject(id, callback){
    db.get('project!' + id, callback);
};

exports.getAllProjects = function getAllProjects(callback){
    return db.createReadStream({
        keys: true,
        values: true,
        gt: 'project!',
        lt: 'project!~'
    });
};

exports.createUrlMapping = function createUrlMapping(mapping, callback){
    db.put('url-mapping!' + mapping.url, mapping, callback);
};

exports.getUrlMapping = function getUrlMapping(url, callback){
    db.get('url-mapping!' + url, callback);
};
