var data = require('../data.json');

exports.save = function(req, res) {

    var rawTags = req.body.hiddenTags;
    var allTags = rawTags.split("|");
    var emotion = req.body.emotion;
    console.log(emotion);
    allTags.splice(0,1);
    if (emotion==="default"){
        emotion = "neutral";
    }

    var newEntry = {
        "datetime": Date.now(),
        "text": req.body.entryText,
        "tags": allTags,
        "emotion": emotion
    }   
    data["entries"].push(newEntry);

    res.redirect('/home');
}