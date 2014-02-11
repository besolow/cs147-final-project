var data = require('../data.json');

exports.view = function(req, res) {
    var datetime = req.params.datetime;
    var entry = null;
    for (entry in data['entries']){
        console.log(data['entries'][entry]['datetime']);
        console.log(data['entries'][entry]);
        if (data['entries'][entry]['datetime']==datetime){
            console.log()
            break;
        }
    }

    res.render('entry', {
        'entry': data['entries'][entry]
    });
}