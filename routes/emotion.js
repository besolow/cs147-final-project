var models = require('../models');

exports.view = function(req, res) {
    var user = req.session.username;
    if(!user){
        var messages = req.session.messages || [];
        messages.push(['danger', 'Please login to continue']);
        res.redirect('/login');
        return;
    }
    models.Entry
        .aggregate( 
            [
            {$match : { username : user }},
            {$group: {
                _id: "$emotion",
                count: {$sum: 1}}},
            ])
        
        .sort( {count: -1} )
        .exec(entriesLoaded);


    function entriesLoaded(err, result) {
        res.render('emotion', {
            'emotions': JSON.stringify(result)
        });

    }
}