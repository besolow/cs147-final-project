var models = require('../models');

exports.deleteEntry = function(req, res) {
    var _id = req.body._id;
    var username = req.session.username;
    if(!req.session.messages) {
        req.session.messages = [];
    }
    models.Entry
        .find({
            "_id": _id,
            "username": username
        })
        .remove()
        .exec( function(err){
            if(err) {
                console.log(err);
                res.send(500);
            } else {
                req.session.messages.push(['success', 'Entry Deleted']);
                res.redirect('/home');
            }
        });
}