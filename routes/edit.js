var data = require('../data.json');


exports.view = function(req, res) {
    var datetime = req.params.datetime;
    var entry = null;
    var emotionArray = [];
    var allEmotions = ["default", "happy", "sad", "excited", "angry", "tired", "meh", "annoyed", "down"];
    var allText = ["How are you feeling?", "Happy", "Sad", "Excited", "Angry", "Tired", "Meh", "Annoyed", "Down"];

    for (entry in data['entries']){
        if (data['entries'][entry]['datetime']==datetime){
            break;
        }
    }
    for (var i=0; i<allEmotions.length; i++){
        var emotion = {};
        emotion['val'] = allEmotions[i];
        emotion['text'] = allText[i];
        if (allEmotions[i]===data['entries'][entry].emotion){
            emotion['bool'] = true;
        }else{
            emotion['bool'] = false;
        }
        emotionArray.push(emotion);
    }

    console.log(emotionArray);

    res.render('edit', {
        'entry': data['entries'][entry],
        'emotions': emotionArray
    });
}