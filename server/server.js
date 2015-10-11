// 必须先设置环境
var serverMode = require('./server_mode.js');
process.env.NODE_ENV = serverMode.DEVELOPMENT_MODE;

var config = require('../config/config.js');
process.env.PORT = config.server.port || 5000;

var serveLib = require('./server_lib.js');

var db = serveLib.createDb();
var app = serveLib.createApp();
var server = require('http').createServer(app);

app.set('port', process.env.PORT);

server.listen(app.get('port'), function() {
    console.log('cftvc is listening port ' + app.get('port'));
});