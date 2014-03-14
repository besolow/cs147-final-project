var models = require('../models');

exports.view = function(req, res) {
    var username = req.session.username;
    if(!username){
        var messages = req.session.messages || [];
        messages.push(['danger', 'Please login to continue']);
        res.redirect('/login');
    }

    var message = false;
    if(req.session.messages){
        message = req.session.messages.pop();
    }

    var _id = req.params._id;
    models.Entry
        .find({
            "_id": _id,
            "username": username
        })
        .exec(function(err, entries){
            if(err || !entries[0]) {
                console.log(err);
                res.send(500);
            } else {
                var entry = entries[0];
                var emotionText = "";
                if (entry.emotion!="default"){
                    var emotionText = "I feel "+entry.emotion;
                }
                res.render('entry', {
                    'entry': entry,
                    'emotionText': emotionText,
                    'message':message
                });
            }
        });

}