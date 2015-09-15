var bunyan = require('bunyan');
var logger = bunyan.createLogger({
    name: 'Code&Chips'
});

module.exports = logger;
