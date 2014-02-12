var data = require('../data.json');

exports.view = function(req, res) {
<<<<<<< HEAD

    var queryString = req.query.queryString;
    var query = queryString.toLowerCase();
    var queryField = req.query.queryField;

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
                console.log("found entry");
            }
        }
    }
    console.log(results);
=======
    var dummySearchData = {
        'entries' : [
            {
            "datetime": 1392110792690,
            "text": "Today sucked. I was totally ready to go to bed when I got a text saying I needed to show up to this random party that I wasn't going to go to. And then I had to go because I wanted to support my friends, but it turned out to be super exhausting. I mean, parties are great, but it just isn't that great when you're ready for bed...",
            "tags": [],         
            "emotion": "tired"
        },
        {
            "datetime": 1392110751690,
            "text": "Had an awesome coffee date with Brett and Neli today <3 Love my team",
            "tags": ["coffeeftw", "delirium"],          
            "emotion": "tired"
        },
        {
            "datetime": 1392108751690,
            "text": "I had an awesome day today when I was able to quickly find the json library I was looking for. It's the small joys in life that really make it... I should learn to appreciate the little things more.",
            "tags": ["coding"],         
            "emotion": "happy"
        }]
    };
    var queryString = req.query.queryString;
>>>>>>> 3930837f20d64664c092f589ab0483db0f64ab72
    res.render('search', {
        'query': queryString,
        'results': results
    });
}