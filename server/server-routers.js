var index = require('./controllers/index.js');
var userController = require('./controllers/user-controller.js');

module.exports = function(app) {
    app.get('/cftvc*', index.render);
    app.get('/api/v1/users/:id', userController.findUser);
};