
var Mongoose = require('mongoose');


var UserSchema = new Mongoose.Schema({
    "username": String,
    "password": String,
});


exports.User = Mongoose.model('User', UserSchema);

var EntrySchema = new Mongoose.Schema({
    "username": String,
    "datetime": Date,
    "text": String,
    "tags": [String],
    "emotion": String
});


exports.Entry = Mongoose.model('Entry', EntrySchema);

