var models = require('../models');

exports.sortTag = function(req, res) {
    var sortBy = req.params.sortBy;
    var sortFull = ""
    var user = req.session.username;
    if (sortBy === "pop"){
        sortFull = "popularity";
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
    } else if(sortBy === "abc"){
        sortFull = "alphabetical order";
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
            'tags': result,
            'sortBy': sortFull
        });
    }

}

exports.tagSuggestions = function(req, res) {
    var user = req.session.username;
    if(!user){
        res.json({});
    }
    models.Entry
        .distinct('tags', {'username': user}, function(err, result) {
            if(err) console.log(err);
            res.json(result);
        });
}