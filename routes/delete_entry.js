var data = require('../data.json');

exports.deleteEntry = function(req, res) {
    var datetime = req.body.datetime;
    console.log(datetime);
    for (entry in data['entries']){
        console.log(data['entries'][entry]['datetime']);
        console.log(data['entries'][entry]);
        if (data['entries'][entry]['datetime']==datetime){
            console.log('match found');
            console.log(data['entries'][entry]);
            data['entries'].splice(entry, 1);
            break;
        }
    }

    res.redirect('/home');
}