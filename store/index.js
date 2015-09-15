var path = require('path');
var level = require('level');
var logger = require('../lib/logger');

var db = level(path.resolve(__dirname + '/../db'), {
    valueEncoding: 'json'
});

exports.createProject = function createProject(project, callback){
    logger.info('DB:: PUT:: project!' + project.id);
    db.put('project!' + project.id, project, callback);
};

exports.getProject = function getProject(id, callback){
    logger.info('DB:: GET:: project!' + project.id);
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
    logger.info('DB:: PUT:: url-mapping!' + mapping.url);
    db.put('url-mapping!' + mapping.url, mapping, callback);
};

exports.getUrlMapping = function getUrlMapping(url, callback){
    logger.info('DB:: GET:: url-mapping!' + mapping.url);
    db.get('url-mapping!' + url, callback);
};
