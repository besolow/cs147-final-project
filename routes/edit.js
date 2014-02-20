var models = require('../models');


exports.view = function(req, res) {
    var username = req.session.username;
    if(!username){
        var messages = req.session.messages || [];
        messages.push(['danger', 'Please login to continue']);
        res.redirect('/login');
    }
    var _id = req.params._id;

    var entry = null;
    models.Entry
        .find({
            "_id": _id,
            "username": username
        })
        .exec(function(err, entries){
            if(err) {
                console.log(err);
                res.send(500);
            } else {
                res.render('edit', {
                    'entry': entries[0]
                });
            }
        });
}   