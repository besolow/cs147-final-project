var data = require('../data.json');

exports.view = function(req, res) {
    var dummySearchData = {
        'entries' : [
            {
            "date": 1392110792690,
            "text": "Today sucked. I was totally ready to go to bed when I got a text saying I needed to show up to this random party that I wasn't going to go to. And then I had to go because I wanted to support my friends, but it turned out to be super exhausting. I mean, parties are great, but it just isn't that great when you're ready for bed...",
            "tags": [],         
            "emotion": "tired"
        },
        {
            "date": 1392110751690,
            "text": "Had an awesome coffee date with Brett and Neli today <3 Love my team",
            "tags": ["coffeeftw", "delirium"],          
            "emotion": "tired"
        },
        {
            "date": 1392108751690,
            "text": "I had an awesome day today when I was able to quickly find the json library I was looking for. It's the small joys in life that really make it... I should learn to appreciate the little things more.",
            "tags": ["coding"],         
            "emotion": "happy"
        }]
    };
    console.log(dummySearchData);
    var queryString = req.query.queryString;
    console.log(queryString);
    res.render('search', {
        'query': queryString,
        'results': dummySearchData['entries']
    });
}