exports.view = function(req, res) {
    var message = false;
    if(req.session.messages){
        message = req.session.messages.pop();
    }
    res.render('login', {
        'message': message
    });
}