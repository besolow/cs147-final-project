var models = require('../models');

exports.sortTag = function(req, res) {
    var sortOption = req.params.sortBy;

    var user = req.session.username;
    if (sortOption === "pop"){
        models.Entry
            .aggregate( 
                [
                {$match : { username : user }},
                {$unwind : "$tags"},
                {$group: {
                    _id: "$tags",
                    count: {$sum: 1}}},
                ])
            
            .sort( {count: -1} )
            .exec(entriesLoaded);
    } else if(sortOption === "abc"){
        models.Entry
            .aggregate( 
                [
                {$match : { username : user }},
                {$unwind : "$tags"},
                {$group: {
                    _id: "$tags",
                    count: {$sum: 1}}},
                ])
            
            .sort( {_id: 1} )
            .exec(entriesLoaded);
    }


    function entriesLoaded(err, result) {
        res.render('tags', {
            'tags': result
        });
    }

}