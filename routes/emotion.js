var models = require('../models');

exports.view = function(req, res) {
    var user = req.session.username;
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