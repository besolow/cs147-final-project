var data = require('../data.json');

exports.view = function(req, res) {
    var datetime = req.params.datetime;
    var entry = null;
    var emotionText = "";
    for (entry in data['entries']){
        if (data['entries'][entry]['datetime']==datetime){
            if (data['entries'][entry].emotion!="default"){
                emotionText = "I'm feeling "+data['entries'][entry].emotion;
            }
            break;
        }
    }

    res.render('entry', {
        'entry': data['entries'][entry],
        'emotionText': emotionText
    });
}