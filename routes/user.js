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
            req.session.messages.push(['danger','User not found']);
            res.redirect('/login');
            return;
        }
        if(user[0]['password'] == password) {
            req.session.username = username;
            res.redirect('/home');
        } else {
            req.session.messages.push(['danger','Incorrect password']);
            res.redirect('/login');
        }
    }
}

exports.logout = function(req, res) {
    if(!req.session.messages) {
        req.session.messages = [];
    }
    req.session.messages.push(['success','Log Out Succesful!']);
    req.session.username = null;
    res.redirect('/login');
}

exports.changePass = function(req, res){
    if(!req.session.messages) {
        req.session.messages = [];
    }
    var oldpass = req.body.oldpass;
    var newpass = req.body.newpass;
    var username = req.session.username;

    models.User
        .find({"username": username})
        .exec(function(err, user){
            if(err){
                console.log(err);
                res.send(500);
            }else{
                if (oldpass!=user[0]['password']){
                    req.session.messages.push(['danger',"Passwords don't match. Try again."]);
                    res.redirect("/settings");
                }else{
                    models.User
                    .update( 
                        {"username": username},
                        {"password": newpass} )
                    .exec( function(err){
                        if(err) {
                            console.log(err);
                            res.send(500);
                        } else {
                            req.session.messages.push(['success','Password change succesful!']);
                            res.redirect("/settings");
                        }
                    });
                }
            }
        });
}