
var Mongoose = require('mongoose');
var textSearch = require('mongoose-text-search');

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

EntrySchema.plugin(textSearch);
EntrySchema.index({text: 'text'});


exports.Entry = Mongoose.model('Entry', EntrySchema);

