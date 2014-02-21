var models = require('../models');

exports.login = function(req, res) {
    if(!req.session.messages) {
        req.session.messages = [];
    }
    var username = req.body.username;
    var password = req.body.password;
    models.User
        .find({"username": username})
        .exec(attemptLogin);

    function attemptLogin(err, user) {
        console.log(user);
        if(err || !user[0]) {
            console.log('error looking up user');
            req.session.messages.push(['danger','User not found']);
            res.redirect('/login');
            return;
        }
        console.log('found user '+user[0]);
        console.log('looking for pw: '+password);
        if(user[0]['password'] == password) {
            console.log('matched');
            req.session.username = username;
            res.redirect('/home');
        } else {
            req.session.messages.push(['danger','Incorrect password']);
            res.redirect('/login');
        }
    }
}

exports.logout = function(req, res) {
    req.session.username = null;
    res.redirect('/login');
}