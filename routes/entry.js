var data = require('../data.json');

exports.view = function(req, res) {
    var datetime = req.params.datetime;
    var entry = null;
    for (entry in data['entries']){
        if (data['entries'][entry]['datetime']==datetime){
            break;
        }
    }

    res.render('entry', {
        'entry': data['entries'][entry]
    });
}