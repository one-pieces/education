var userController = require('./controllers/user-controller.js');

module.exports = function(app) {
    app.get('/api/v1/users/:id', userController.findUser);
};