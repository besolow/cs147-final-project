var data = require('../data.json');

exports.deleteEntry = function(req, res) {
    var datetime = req.body.datetime;
    for (entry in data['entries']){
        if (data['entries'][entry]['datetime']==datetime){
            data['entries'].splice(entry, 1);
            break;
        }
    }

    res.redirect('/home');
}