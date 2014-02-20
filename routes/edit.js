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
            entry = entries[0];
            if(err || !entries[0]) {
                console.log(err);
                res.send(500);
            } else {
                var emotionArray = [];
                var allEmotions = ["default", "happy", "sad", "excited", "angry", "tired", "meh", "annoyed", "down"];
                var allText = ["How are you feeling?", "Happy", "Sad", "Excited", "Angry", "Tired", "Meh", "Annoyed", "Down"];
                for (var i=0; i<allEmotions.length; i++){
                    var emotion = {};
                    emotion['val'] = allEmotions[i];
                    emotion['text'] = allText[i];
                    if (allEmotions[i]===entry.emotion){
                        emotion['bool'] = true;
                    } else{
                        emotion['bool'] = false;
                    }
                    emotionArray.push(emotion);
                }
                res.render('edit', {
                    'entry': entry,
                    'emotions': emotionArray
                });
            }
        });
}   
