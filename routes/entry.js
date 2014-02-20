var models = require('../models');

exports.view = function(req, res) {
    var username = req.session.username;
    if(!username){
        var messages = req.session.messages || [];
        messages.push(['danger', 'Please login to continue']);
        res.redirect('/login');
    }
    var _id = req.params._id;
    console.log("id "+_id);
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
                console.log(entries);
                console.log(entries[0]);
                res.render('entry', {
                    'entry': entries[0]
                });
            }
        });
}