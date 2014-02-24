exports.view = function(req, res) {
    var message = false;
    if(req.session.messages){
        message = req.session.messages.pop();
    }

    res.render('settings', {
        'message':message
    });
}

exports.support = function(req, res){
    req.session.messages.push(['success','Support request submitted!']);
    res.redirect("/settings");
}