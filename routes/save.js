var models = require('../models');

exports.save = function(req, res) {
    var username = req.session.username;
    if(!username){
        var messages = req.session.messages || [];
        messages.push(['danger', 'Please login to continue']);
        res.redirect('/login');
        return;
    }
    var rawTags = req.body.hiddenTags;
    var allTags = rawTags.split("|");
    var emotion = req.body.emotion;
    console.log(emotion);
    allTags.splice(0,1);

    var newEntry = new models.Entry({
        "username": username,
        "datetime": Date.now(),
        "text": req.body.entryText,
        "tags": allTags,
        "emotion": emotion
    });
    newEntry.save(function(err){
        if(err){console.log(err); res.send(500);}
        var messages = req.session.messages || [];
        messages.push(['success', 'Entry added']);
        res.redirect('/home');
    });   

}