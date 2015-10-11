var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    givenName: String,
    familyName: String,
    email: String,
    userName: String,
    password: String
});

module.exports = mongoose.model('User', UserSchema);