

exports.view = function(req, res) {
    var message = false;
    var date = new Date();
    var hours = date.getHours();
    date.setHours(hours-8);
    if(req.session.messages){
        message = req.session.messages.pop();
    }
    res.render('create_new', {
        'alt': false,
        'message': message,
        'date': date
    });
}

exports.emoticonSideView = function(req, res) {
    var message = false;
    var date = new Date();
    var hours = date.getHours();
    date.setHours(hours-8);
    if(req.session.messages){
        message = req.session.messages.pop();
    }
    res.render('create_new', {
        'alt': true,
        'message': message,
        'date': date
    });
}
