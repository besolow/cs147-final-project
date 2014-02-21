var models = require('../models');

exports.view = function(req, res) {
    var username = req.session.username;
    if(!username){
        var messages = req.session.messages || [];
        messages.push(['danger', 'Please login to continue']);
        res.redirect('/login');
        return;
    }

    var queryString = req.query.queryString;
    var query = queryString.toLowerCase();
    var queryField = req.query.queryField;
    var resultsText = 'Search results for: ';
    console.log(queryField);

    if(queryField == 'emotion') {
        models.Entry
          .find({"username":username,"emotion":queryString})
          .sort({"datetime":-1})
          .exec(afterFind);
    } else if(queryField == 'tag') {
        models.Entry
          .find({"username":username,"tags":queryString})
          .sort({"datetime":-1})
          .exec(afterFind);
    } else if(queryField == "time") {
        var startDate = moment(queryString, 'MMMM YYYY').startOf("month");
        var endDate = startDate.clone().endOf("month");
        models.Entry
            .find({"username": username, "datetime": {"$gte": startDate.toDate(), "$lt": endDate.toDate()}})
            .sort({"datetime":-1})
            .exec(afterFind);
    } else {
        var re = new RegExp('.*'+queryString+'.*', 'i');
        models.Entry
            .find()
            .or([{text:{$regex: re}}, {tags:{$regex: re}}])
            .sort({"datetime":-1})
            .exec(afterFind);
    }


    function afterFind(err, results) {
        console.log(results);
        if(err){console.log(err); res.send(500);}
        if (results.length == 0) {
            resultsText = 'No results for: ';
        }else if(queryField == 'emotion') {
            resultsText = 'Entries marked as: ';
        }else if(queryField == 'tag') {
            resultsText = 'Entries tagged as: ';
        }else if(queryField == 'time'){
            resultsText = "Entries from: ";
        }

        res.render('search', {
            'query': queryString,
            'results': results,
            'resultsText': resultsText
        });
    }
}