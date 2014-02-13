var data = require('../data.json');

exports.view = function(req, res) {

    var queryString = req.query.queryString;
    var query = queryString.toLowerCase();
    var queryField = req.query.queryField;
    var resultsText = 'Search for: ';
    var results = []
    var entries = data['entries'];
    
    for (i in entries) {
        //view by emotion
        if(queryField == 'emotion') {
            if(entries[i]['emotion'] == query) {
                results.push(entries[i]);
            }
        //view by tag (currently case sensitive)
        } else if(queryField == 'tag') {
            if(entries[i]['tags'].indexOf(queryString) != -1) {
                results.push(entries[i]);
            }
        //search text
        } else {
            if(entries[i]['text'].toLowerCase().indexOf(query) != -1) {
                results.push(entries[i]);
            }
        }
    }

    if(queryField == 'emotion' || queryField == 'tag') {
        resultsText = 'Viewing entries tagged as: ';
    }


    res.render('search', {
        'query': queryString,
        'results': results,
        'resultsText': resultsText
    });
}

