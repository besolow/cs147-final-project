var data = require('../data.json');

exports.view = function(req, res) {
    var entries = data.entries.slice().reverse();
    var emotions = [];
    for (i in entries){
        if (entries[i].emotion!="default"){
            var tmp = "I feel "+entries[i].emotion;
            entries[i]["emotionText"] = tmp;
        }else{
            entries[i]["emotionText"] = "";
        }
    }
    
    res.render('home', {
        'entries': entries
    });
};