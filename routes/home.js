var models = require('../models');

exports.view = function(req, res) {
    var username = req.session.username;
    if(!username){
        var messages = req.session.messages || [];
        messages.push(['danger', 'Please login to continue']);
        res.redirect('/login');
        return;
    }
    var message = false;
    if(req.session.messages){
        message = req.session.messages.pop();
    }
    if(!username){
        req.redirect('/login');
    }
    models.Entry
        .find({"username": username})
        .exec(entriesLoaded);


    function entriesLoaded(err, entries) {
        if(err){console.log(err); res.send(500);}
        res.render('home', {
            'entries':entries,
            'message':message
        });
    }
};