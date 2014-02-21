var models = require('../models');

exports.save = function(req, res) {
    var date = new Date();
    var hours = date.getHours();
    //temp hack for time zone issues:
    date.setHours(hours-8);
    console.log(date);
    var username = req.session.username;
    var oldNew = req.params.oldNew;
    if(!username){
        var messages = req.session.messages || [];
        messages.push(['danger', 'Please login to continue']);
        res.redirect('/login');
        return;
    }
    var rawTags = req.body.hiddenTags;
    var allTags = rawTags.split("|");
    var emotion = req.body.emotion;
    allTags.splice(0,1);

    if (oldNew==="new"){
        var newEntry = new models.Entry({
            "username": username,
            "datetime": date,
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
    }else if (oldNew==="old"){
        var entryID = req.body._id;
        models.Entry
            .update( 
                {_id: entryID},
                {"username": username,
                "datetime": date,
                "text": req.body.entryText,
                "tags": allTags,
                "emotion": emotion} )
            .exec( function(err){
                if(err) {
                    console.log(err);
                    res.send(500);
                } else {
                    req.session.messages.push(['success', 'Entry Edited']);
                    var emotionText = "";
                    if (emotion!="default"){
                        var emotionText = "I feel "+emotion;
                    }
                    var url = "/entry/"+entryID;
                    res.redirect(url);
                }
            });
    }

}