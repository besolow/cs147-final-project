var data = require('../data.json');

exports.view = function(req, res) {
    var entries = data.entries.slice().reverse();
    res.render('home', {
        'entries': entries
    });
};