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
                {$project:{month:{$month:'$datetime'}, year:{$year:'$datetime'}}},
                {$group: {
                    _id: {month:"$month",year:'$year'},
                    count: {$sum: 1}}}
                ])
            .sort( {_id: -1} )
            .exec(entriesLoaded);

    function entriesLoaded(err, result) {
        var months = result;
        var monthStrings = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        for (i in months){
            months[i]['string'] = monthStrings[months[i]._id.month-1] +" "+ months[i]._id.year;
        }
        res.render('time', {
            'months': months
        });
    }

}