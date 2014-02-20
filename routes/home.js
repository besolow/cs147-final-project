var data = require('../data.json');

exports.view = function(req, res) {
    var entries = data.entries.slice().reverse();
    var emotions = [];
    for (i in entries){
        if (i.emotion!="default"){
            var tmp = "<p>I'm feeling "+i.emotion+"</p>";
            emotions.push(tmp);
        }else{
            emotions.push("");
        }
    }
    entries["emotionText"] = emotions;
    
    res.render('home', {
        'entries': entries
    });
};