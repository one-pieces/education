var index = require('./controllers/index.js');

module.exports = function(app) {
    app.get('/cftvc*', index.render);
};