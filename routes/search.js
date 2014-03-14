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
        var re = new RegExp('.*'+strEscape(queryString)+'.*', 'i');
        models.Entry
            .find({"username":username, $or:[{text:{$regex: re}}, {tags:{$regex: re}}, {emotion:{$regex: re}}]})
            .sort({"datetime":-1})
            .exec(afterFind);
    }


    function afterFind(err, results) {
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

        for (i in results){
            if (results[i].emotion!="default"){
                var tmp = "I feel "+results[i].emotion;
                results[i]["emotionText"] = tmp;
            }else{
                results[i]["emotionText"] = "";
            }
        }

        res.render('search', {
            'query': queryString,
            'results': results,
            'resultsText': resultsText
        });
    }
}

function strEscape(s) {
    return s.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
}